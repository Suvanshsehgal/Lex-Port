import React ,{useState} from 'react'
import Footer from "../compoents/Footer";
import Navbar from "../compoents/Navbar";
import Chat from "../compoents/Chat";
import RentAgreementForm from '../compoents/RentForm';

function RentAggrementForm() {
     const [showchat , setShowChat] = useState(false);
  return (
    <>
    <Navbar showchat={() => {setShowChat(true)}}/>
    <RentAgreementForm/>
    <Footer/>
    <Chat isOpen ={showchat} toogleChat={()=>setShowChat(prev => !prev)} />
    </>
  )
}

export default RentAggrementForm