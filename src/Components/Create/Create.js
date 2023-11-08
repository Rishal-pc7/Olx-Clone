import React, { Fragment,useState,useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, fireStoreContext } from '../../store/firebaseContext';
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { setDoc,doc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  let [name,setName] = useState('')
  let [category,setCategory] = useState('')
  let [price,setPrice] = useState('')
  let [description,setDescription] = useState('')
  let [image,setImage] = useState(null)
  let {user} =useContext(AuthContext)
  let {firestore} = useContext(fireStoreContext)
  let date=new Date()
  let navigate=useNavigate()
  const handleSubmit = () =>{
    let storage=getStorage()
    const storageRef = ref(storage, `/images/${name}`);
    uploadBytes(storageRef,image).then(({ref})=>{
      getDownloadURL(ref).then((url)=>{
        console.log(url)
        let data=collection(firestore,'products')
        setDoc(doc(data),{
          name,
          category,
          price,
          description,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        }).then(()=>{
          navigate('/')
        })
      })
    })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              placeholder="Yamaha RX135,Maruti 800 etc."
              onChange={(e)=>setName(e.target.value)}
              required
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              placeholder="Bike,Car etc."
              onChange={(e)=>setCategory(e.target.value)}
              required
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" onChange={(e)=>setPrice(e.target.value)} required />
            <br />
            <label htmlFor="">Description</label>
            <br />
            <textarea name="" className='input' id="" cols="30" rows="5" onChange={(e)=>setDescription(e.target.value)}></textarea>
          <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image): ''}></img>
            <br />
            <input type="file"  onChange={(e)=>setImage(e.target.files[0])} required/>
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
