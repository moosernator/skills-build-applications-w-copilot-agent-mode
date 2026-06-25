import { useEffect, useState } from 'react'

interface UsersProps {
  apiBaseUrl: string
}

const getResponseArray = (body: any) => {
  if (Array.isArray(body)) return body
  if (Array.isArray(body?.data)) return body.data
  if (Array.isArray(body?.items)) return body.items
  if (Array.isArray(body?.results)) return body.results
  return []
}

const Users = ({ apiBaseUrl }: UsersProps) => {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`${apiBaseUrl}/users`)
        if (!response.ok) {
          throw new Error(`Failed to load users: ${response.status}`)
        }
        const body = await response.json()
        setUsers(getResponseArray(body))
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [apiBaseUrl])

  return (
    <section>
      <h2>Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id ?? user.username ?? JSON.stringify(user)}>
                <td>{user.username ?? user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && !error && users.length === 0 && <p>No users found.</p>}
    </section>
  )
}

export default Users
