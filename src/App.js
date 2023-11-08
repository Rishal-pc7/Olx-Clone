import './App.css';
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { BrowserRouter as Router,Routes,Route,Navigate,useLocation } from 'react-router-dom';
import { useEffect,useContext } from 'react';
import { AuthContext } from './store/firebaseContext';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import Create from './Components/Create/Create';
import ViewPost from './Pages/ViewPost';
import Context from './store/postContext';
import SearchResults from './Pages/SearchResults';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import ChatWithSeller from './Pages/ChatWithSeller';
import Inbox from './Pages/Inbox';  

function App() {
  const {user,setUser} = useContext(AuthContext)
  let location=useLocation()
  useEffect(()=>{
    document.body.style.overflow='auto'

    let auth=getAuth()
    onAuthStateChanged(auth,(user)=>{
      if(user){
         
        setUser(user)
      }
      else{
        setUser(null)
      }
    })
  })
  return (
    <div>
       <Context>
        <Header/>
           <Routes>
              
              <Route path='/' exact element={<Home />}/>
              <Route path='/:query' element={<SearchResults />}/>
              <Route path='/signup' element={<Signup />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/chat/:proId/:uid' element={<ChatWithSeller/>}/>
              <Route path='/sell-item' element={user? <Create/> : <Navigate to='/login' replace />}/>
              <Route path='/view-post/:proId' element={<ViewPost/>}/>
              <Route path='/inbox' element={<Inbox/>}/> 
           </Routes>  
        { location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/sell-item' ? '' : <Footer/>}
       </Context>
    </div>
  );
}

export default App; 
