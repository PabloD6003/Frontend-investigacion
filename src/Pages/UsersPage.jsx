import { useContext } from 'react'
import UsersList from '../Components/UsersList'
import AddUserButton from '../Components/AddUserButton'
import Login from '../Components/Login'
import { AuthContext } from '../Context/AuthContext.jsx'

const UsersPage = () => {
  const { user } = useContext(AuthContext)

  if (user) {
    return (
      <div className="p-4">
        <AddUserButton />
        <UsersList />
      </div>
    )
  }

  return <Login />
}

export default UsersPage
