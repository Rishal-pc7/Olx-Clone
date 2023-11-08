import React,{useState,useContext} from 'react';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { collection,setDoc,doc } from 'firebase/firestore';
import { fireStoreContext } from '../../store/firebaseContext';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
export default function Signup() {
  let navigate=useNavigate()
  let [username,setUsername] = useState('')
  let [email,setEmail] = useState('')
  let [phone,setPhone] = useState('')
  let [password,setPassword] = useState('')
  let [error,setError] = useState(null) 
  let {firestore}=useContext(fireStoreContext)
  const handleSubmit = (e) =>{
    e.preventDefault()
    const auth= getAuth()
    createUserWithEmailAndPassword(auth,email,password).then((result)=>{
        updateProfile(result.user,{
          displayName:username 
        }).then(()=>{

          let data=collection(firestore,'user')
          setDoc(doc(data),{
            id:result.user.uid,
            displayName:username,
            phone:phone,
          }).then(()=>{
            signInWithEmailAndPassword(auth,email,password).then(()=>{
              
              navigate('/')
            })
          }).catch((err)=> console.log(err))
        })
    }).catch((err)=>{
      let error=err.code
      let errArr=error.split('auth/')
      let strErr=errArr.join(' ')
      err=strErr
      errArr=err.split('-')
      strErr=errArr.join(' ')
      setError(strErr)
    }) 
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="350px" height="300px" src={Logo} alt='Logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            name="name"
            placeholder='John'
            onChange={(e)=>setUsername(e.target.value)}
            required
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            name="email"
            placeholder='john@email.com'
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="tel"
            name="phone"
            placeholder='123456789'
            onChange={(e)=>setPhone(e.target.value)}
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          {error ? <p style={{textTransform: 'capitalize'}} className='error-message'>{error}</p> : ""}
          <button>Signup</button>
        </form>
        <a href='/login'>Already Have an account?<span>Login</span></a>
      </div>
    </div>
  );
}
