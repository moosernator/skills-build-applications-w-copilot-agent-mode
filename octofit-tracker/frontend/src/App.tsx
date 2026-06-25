import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>OctoFit Tracker</h1>
          <p className="subheading">
            A React 19 frontend for the OctoFit Tracker multi-tier application.
          </p>
          <p className="api-note">
            API base URL: <strong>{apiBaseUrl}</strong>
          </p>
          <p className="env-note">
            {codespaceName ? (
              <span>Codespaces mode enabled for <strong>{codespaceName}</strong>.</span>
            ) : (
              <span>
                VITE_CODESPACE_NAME is not set. Use <code>.env.local</code> to define
                <code>VITE_CODESPACE_NAME</code> for Codespaces URLs.
              </span>
            )}
          </p>
        </div>
        <nav className="app-nav">
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate replace to="/users" />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<Navigate replace to="/users" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
