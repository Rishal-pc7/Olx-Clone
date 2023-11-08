import React,{useContext,useEffect, useState} from 'react';
import { query, getDocs,collection,where,getDoc,doc } from "firebase/firestore";
import './View.css';
import { fireStoreContext,AuthContext } from '../../store/firebaseContext';
import { useParams,useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import Loader from '../../Pages/Loader';

function View() {
  let [seller,setSeller] = useState(null)
  let [post,setPost] = useState(null)
  let {firestore} = useContext(fireStoreContext)
  let {user} = useContext(AuthContext)
  let params=useParams()
  let navigate=useNavigate()
  useEffect(()=>{
    let {proId} = params
    let productsRef=doc(firestore,'products',proId)
    getDoc(productsRef).then(async(snap)=>{
      setPost({id:snap.id,...snap.data()})
      let {userId} =snap.data()
        let docRef=query(collection(firestore,'user'),where('id','==',userId))
        getDocs(docRef).then((snap)=>{
          let sellerDetails=snap.docs.map((details)=>{
            return{
              ...details.data()
            }
        })
        setSeller(sellerDetails[0])
        
      })
    })
    
  },[])
  return (
    
      <div className="">
      
      {post && seller ?
        
        <div className="viewParentDiv">
        <div className="leftDiv">
        
        <div className="imageShowDiv">
        <img
        src={post.url}
        alt=""
          />
          </div>
          <div className="descriptionDiv">
          <h5 className="heading">Description</h5>
          <p>{post.description}</p>
          </div>
          </div>
      <div className="rightSection">
        <div className="productDetails">
        <p>&#x20B9; {post.price} </p>
        <span className='productName'>{post.name}</span>
        <span className='postedDate'>{post.createdAt}</span>
        </div>
        {seller&& seller.id !== user.uid  ?<div className="contactDetails">
        <div className="avatar-div">
        
        <Avatar name={`${seller.displayName}`} round size='80' className='avatar'/>
        <h5>{seller.displayName}</h5>
        </div>
        <button className="chatwith" onClick={()=>navigate(`/chat/${post.id}/${null}`)}>Chat With Seller</button>
        </div>
        :''
      }
      </div>
      </div>
      :
      <Loader/>
    }
    </div>

  );
}
export default View;
