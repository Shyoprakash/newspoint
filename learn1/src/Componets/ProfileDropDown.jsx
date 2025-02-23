import { Avatar,Menu } from '@mantine/core'
import { useDispatch } from 'react-redux'
import { signOut } from '../redux/slice/authSlice'
import {useNavigate} from 'react-router-dom'
function ProfileDropDown() {
    const navigate = useNavigate()
const dispatch = useDispatch()
    const handleSignOut = () => {
        dispatch(signOut())
        navigate(
            '/login'
        )
    }
  return (
    <div>


      <Menu shadow="md" width={150}>
      <Menu.Target>
          <Avatar/>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item >
          Settings
        </Menu.Item>
        <Menu.Item >
          Messages
        </Menu.Item>
        <Menu.Item color='red' onClick={handleSignOut}>
       Sign Out
        </Menu.Item>
      


       
       
      </Menu.Dropdown>
    </Menu>
    </div>
  )
}

export default ProfileDropDown
