import React,{useContext,useState,useEffect} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import Logout from '../../assets/Logout';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import Avatar from 'react-avatar';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/firebaseContext';
import { getAuth,signOut } from 'firebase/auth';
import {  postNames } from '../../store/postContext';
import { PiChatCircleBold } from "react-icons/pi";
function Header() {
  let {user} = useContext(AuthContext)
  let {item} =useContext(postNames)
  let [show,setShow] = useState(false)
  let [results,setResults] = useState([])
  let [searchValue,setSearchValue] = useState('')
  useEffect(() => {
    setSearchValue(window.sessionStorage.getItem("searchValue"));
    setShow(false)
  }, []);
  
  useEffect(() => {
    window.sessionStorage.setItem("searchValue", searchValue);
  }, [searchValue]);
  let navigate=useNavigate()
  
  const handleLogout = () =>{
    let auth=getAuth()
    signOut(auth).then(()=>{
      setShow(false)
       navigate('/')
    })
  }
  const handleSearch =(e)=>{
    setSearchValue(e.target.value)
    if(e.target.value !== ''){

      let searchItems=item.filter((item)=>{
        return item.name.toLowerCase().includes(e.target.value.toLowerCase())
      })
      if(searchItems[0]){

        setResults(searchItems)
      }else{

        let error=[{
          error:'No Item Found',
          
        }]
        setResults(error)
      }
    }else{
      
      setResults([])
    }
  }
  return (

    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" placeholder='India'/>
          <Arrow></Arrow>
        </div>
        <div className="searchOptions">

        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
              value={searchValue}
              onChange={handleSearch}
              />
            
          </div>
          <button className="searchAction" onClick={()=>{navigate(`/${searchValue}`)
          setResults([])
        }}>
            <Search color="#ffffff" ></Search>
          </button>
        </div>
        {
          results[0] ?
          
          <div className="searchResults">
              <div className="items">
                <></>
                {
                  results.map((item,index)=>{
                    return(
                      
                      <div className="item" key={index} style={item.error ? {borderBottom:'none'} : {}}>
                  <div className="details" onClick={()=>{item.name && setSearchValue(item.name)
                    navigate(`/${item.name}`)
                    setResults([])
                  }}>
                    <h5 className="name">{item.error ? item.error : item.name}</h5>
                    <p className="category">{item.category}</p>
                  </div>
                </div>
                      )
                    })
                  }
              </div>
            </div>
            :''
          }
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          { user ? 
    
          <div className="user-div">
            <div>

              <PiChatCircleBold style={{fontSize:'30px',marginTop:'5px'}} onClick={()=>navigate('/inbox')}/>
            </div>
           <div className="avatar-div">

            <Avatar name={`${user.displayName}`} round size='40' className='avatar'/>
            <button onClick={()=>{setShow(!show)}}><Arrow></Arrow></button>
          </div>
          {
            show &&
            <div className="account">
           <div className="details">
            <Avatar name={`${user.displayName}`} round size='60' className='avatar'/>
             <h5>{user.displayName}</h5>     
           </div>
           <div className="logout">
            <button onClick={handleLogout}><Logout></Logout> Logout</button>
           </div>
        </div> 
        }
        </div>

:
        <div className="">

          <span><Link to={'/login'} style={{color:'#000'}}>Login</Link></span>
          <hr />
          </div>
          }
         
        </div>
        <div className="sellMenu" onClick={()=>navigate('/sell-item')}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
