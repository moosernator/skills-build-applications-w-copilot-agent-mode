import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

const getResponseArray = (body) => {
  if (Array.isArray(body)) return body
  if (Array.isArray(body?.data)) return body.data
  if (Array.isArray(body?.items)) return body.items
  if (Array.isArray(body?.results)) return body.results
  return []
}

const formatUser = (user) => user?.username ?? user?.email ?? 'Unknown'

const Leaderboard = () => {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Failed to load leaderboard: ${response.status}`)
        }
        const body = await response.json()
        setEntries(getResponseArray(body))
      } catch (err) {
        setError((err).message)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [endpoint])

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id ?? `${entry.rank}-${entry.score}`}>
                <td>{entry.rank}</td>
                <td>{formatUser(entry.user)}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && !error && entries.length === 0 && <p>No leaderboard entries found.</p>}
    </section>
  )
}

export default Leaderboard
