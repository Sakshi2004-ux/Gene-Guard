import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import screenfull from 'screenfull';
import 'leaflet/dist/leaflet.css';
import './EscalationMap.css';

/* ─── Fix Leaflet default marker icon (CRA bug) ──────────────────────────── */
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/* ─── Custom marker icons ─────────────────────────────────────────────────── */
const createIcon = (color, size = 28) =>
  L.divIcon({
    className: 'custom-marker',
    html: `<svg width="${size}" height="${Math.round(size * 1.4)}" viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 22 12 22s12-13 12-22C24 5.37 18.63 0 12 0z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
      <circle cx="12" cy="12" r="5" fill="#fff" fill-opacity="0.9"/>
    </svg>`,
    iconSize: [size, Math.round(size * 1.4)],
    iconAnchor: [size / 2, Math.round(size * 1.4)],
    popupAnchor: [0, -Math.round(size * 1.2)],
  });

const createStarIcon = (color, size = 36) =>
  L.divIcon({
    className: 'custom-marker star-marker',
    html: `<svg width="${size}" height="${Math.round(size * 1.4)}" viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 22 12 22s12-13 12-22C24 5.37 18.63 0 12 0z" fill="${color}" stroke="#FFD700" stroke-width="2.5"/>
      <polygon points="12,6 14,10.5 19,10.5 15,13.5 16.5,18 12,15.5 7.5,18 9,13.5 5,10.5 10,10.5" fill="#FFD700"/>
    </svg>`,
    iconSize: [size, Math.round(size * 1.4)],
    iconAnchor: [size / 2, Math.round(size * 1.4)],
    popupAnchor: [0, -Math.round(size * 1.2)],
  });

const userIcon = L.divIcon({
  className: 'custom-marker user-marker',
  html: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="16" fill="#1e90ff" stroke="#fff" stroke-width="3" opacity="0.9"/>
    <circle cx="18" cy="18" r="6" fill="#fff"/>
    <circle cx="18" cy="18" r="18" fill="#1e90ff" opacity="0.15"/>
  </svg>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -20],
});

/* ─── Distance calculation ────────────────────────────────────────────────── */
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

/* ─── Overpass API endpoints ──────────────────────────────────────────────── */
const OVERPASS_PRIMARY = 'https://overpass-api.de/api/interpreter';
const OVERPASS_BACKUP = 'https://overpass.kumi.systems/api/interpreter';

/* ─── Build Overpass query ────────────────────────────────────────────────── */
const buildOverpassQuery = (lat, lng) => `
[out:json][timeout:25];
(
  node["amenity"="hospital"](around:5000,${lat},${lng});
  way["amenity"="hospital"](around:5000,${lat},${lng});
  node["amenity"="pharmacy"](around:5000,${lat},${lng});
  way["amenity"="pharmacy"](around:5000,${lat},${lng});
);
out center;
`.trim();

/* ─── Map auto-center helper ──────────────────────────────────────────────── */
const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 14, { animate: true });
  }, [lat, lng, map]);
  return null;
};

