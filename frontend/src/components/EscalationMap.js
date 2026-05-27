/**
 * EscalationMap – Interactive map for the Escalation Agent page.
 * Uses Leaflet + OpenStreetMap + Overpass API (free, no key needed).
 *
 * Features:
 *  - Detects user location via browser Geolocation API
 *  - Fetches nearby hospitals & pharmacies via Overpass API
 *  - Highlights closest hospital (red) and closest pharmacy (green)
 *  - Shows popup with name, address, distance
 *  - Manual address fallback if geolocation is denied
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './EscalationMap.css';

// ─── Fix default Leaflet marker icons (bundler issue) ──────────────────────
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// ─── Custom Marker Icons ──────────────────────────────────────────────────────

const createIcon = (color, size = [28, 42]) =>
  new L.DivIcon({
    className: 'escalation-custom-marker',
    html: `<div style="
      background:${color};
      width:${size[0]}px;height:${size[1]}px;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      border:3px solid #fff;
      box-shadow:0 2px 8px rgba(0,0,0,.35);
      display:flex;align-items:center;justify-content:center;
    "><div style="
      transform:rotate(45deg);
      color:#fff;font-size:14px;font-weight:700;
    ">${color === '#e74c3c' ? '🏥' : color === '#27ae60' ? '💊' : '📍'}</div></div>`,
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1]],
    popupAnchor: [0, -size[1]],
  });

const userIcon = createIcon('#3498db', [32, 46]);
const hospitalIcon = createIcon('#e74c3c');
const pharmacyIcon = createIcon('#27ae60');
const closestHospitalIcon = createIcon('#c0392b', [36, 50]);
const closestPharmacyIcon = createIcon('#1e8449', [36, 50]);

// ─── Utility: Haversine distance (km) ────────────────────────────────────────

const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// ─── Component to re-center map ──────────────────────────────────────────────

const RecenterMap = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 14, { duration: 1.2 });
  }, [center, map]);
  return null;
};

// ─── Main Component ──────────────────────────────────────────────────────────

const EscalationMap = ({ locationHint = '', isEmergency = false }) => {
  const [userPos, setUserPos] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [manualAddress, setManualAddress] = useState('');
  const [geoPermission, setGeoPermission] = useState('pending'); // pending | granted | denied
  const fetchedRef = useRef(false);

  // ─── Fetch nearby places from Overpass API ────────────────────────────────

  const fetchNearbyPlaces = useCallback(async (lat, lng) => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    setLoading(true);
    setError(null);

    const radius = 5000; // 5 km
    const query = `
      [out:json][timeout:15];
      (
        node["amenity"="hospital"](around:${radius},${lat},${lng});
        node["amenity"="pharmacy"](around:${radius},${lat},${lng});
        way["amenity"="hospital"](around:${radius},${lat},${lng});
        way["amenity"="pharmacy"](around:${radius},${lat},${lng});
      );
      out center 50;
    `;

    try {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(query)}`,
      });

      if (!response.ok) throw new Error('Overpass API request failed');

      const data = await response.json();
      const results = (data.elements || [])
        .map((el) => {
          const elLat = el.lat || el.center?.lat;
          const elLng = el.lon || el.center?.lon;
          if (!elLat || !elLng) return null;

          return {
            id: el.id,
            type: el.tags?.amenity === 'hospital' ? 'hospital' : 'pharmacy',
            name: el.tags?.name || (el.tags?.amenity === 'hospital' ? 'Hospital' : 'Pharmacy'),
            address:
              [el.tags?.['addr:street'], el.tags?.['addr:housenumber'], el.tags?.['addr:city']]
                .filter(Boolean)
                .join(', ') || 'Address not available',
            lat: elLat,
            lng: elLng,
            distance: haversine(lat, lng, elLat, elLng),
          };
        })
        .filter(Boolean)
        .sort((a, b) => a.distance - b.distance);

      // Mark the closest hospital and pharmacy
      let closestHosp = false;
      let closestPharm = false;
      for (const place of results) {
        if (place.type === 'hospital' && !closestHosp) {
          place.isClosest = true;
          closestHosp = true;
        }
        if (place.type === 'pharmacy' && !closestPharm) {
          place.isClosest = true;
          closestPharm = true;
        }
      }

      setPlaces(results);
    } catch (err) {
      console.error('Overpass fetch error:', err);
      setError('Could not fetch nearby places. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── Try Geolocation on mount ─────────────────────────────────────────────

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoPermission('denied');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserPos(coords);
        setGeoPermission('granted');
        fetchNearbyPlaces(coords.lat, coords.lng);
      },
      () => {
        setGeoPermission('denied');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, [fetchNearbyPlaces]);

  // ─── Manual address geocoding via Nominatim ───────────────────────────────

  const handleManualSearch = async () => {
    if (!manualAddress.trim()) return;
    setLoading(true);
    setError(null);
    fetchedRef.current = false;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(manualAddress)}&limit=1`,
        { headers: { 'User-Agent': 'GeneGuard-EscalationMap/1.0' } }
      );
      const results = await response.json();

      if (results.length === 0) {
        setError('Could not find that address. Try a different search.');
        setLoading(false);
        return;
      }

      const coords = { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) };
      setUserPos(coords);
      fetchNearbyPlaces(coords.lat, coords.lng);
    } catch (err) {
      setError('Geocoding failed. Please try again.');
      setLoading(false);
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  const hospitals = places.filter((p) => p.type === 'hospital');
  const pharmacies = places.filter((p) => p.type === 'pharmacy');
  const closestHospital = hospitals.find((p) => p.isClosest);
  const closestPharmacy = pharmacies.find((p) => p.isClosest);

  return (
    <div className={`escalation-map-container ${isEmergency ? 'emergency-active' : ''}`}>
      <div className="escalation-map-header">
        <h4>📍 Nearby Medical Facilities</h4>
        {isEmergency && <span className="escalation-emergency-tag">⚠ Emergency Mode</span>}
      </div>

      {/* Manual address fallback */}
      {geoPermission === 'denied' && !userPos && (
        <div className="escalation-manual-input">
          <p className="escalation-geo-warning">
            📍 Location access was denied. Enter your address manually to find nearby facilities.
          </p>
          <div className="escalation-search-row">
            <input
              type="text"
              placeholder="Enter your city, address, or area..."
              value={manualAddress}
              onChange={(e) => setManualAddress(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleManualSearch()}
            />
            <button onClick={handleManualSearch} disabled={loading}>
              {loading ? 'Searching…' : 'Search'}
            </button>
          </div>
        </div>
      )}

      {/* Error display */}
      {error && <div className="escalation-error">{error}</div>}

      {/* Stats bar */}
      {places.length > 0 && (
        <div className="escalation-stats">
          <div className="escalation-stat">
            <span className="stat-dot hospital"></span>
            <span>{hospitals.length} hospital{hospitals.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="escalation-stat">
            <span className="stat-dot pharmacy"></span>
            <span>{pharmacies.length} pharmac{pharmacies.length !== 1 ? 'ies' : 'y'}</span>
          </div>
          {closestHospital && (
            <div className="escalation-stat closest">
              <span>Nearest hospital: {closestHospital.distance.toFixed(1)} km</span>
            </div>
          )}
          {closestPharmacy && (
            <div className="escalation-stat closest">
              <span>Nearest pharmacy: {closestPharmacy.distance.toFixed(1)} km</span>
            </div>
          )}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="escalation-loading">
          <div className="escalation-loading-spinner"></div>
          <p>Finding nearby hospitals and pharmacies…</p>
        </div>
      )}

      {/* Map */}
      {userPos && (
        <div className="escalation-map-wrapper">
          <MapContainer
            center={[userPos.lat, userPos.lng]}
            zoom={14}
            style={{ height: '420px', width: '100%', borderRadius: '12px' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RecenterMap center={[userPos.lat, userPos.lng]} />

            {/* User location marker */}
            <Marker position={[userPos.lat, userPos.lng]} icon={userIcon}>
              <Popup>
                <div className="escalation-popup user">
                  <strong>📍 Your Location</strong>
                </div>
              </Popup>
            </Marker>

            {/* Accuracy circle */}
            <Circle
              center={[userPos.lat, userPos.lng]}
              radius={200}
              pathOptions={{ color: '#3498db', fillColor: '#3498db', fillOpacity: 0.08, weight: 1 }}
            />

            {/* Place markers */}
            {places.map((place) => {
              let icon;
              if (place.isClosest && place.type === 'hospital') icon = closestHospitalIcon;
              else if (place.isClosest && place.type === 'pharmacy') icon = closestPharmacyIcon;
              else if (place.type === 'hospital') icon = hospitalIcon;
              else icon = pharmacyIcon;

              return (
                <Marker key={place.id} position={[place.lat, place.lng]} icon={icon}>
                  <Popup>
                    <div className={`escalation-popup ${place.type} ${place.isClosest ? 'closest' : ''}`}>
                      <strong>{place.isClosest ? '⭐ ' : ''}{place.name}</strong>
                      <span className="popup-type">{place.type === 'hospital' ? '🏥 Hospital' : '💊 Pharmacy'}</span>
                      <span className="popup-address">{place.address}</span>
                      <span className="popup-distance">{place.distance.toFixed(2)} km away</span>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="popup-directions"
                      >
                        Get Directions →
                      </a>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      )}

      {/* Empty state */}
      {!loading && !userPos && geoPermission !== 'denied' && (
        <div className="escalation-empty">
          <p>Waiting for location access…</p>
        </div>
      )}
    </div>
  );
};

export default EscalationMap;
