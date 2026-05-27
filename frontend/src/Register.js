import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const API_BASE_URL = 'https://gene-guard.onrender.com';

// Password strength helper
const getPwStrength = (pw) => {
  if (!pw) return { score: 0, label: '', cls: '' };
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  if (s <= 1) return { score: 1, label: 'Weak', cls: 'weak' };
  if (s === 2) return { score: 2, label: 'Fair', cls: 'fair' };
  if (s === 3) return { score: 3, label: 'Good', cls: 'good' };
  return { score: 4, label: 'Strong', cls: 'strong' };
};

const ErrIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="12" height="12">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const EyeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [termsAccepted, setTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const pwStrength = useMemo(() => getPwStrength(form.password), [form.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    if (globalError) {
      setGlobalError('');
    }
  };

  const validate = () => {
    const e = {};

    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim()) e.lastName = 'Last name is required';

    if (!form.email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Enter a valid email';
    }

    if (form.phone && !/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) {
      e.phone = 'Enter a valid phone number';
    }

    if (!form.password) {
      e.password = 'Password is required';
    } else if (form.password.length < 8) {
      e.password = 'Minimum 8 characters required';
    }

    if (!form.confirmPassword) {
      e.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      e.confirmPassword = 'Passwords do not match';
    }

    if (!termsAccepted) e.terms = 'Please accept the terms to continue';

    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsLoading(true);
    setGlobalError('');

    try {
      const username = `${form.firstName} ${form.lastName}`.trim();

      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 1300);
    } catch (err) {
      setGlobalError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reg-page">
      <div className="reg-shape reg-shape-top-big"></div>
      <div className="reg-shape reg-shape-top-small"></div>
      <div className="reg-shape reg-shape-right-circle"></div>
      <div className="reg-shape reg-shape-right-small"></div>
      <div className="reg-shape reg-shape-bottom-left"></div>

      <nav className="reg-navbar">
        <div className="reg-logo-section" onClick={() => navigate('/home')}>
          <div className="reg-logo-dot"></div>
          <span className="reg-logo-text">Gene Guard</span>
        </div>
        <ul className="reg-nav-links">
          <li><Link to="/learn-genetics">Learn Genetics</Link></li>
          <li><Link to="/genetic-disorders">Genetic Disorders</Link></li>
          <li><Link to="/counselling">Counselling</Link></li>
          <li><Link to="/genetic-assessment">Genetic Assessment AI</Link></li>
          <li><Link to="/dna">DNA Testing</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
      </nav>

      <div className="reg-container">
        <h2>Register</h2>
        <div className="reg-underline"></div>

        <p className="reg-sub-text">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')}>Sign in here</span>
        </p>

        {success && (
          <div className="reg-success-banner" style={{ marginBottom: '14px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Account created! Redirecting to login…
          </div>
        )}

        {globalError && (
          <div className="reg-error-banner" style={{ marginBottom: '14px' }}>
            <ErrIcon /> {globalError}
          </div>
        )}

        <form className="reg-form" onSubmit={handleSubmit} noValidate>
          <div className="reg-row">
            <div className="reg-input-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'reg-error' : ''}
                autoComplete="given-name"
              />
              {errors.firstName && (
                <div className="reg-field-error">
                  <ErrIcon />{errors.firstName}
                </div>
              )}
            </div>

            <div className="reg-input-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'reg-error' : ''}
                autoComplete="family-name"
              />
              {errors.lastName && (
                <div className="reg-field-error">
                  <ErrIcon />{errors.lastName}
                </div>
              )}
            </div>
          </div>

          <div className="reg-input-group">
            <label htmlFor="reg-email">Email Address</label>
            <input
              id="reg-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? 'reg-error' : ''}
              autoComplete="email"
            />
            {errors.email && (
              <div className="reg-field-error">
                <ErrIcon />{errors.email}
              </div>
            )}
          </div>

          <div className="reg-row">
            <div className="reg-input-group">
              <label htmlFor="phone">
                Phone <span style={{ color: '#9abcca', fontWeight: 400 }}>(optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={handleChange}
                className={errors.phone ? 'reg-error' : ''}
                autoComplete="tel"
              />
              {errors.phone && (
                <div className="reg-field-error">
                  <ErrIcon />{errors.phone}
                </div>
              )}
            </div>

            <div className="reg-input-group reg-select-wrap">
              <label htmlFor="gender">Biological Sex</label>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="" disabled>Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not">Prefer not to say</option>
              </select>
              <span className="reg-select-caret">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" points="6,9 12,15 18,9" />
                </svg>
              </span>
            </div>
          </div>

          <div className="reg-input-group">
            <label htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              type={showPw ? 'text' : 'password'}
              name="password"
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? 'reg-error' : ''}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="reg-pw-toggle"
              onClick={() => setShowPw((p) => !p)}
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? <EyeOffIcon /> : <EyeIcon />}
            </button>

            {form.password && (
              <div className="reg-strength-wrap">
                <div className="reg-strength-bars">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`reg-strength-bar ${i <= pwStrength.score ? pwStrength.cls : ''}`}
                    />
                  ))}
                </div>
                <span className={`reg-strength-label ${pwStrength.cls}`}>
                  {pwStrength.label} password
                </span>
              </div>
            )}

            {errors.password && (
              <div className="reg-field-error">
                <ErrIcon />{errors.password}
              </div>
            )}
          </div>

          <div className="reg-input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'reg-error' : ''}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="reg-pw-toggle"
              onClick={() => setShowConfirm((p) => !p)}
              aria-label={showConfirm ? 'Hide' : 'Show'}
            >
              {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
            </button>
            {errors.confirmPassword && (
              <div className="reg-field-error">
                <ErrIcon />{errors.confirmPassword}
              </div>
            )}
          </div>

          <div>
            <label className="reg-terms">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTerms(e.target.checked);
                  if (errors.terms) setErrors((p) => ({ ...p, terms: '' }));
                }}
              />
              <div className="reg-checkbox-box">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor">
                  <polyline
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    points="2,6 5,9 10,3"
                  />
                </svg>
              </div>
              <span className="reg-terms-text">
                I agree to the <a href="#terms">Terms of Service</a> and{' '}
                <a href="#privacy">Privacy Policy</a>. Your data is protected under HIPAA.
              </span>
            </label>

            {errors.terms && (
              <div className="reg-field-error" style={{ marginTop: '6px' }}>
                <ErrIcon />{errors.terms}
              </div>
            )}
          </div>

          <button type="submit" className="reg-btn" disabled={isLoading || success}>
            {isLoading ? (
              <>
                <span className="reg-btn-spinner"></span> Creating account…
              </>
            ) : success ? (
              '✓  Account Created!'
            ) : (
              <>
                <span className="reg-btn-icon">⊙</span> CREATE ACCOUNT
              </>
            )}
          </button>

          <div className="reg-divider">or sign up with</div>

          <div className="reg-social-buttons">
            <button type="button" className="reg-social-btn">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            <button type="button" className="reg-social-btn">
              <svg viewBox="0 0 24 24" fill="#24292e" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>
          </div>

          <p className="reg-bottom-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;