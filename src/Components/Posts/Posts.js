import React,{useContext,useEffect,useState} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { fireStoreContext } from '../../store/firebaseContext';
import {postNames} from '../../store/postContext'
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Pages/Loader';
import noResults from './noResults.webp'
function Posts({product}) {
  let [posts,setPosts] = useState([])
  let [notFound,setNotFound] = useState(false)
  let {firestore} = useContext(fireStoreContext)
  let {setItem} = useContext(postNames)
  let navigate=useNavigate()
  useEffect(()=>{
     let data=collection(firestore,'products')
     getDocs(data).then((snapshot)=>{
      let allPosts=snapshot.docs.map((data)=>{
        return {

          ...data.data(),
          id:data.id
        }

      })
      setItem(allPosts.map((items)=>{
        return {name:items.name,category:items.category}
      }))
      if(product){
        product=product.toLowerCase()
        let filtered=allPosts.filter((items)=>{
          return items.name.toLowerCase().includes(product)
         })
         if(filtered[0]){
          
           setPosts(filtered)
         }else{
          setNotFound(true)
         }
      }else{

        setPosts(allPosts)
      }
    })
  },[firestore,product])
    
  return (
    <div className="postParentDiv">
      
      {
        posts[0] ? 
        <div>

        {
          product && <div className='searchParentDiv'>
          <div className="redirected">
              <h3 className='pro-name'>Showing Results for "{product}" </h3>
          </div>
  
  
      </div>
        }
        <div className="recommendations" style={product &&{paddingTop:'0'}}>
        <div className="heading">
          {product? '':<span>Fresh recommendations</span>}
        </div>
        <div className="cards">
          {
            
            posts.map((post,index)=>{
              
              return (<div className="card" key={index} onClick={()=>{
                navigate(`/view-post/${post.id}`)
              }}>
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={post.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {post.price}</p>
              <span className="kilometer">{post.category}</span>
              <p className="name"> {post.name}</p>
            </div>
            <div className="date">
              <span>{post.createdAt}</span>
            </div>
          </div>)
            })
            
          }
          
        </div>
        { product ? '' :

<div className="view-more">
          <button>Load More</button>
        </div>
        }
      </div>
        </div>
            : 
            notFound ? <div className='notFoundDiv'>
              <div className="">

            <h4 className="message">Oops... we didn't find anything that matches this search :(</h4>
            <h5 className='recommend-message'>Try search for something more general, change the filters or check for spelling mistakes</h5>
            <div className="oops-img">

            <img src={noResults} alt="" />
            </div>
              </div>
      
          </div> : <Loader/>

  }

    </div>
  );
}

export default Posts;
