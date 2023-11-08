import React,{useState} from 'react';
import { useMediaQuery } from 'react-responsive'
import './Banner.css';
import Arrow from '../../assets/Arrow'
function Banner(props) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const [show,setShow] = useState(false)
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
            {
              isTabletOrMobile ? <button style={{background:'none',border:"none"}} onClick={()=>{setShow(!show)}}> <Arrow onclick={()=>{
               
              }}></Arrow></button>
              
               :<Arrow></Arrow> 
            }
            </div>
            {
              isTabletOrMobile && show ?  <div className="otherQuickOptions" style={{display:'grid'}} >
              <span>Cars</span>
              <span>Motorcy...</span>
              <span>Mobile Ph...</span>
              <span>For Sale:Houses & Apart...</span>
              <span>Scoot...</span>
              <span>Commercial & Other Ve...</span>
              <span>For Rent: House & Apart...</span>
            </div> :''
            }
            <div className="otherQuickOptions">
              <span>Cars</span>
              <span>Motorcy...</span>
              <span>Mobile Ph...</span>
              <span>For Sale:Houses & Apart...</span>
              <span>Scoot...</span>
              <span>Commercial & Other Ve...</span>
              <span>For Rent: House & Apart...</span>
            </div>
         
        </div>
        { props.showImg? '':

          <div className="banner">
          <img
            src="../../../Images/banner copy.png"
            alt=""
            />
        </div>
        }
      </div>
     
    </div>
  );
}

export default Banner;
