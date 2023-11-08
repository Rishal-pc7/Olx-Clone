import React,{useState} from 'react';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Login.css';
function Login() {
  let [email,setEmail] = useState('')
  let [password,setPassword] = useState('')
  let [error,setError] = useState(null)
  let navigate=useNavigate()
  const handleLogin = (e)=>{
    e.preventDefault()
    let auth=getAuth() 
    signInWithEmailAndPassword(auth,email,password).then(()=>{
       navigate('/')
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
      <div className="loginParentDiv">
        <img width="350px" height="300px" src={Logo} alt='logo'></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            name="email"
            placeholder="john@email.com"
            onChange={(e)=>setEmail(e.target.value)}
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
          />
          <br />
          <br />
          {error ? <p style={{textTransform: 'capitalize'}} className='error-message'>{error}</p> : ""}
          <button>Login</button>
        </form>
        <a href='/signup'>Don't Have an account?<span>Signup</span></a>
      </div>
    </div>
  );
}

export default Login;
