import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams'

const getResponseArray = (body: any) => {
  if (Array.isArray(body)) return body
  if (Array.isArray(body?.data)) return body.data
  if (Array.isArray(body?.items)) return body.items
  if (Array.isArray(body?.results)) return body.results
  return []
}

const formatMembers = (members: any) => {
  if (!Array.isArray(members)) return 'N/A'
  return members
    .map((member) => member?.username ?? member?.email ?? member)
    .filter(Boolean)
    .join(', ')
}

const Teams = () => {
  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Failed to load teams: ${response.status}`)
        }
        const body = await response.json()
        setTeams(getResponseArray(body))
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [endpoint])

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id ?? team.name ?? JSON.stringify(team)}>
                <td>{team.name}</td>
                <td>{formatMembers(team.members)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && !error && teams.length === 0 && <p>No teams found.</p>}
    </section>
  )
}

export default Teams
