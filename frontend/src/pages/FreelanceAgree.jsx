import React ,{useState} from 'react'
import Navbar from '../compoents/Navbar'
import FreelanceAgreementForm from '../compoents/FreelanceAgreeForm'
import Footer from '../compoents/Footer'
import Chat from '../compoents/Chat'

function FreelanceAgree() {
  const [showchat , setShowChat] = useState(false);
  return (
    <>
    <Navbar showchat={() => {setShowChat(true)}}/>
    <FreelanceAgreementForm/>
    <Footer/>
        <Chat isOpen ={showchat} toogleChat={()=>setShowChat(prev => !prev)} />
    
    </>
  )
}

export default FreelanceAgree