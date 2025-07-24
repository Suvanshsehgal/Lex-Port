import React ,{useState} from 'react'
import Navbar from '../compoents/Navbar'
import Chat from '../compoents/Chat'
import NdaAgreementForm from '../compoents/NdaAgreeForm'
import Footer from '../compoents/Footer'
function NdaAgree() {
   const [showchat , setShowChat] = useState(false);
  return (
    <>
    <Navbar showchat={() => {setShowChat(true)}}/>
    <NdaAgreementForm />
    <Footer/>
    <Chat isOpen ={showchat} toogleChat={()=>setShowChat(prev => !prev)} />
    </>
  )
}

export default NdaAgree