import React,{useContext} from 'react'
import Inbox from '../ChatWithSeller/Inbox'
import './Chat.css'
import { AuthContext } from '../../store/firebaseContext'
import Avatar from 'react-avatar'
import Loader from '../../Pages/Loader'
function Chat() {
  let {user} = useContext(AuthContext)

  return (
    <div className="">
    {
      user ? 
      <div className='chatParentDiv'>
      <div className="flex-divs">

      <Inbox user={user} Avatar={Avatar}/>
      <div className="chat-div"></div>
      </div>
    </div>
    :<Loader/>
    }
    </div>
  )
}

export default Chat