// components/supar-admin-dashboard/Header.jsx
export default function Header({ onMenuToggle }) {
  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuToggle}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className="header-greeting">
          <h1 className="greeting-title">
            Welcome back, <span className="highlight">Super Admin</span> 👋
          </h1>
          <p className="greeting-subtitle">Here's what's happening with your system today.</p>
        </div>
      </div>
      <div className="header-right">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search patients, doctors, outlets..."
            className="search-input"
          />
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <button className="notification-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="notification-badge">12</span>
        </button>
        <div className="user-profile">
          <div className="user-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="user-info">
            <span className="user-name">Super Admin</span>
            <span className="user-role">Super Admin</span>
          </div>
          <svg className="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </header>
  );
}