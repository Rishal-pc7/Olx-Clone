import React, { useEffect,useState,useContext,useRef } from 'react'
import './Chat.css'
import Avatar from 'react-avatar'
import {PiCurrencyInrThin} from 'react-icons/pi'
import {AiOutlineSend} from 'react-icons/ai'
import {BsChevronDown,BsChevronUp} from 'react-icons/bs'
import chat from './auto_answer_onboarding.webp'
import { useParams } from 'react-router-dom'
import { query, getDocs,collection,where,getDoc,doc } from "firebase/firestore";
import { AuthContext, fireStoreContext } from '../../store/firebaseContext';
import Loader from '../../Pages/Loader'
import Inbox from './Inbox'
import { getDatabase, ref, set,push,onChildAdded,onValue } from "firebase/database";
function Chat() {
  let [show,setShow]=useState(true)
  let [showAll,setShowAll]=useState(true)
  let [post,setPost] = useState([])
  let [seller,setSeller] = useState(null)
  let [val,setVal] = useState('')
  let [room,setRoom] = useState(null)
  let {user} = useContext(AuthContext)
  const [chats,setChats]=useState([])
  const [isChat,setIsChat] = useState(false)
  let {firestore} = useContext(fireStoreContext)
  const popup=useRef(null)
  let params=useParams()
  let db=getDatabase()
  useEffect(()=>{
      document.body.style.overflow='hidden'
      let {proId} = params
    let productsRef=doc(firestore,'products',proId)
      getDoc(productsRef).then(async(snap)=>{
        setPost({id:snap.id,...snap.data()})
        let {userId} =snap.data()
  
  if(user && userId === user.uid){
    let {uid} = params
          if(uid !== null){

            let docRef=query(collection(firestore,'user'),where('id','==',uid))
            getDocs(docRef).then((snap)=>{
            let sellerDetails=snap.docs.map((details)=>{
              return{
                ...details.data()
              }
            })
            setSeller(sellerDetails[0]) 
            
          })
        }
        }else{
          
          let docRef=query(collection(firestore,'user'),where('id','==',userId))
          getDocs(docRef).then((snap)=>{
            let sellerDetails=snap.docs.map((details)=>{
              return{
                ...details.data()
              }
            })
            setSeller(sellerDetails[0])
            
          })
        }
      })
      if(seller){
    
        onValue(ref(db,'/messages/room'),(snapshot)=>{
          let Room=[]
          if(snapshot.exists()){
            let roomsArr=Object.entries(snapshot.val()).map(e => e[1])
            Room=roomsArr.filter((room)=>{
              
              if(proId === room.proId){
                return room.users.includes(user.uid&&seller.id)
              }else{
                return false
              }
            })
          }
          if(Room[0]){
            setRoom(Room[0].id)
            let messagesArr=[]
            onValue(ref(db,'messages/'+Room[0].id+'/'),(snapshot)=>{
            snapshot.forEach((childSnapshot) => {
              const childKey = childSnapshot.key;
              const childData = childSnapshot.val();
              let message={
                id:childKey,
                ...childData
              }
              messagesArr.push(message)
              if(messagesArr[0]){
                setChats(messagesArr)
                setIsChat(true)
              }
            })
          })
        }else{
          setIsChat(true)
        }
      })
    }
  },[seller,user])
  useEffect(()=>{
    if (popup.current) {
      popup.current.focus();
    }


  },[chats,popup])
  const handleSubmit=(text)=>{
    let chat = text ? text : val
    let id
    if(room){
      let date=new Date()
        set(push(ref(db,'messages/'+room+'/')),{
          sender:user.displayName || 'Anonymous User',
          messageText:chat,
          timestamp:date.toDateString(),
          reciever:seller.displayName,
          

        }).then(()=>{
          onChildAdded(ref(db,'messages/'+id),(snapshot)=>{
            setChats([...chats,snapshot.val()])
          })
        })

    }else{
      id=Math.floor((Math.random() * 100) + 1)
      set(push(ref(db,'messages/room')),{
        users:[
          seller.id,
          user.uid
        ],
        id,
        proId:post.id
      }).then(()=>{
        setRoom(id)
        let date=new Date()
        set(push(ref(db,'messages/'+id+'/')),{
          sender:user.displayName || 'Anonymous User',
          messageText:chat,
          timestamp:date.toDateString(),
          reciever:seller.displayName

        }).then(()=>{
          onChildAdded(ref(db,'messages/'+id),(snapshot)=>{
            setChats([...chats,snapshot.val()])
          })
        })
      })
    }
    
  }
  return (
    <div className="">
    {seller && post && isChat ? 
    <div className='chatParentDiv'>
    <div className="flex-divs">

       <Inbox Avatar={Avatar} seller={seller} user={user}  />
    <div className="chat-div">
      <div className="header">
        <div className="avatar-div">
        {seller && <Avatar name={seller.displayName} round size='60' className='avatar'/>}
            <div className="name">
                <p>{seller && seller.displayName}</p>
            </div>                
        </div>
      </div>
      <div className="product-details">
        <div className="product-name">
            <span>{post && post.name}</span>
        </div>
        <div className="product-price">
            <p><PiCurrencyInrThin fontSize={'18px'}/>{post && post.price}</p>
        </div>
      </div>
      <div className="chat-window" style={showAll ? {height:'30%'} :{height:'70%'}}>
        <div className="chats-popup"  >
          {
            chats[0] &&  
            chats.map((chat,index)=>{
              return(
                <div className="">

                {
                  chat.sender === user.displayName ?
                  <div className="chat-popup" tabIndex={'1'}  ref={index === chats.length -1 ? popup : null}>
                  <p>{chat.messageText}</p>
                  <p className="time">{chat.timestamp}</p>
                  </div>
                  :
                  <div className="chat-popup" tabIndex={'1'} ref={popup} style={{background:'#7A9D54'}}>
                  <p>{chat.messageText}</p>
                  <p className="time">{chat.timestamp}</p>
                  </div>

                }
                </div>
                )
            })
            }
        </div>
       
      </div>
      <div className="chat-input-div" style={showAll ? {} :{top:'80%'}}>
        <div className="header">
            {
              show ? <button onClick={()=>{setShowAll(false)
                setShow(false)
              }}><BsChevronDown fontSize={'20px'} fontWeight={'600'}/></button> :<button onClick={()=>{setShowAll(true)
                setShow(true)
              }}><BsChevronUp fontSize={'20px'} fontWeight={'600'}/></button>
            }
          
        </div>

        {
          <div className='input-div' style={showAll ? {} : {padding:'0'}}>
            
                   {
                     showAll &&
                    <div className="">

                   <div className="chat-options">
                    <div className="">
                    <h4 className="heading">Chat to know more!</h4>
                    <h6 className="brief">Close the deal faster by asking more about the product or person.</h6>
                    </div>
                    <div className="image">
                        <img src={chat} alt="" />
                    </div>
                  </div>
                  <div className="recommendations-input">
                    <button className="recommended" onClick={()=>{handleSubmit('hello')}}>hello</button>
                    <button className="recommended" onClick={()=>{handleSubmit('is it available?')}}>is it available?</button>
                    <button className="recommended" onClick={()=>{handleSubmit('no problem')}}>no problem</button>
                    <button className="recommended" onClick={()=>{handleSubmit('please reply')}}>please reply</button>
                    <button className="recommended" onClick={()=>{handleSubmit('not intrested')}}>not intrested</button>
                  </div>
                    </div>
                }
                
                  <div className="input" style={showAll ? {} : {marginTop:'-0.7em'}}>
                    <input type="text" onChange={(e)=>setVal(e.target.value)} placeholder='Type a message'/>
                    <button onClick={()=>handleSubmit()}><AiOutlineSend fontSize={'22px'} className='send-icon'/></button>
                  </div>
              </div>

        }

      </div>
    </div>
    </div>
</div>
    :<Loader/>}
    
</div>
  )
}

export default Chat