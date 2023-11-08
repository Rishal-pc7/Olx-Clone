import React,{useEffect, useState,useContext} from 'react'
import './Chat.css'
import { getDatabase, ref,onValue } from "firebase/database";
import { query, getDocs,collection,where } from "firebase/firestore";
import { fireStoreContext } from '../../store/firebaseContext';
import { useNavigate } from 'react-router-dom';
function Inbox({Avatar,user}) {
    const [rooms,setRooms] = useState([])
    const[userDetails,setUserDetails] = useState(null)
    let db=getDatabase()
    let navigate=useNavigate()
    const {firestore} = useContext(fireStoreContext)
    useEffect(()=>{
      onValue(ref(db,'messages/room'),(snapshot)=>{
        let room=[]
        if(snapshot.exists()){
          let roomEntries=Object.entries(snapshot.val()).map((e)=>e[1])
          room=roomEntries.filter((room)=>{
            return room.users.includes(user.uid)
          }) 
          let roomDetails=room.map((room)=> {
            let users=room.users.filter((usr)=> usr !== user.uid)
          if(users.length){
            let docRef=query(collection(firestore,'user'),where('id','==',users[0]))
            let usersDetails
            getDocs(docRef).then((snap)=>{
              usersDetails=snap.docs.map((details)=>{
                return{
                  ...details.data()
                }
                })
                setUserDetails(usersDetails)
              })
              if(userDetails){
                return {...room,user:users[0],name:userDetails[0].displayName}
              }
              return null
              
          }
        })
        setRooms(roomDetails);
        
      }
      })
    },[userDetails])
    return (
    <div className="inbox-div">
      <div className="heading-div">
        <h4>INBOX</h4>
      </div>

      <div className="">
      {
          rooms[0] ?
          rooms.map((room)=>{
            return(

              <div className="chats" onClick={()=>navigate(`/chat/${room.proId}/${userDetails[0]?.id}`)}>
        <div className="avatar-div">
            
        <Avatar name={room.name} round size='60' className='avatar'/>
            <div className='name'>
                <p>{room.name}</p>
                
                </div>

        </div>
      </div> 
              )
          }) :
          <div className="no-chats">
        <p>All your chats will show up here</p>
      </div>
      
    }
    </div>
    </div>
  )
}

export default Inbox