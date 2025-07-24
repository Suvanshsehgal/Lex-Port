import React ,{useState} from 'react'
import Navbar from '../compoents/Navbar'
import PartnershipAgreementForm from '../compoents/PartnershipAgree'
import Footer from '../compoents/Footer'
import Chat from '../compoents/Chat'
function PartnershipAgreement() {
  const [showchat , setShowChat] = useState(false);
  return (
    <>
    <Navbar showchat={() => {setShowChat(true)}}/>
    <PartnershipAgreementForm/>
    <Footer/>
    <Chat isOpen ={showchat} toogleChat={()=>setShowChat(prev => !prev)} />
    
    </>
  )
}

export default PartnershipAgreement