/* ═══════════════════════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════════════════════ */
const EscalationMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [manualAddress, setManualAddress] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  /* ── Fullscreen toggle ────────────────────────────────────────────────── */
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current || !screenfull.isEnabled) return;
    if (screenfull.isFullscreen) {
      screenfull.exit();
    } else {
      screenfull.request(containerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!screenfull.isEnabled) return;
    const onChange = () => setIsFullscreen(screenfull.isFullscreen);
    screenfull.on('change', onChange);
    return () => screenfull.off('change', onChange);
  }, []);

  /* ── Parse Overpass element → place object ─────────────────────────────── */
  const parseElement = useCallback((el, userLat, userLng) => {
    // way elements use el.center, node elements use el directly
    const lat = el.type === 'way' ? el.center?.lat : el.lat;
    const lng = el.type === 'way' ? el.center?.lon : el.lon;
    if (!lat || !lng) return null;

    return {
      id: el.id,
      name:
        el.tags?.name ||
        el.tags?.['name:en'] ||
        (el.tags?.amenity === 'hospital' ? 'Hospital' : 'Pharmacy'),
      address:
        el.tags?.['addr:full'] ||
        [el.tags?.['addr:street'], el.tags?.['addr:city']].filter(Boolean).join(', ') ||
        'Address not available',
      lat,
      lng,
      type: el.tags?.amenity,
      distance: haversineDistance(userLat, userLng, lat, lng),
    };
  }, []);

  /* ── Fetch nearby places via Overpass API ──────────────────────────────── */
  const fetchNearbyPlaces = useCallback(
    async (lat, lng) => {
      setSearching(true);
      setSearchDone(false);
      setPlaces([]);

      const query = buildOverpassQuery(lat, lng);

      const tryFetch = async (endpoint) => {
        console.log(`[EscalationMap] Querying Overpass: ${endpoint}`);
        console.log(`[EscalationMap] Query:\n${query}`);
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `data=${encodeURIComponent(query)}`,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      };

      let data;
      try {
        data = await tryFetch(OVERPASS_PRIMARY);
        console.log('[EscalationMap] Primary Overpass response:', data);
      } catch (err) {
        console.warn('[EscalationMap] Primary Overpass failed, retrying backup...', err);
        try {
          data = await tryFetch(OVERPASS_BACKUP);
          console.log('[EscalationMap] Backup Overpass response:', data);
        } catch (err2) {
          console.error('[EscalationMap] Both Overpass endpoints failed:', err2);
          setSearching(false);
          setSearchDone(true);
          return;
        }
      }

      const results = (data.elements || [])
        .map((el) => parseElement(el, lat, lng))
        .filter(Boolean)
        .sort((a, b) => a.distance - b.distance);

      console.log(`[EscalationMap] Parsed ${results.length} places:`, results);
      setPlaces(results);
      setSearching(false);
      setSearchDone(true);
    },
    [parseElement]
  );

  /* ── Auto-fetch user location on mount ────────────────────────────────── */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
          console.log('[EscalationMap] User location:', loc);
          setUserLocation(loc);
          setLoading(false);
          fetchNearbyPlaces(loc.lat, loc.lng);
        },
        (err) => {
          console.warn('[EscalationMap] Geolocation denied:', err.message);
          setError('Location access denied. Enter your address manually.');
          setShowManualInput(true);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setError('Geolocation not supported. Enter your address manually.');
      setShowManualInput(true);
      setLoading(false);
    }
  }, [fetchNearbyPlaces]);

  /* ── Nominatim fallback geocode ────────────────────────────────────────── */
  const handleManualSearch = async () => {
    if (!manualAddress.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(manualAddress)}&limit=1`,
        { headers: { 'User-Agent': 'GeneGuard-EscalationMap/1.0' } }
      );
      const data = await response.json();
      if (data.length > 0) {
        const loc = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        console.log('[EscalationMap] Geocoded location:', loc);
        setUserLocation(loc);
        setShowManualInput(false);
        setLoading(false);
        fetchNearbyPlaces(loc.lat, loc.lng);
      } else {
        setError('Could not find that address. Try a different one.');
        setLoading(false);
      }
    } catch {
      setError('Geocoding failed. Please try again.');
      setLoading(false);
    }
  };

  /* ── Invalidate map size after markers load ────────────────────────────── */
  useEffect(() => {
    if (mapRef.current && places.length > 0) {
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 100);
    }
  }, [places]);

  /* ── Closest calculations ─────────────────────────────────────────────── */
  const hospitals = useMemo(() => places.filter((p) => p.type === 'hospital'), [places]);
  const pharmacies = useMemo(() => places.filter((p) => p.type === 'pharmacy'), [places]);
  const closestHospital = useMemo(() => hospitals[0] || null, [hospitals]);
  const closestPharmacy = useMemo(() => pharmacies[0] || null, [pharmacies]);

  /* ── Get icon for a place ─────────────────────────────────────────────── */
  const getIcon = useCallback(
    (place) => {
      if (closestHospital && place.id === closestHospital.id) return createStarIcon('#e74c3c');
      if (closestPharmacy && place.id === closestPharmacy.id) return createStarIcon('#27ae60');
      return place.type === 'hospital' ? createIcon('#e74c3c') : createIcon('#27ae60');
    },
    [closestHospital, closestPharmacy]
  );

  /* ═══ RENDER ════════════════════════════════════════════════════════════ */

  /* ─── Loading state ───────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="escalation-map-container" ref={containerRef}>
        <div className="escalation-loading">
          <div className="loading-spinner">
            <div className="spinner-ring" />
            <div className="spinner-ring delay-1" />
            <div className="spinner-ring delay-2" />
          </div>
          <p className="loading-text">Detecting your location…</p>
          <p className="loading-subtext">Finding nearby hospitals &amp; pharmacies</p>
        </div>
      </div>
    );
  }

  /* ─── Manual input state ──────────────────────────────────────────────── */
  if (showManualInput) {
    return (
      <div className="escalation-map-container" ref={containerRef}>
        <div className="manual-input-overlay">
          <div className="manual-input-card">
            <div className="manual-icon">📍</div>
            <h3>Enter Your Location</h3>
            <p>{error}</p>
            <div className="manual-input-row">
              <input
                type="text"
                value={manualAddress}
                onChange={(e) => setManualAddress(e.target.value)}
                placeholder="e.g. Mumbai, India"
                className="manual-address-input"
                onKeyDown={(e) => e.key === 'Enter' && handleManualSearch()}
              />
              <button onClick={handleManualSearch} className="manual-search-btn">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Map rendered ────────────────────────────────────────────────────── */
  return (
    <div
      className={`escalation-map-container ${isFullscreen ? 'is-fullscreen' : ''}`}
      ref={containerRef}
    >
      {userLocation && (
        <>
          <div className="map-wrapper">
            <MapContainer
              center={[userLocation.lat, userLocation.lng]}
              zoom={14}
              scrollWheelZoom={true}
              style={{ width: '100%', height: '100%' }}
              whenReady={(e) => { mapRef.current = e.target; }}
            >
              {/* Fix 1 — Bright OpenStreetMap tiles */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <RecenterMap lat={userLocation.lat} lng={userLocation.lng} />

              {/* User location marker */}
              <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                <Popup>
                  <strong>📍 Your Location</strong>
                </Popup>
              </Marker>

              {/* Place markers */}
              {places.map((place) => (
                <Marker key={place.id} position={[place.lat, place.lng]} icon={getIcon(place)}>
                  <Popup>
                    <div className="popup-content">
                      <h4 className="popup-name">
                        {place.type === 'hospital' ? '🏥' : '💊'} {place.name}
                      </h4>
                      <p className="popup-address">{place.address}</p>
                      <div className="popup-meta">
                        <span className={`popup-type ${place.type}`}>
                          {place.type === 'hospital' ? 'Hospital' : 'Pharmacy'}
                        </span>
                        <span className="popup-distance">{place.distance.toFixed(1)} km</span>
                      </div>
                      {(closestHospital?.id === place.id || closestPharmacy?.id === place.id) && (
                        <span className="popup-closest-badge">⭐ Closest</span>
                      )}
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="popup-directions-btn"
                      >
                        Get Directions →
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Searching overlay */}
            {searching && (
              <div className="map-searching-overlay">
                <div className="searching-pulse" />
                <span>Searching nearby hospitals &amp; pharmacies…</span>
              </div>
            )}

            {/* Fullscreen button */}
            {screenfull.isEnabled && (
              <button
                className="fullscreen-btn"
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                )}
              </button>
            )}
          </div>

          {/* Status bar — results count or no results */}
          <div className="map-status-bar">
            <div className="status-left">
              <div className="legend-section"><span className="legend-dot user" /> You</div>
              <div className="legend-section"><span className="legend-dot hospital" /> Hospital</div>
              <div className="legend-section"><span className="legend-dot pharmacy" /> Pharmacy</div>
              <div className="legend-section"><span className="legend-dot closest" /> Closest</div>
            </div>
            <div className="status-right">
              {searching && <span className="status-searching">Searching…</span>}
              {searchDone && places.length > 0 && (
                <span className="status-count">
                  {hospitals.length} hospital{hospitals.length !== 1 ? 's' : ''},{' '}
                  {pharmacies.length} pharmac{pharmacies.length !== 1 ? 'ies' : 'y'} found
                </span>
              )}
              {searchDone && places.length === 0 && !searching && (
                <span className="status-none">No results found — try changing location</span>
              )}
            </div>
          </div>

          {/* Closest facilities panel */}
          {(closestHospital || closestPharmacy) && (
            <div className="closest-panel">
              {closestHospital && (
                <div className="closest-card hospital">
                  <div className="closest-icon">🏥</div>
                  <div className="closest-info">
                    <span className="closest-label">Nearest Hospital</span>
                    <strong>{closestHospital.name}</strong>
                    <span className="closest-dist">
                      {closestHospital.distance.toFixed(1)} km away
                    </span>
                  </div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${closestHospital.lat},${closestHospital.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="closest-nav-btn"
                  >
                    Navigate
                  </a>
                </div>
              )}
              {closestPharmacy && (
                <div className="closest-card pharmacy">
                  <div className="closest-icon">💊</div>
                  <div className="closest-info">
                    <span className="closest-label">Nearest Pharmacy</span>
                    <strong>{closestPharmacy.name}</strong>
                    <span className="closest-dist">
                      {closestPharmacy.distance.toFixed(1)} km away
                    </span>
                  </div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${closestPharmacy.lat},${closestPharmacy.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="closest-nav-btn"
                  >
                    Navigate
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Change location button */}
          <button
            className="manual-location-toggle"
            onClick={() => {
              setShowManualInput(true);
              setError('Enter a different location:');
            }}
          >
            📍 Change location
          </button>
        </>
      )}
    </div>
  );
};

export default EscalationMap;
