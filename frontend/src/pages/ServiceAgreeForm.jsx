import React ,{useState} from 'react'
import Navbar from '../compoents/Navbar'
import ServiceAgreementForm from '../compoents/ServiceAgreementForm'
import Footer from '../compoents/Footer'
import Chat from '../compoents/Chat'


function ServiceAgreeForm() {
  const [showchat , setShowChat] = useState(false);
  
  return (
   <>
   <Navbar showchat={() => {setShowChat(true)}} />
   <ServiceAgreementForm/>
   <Footer/>
   <Chat isOpen ={showchat} toogleChat={()=>setShowChat(prev => !prev)} />
   
   </>
  )
}

export default ServiceAgreeForm