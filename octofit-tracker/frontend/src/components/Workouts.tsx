import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'
const endpoint = `${apiBaseUrl}/workouts`

const getResponseArray = (body: any) => {
  if (Array.isArray(body)) return body
  if (Array.isArray(body?.data)) return body.data
  if (Array.isArray(body?.items)) return body.items
  if (Array.isArray(body?.results)) return body.results
  return []
}

const formatUser = (user: any) => user?.username ?? user?.email ?? 'Unknown'

const Workouts = () => {
  const [workouts, setWorkouts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Failed to load workouts: ${response.status}`)
        }
        const body = await response.json()
        setWorkouts(getResponseArray(body))
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [apiBaseUrl])

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout._id ?? workout.title}>
                <td>{formatUser(workout.user)}</td>
                <td>{workout.title}</td>
                <td>{workout.difficulty}</td>
                <td>{workout.durationMinutes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && !error && workouts.length === 0 && <p>No workouts found.</p>}
    </section>
  )
}

export default Workouts
