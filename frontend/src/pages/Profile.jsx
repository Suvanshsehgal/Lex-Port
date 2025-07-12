import React ,{useState} from 'react'
import Navbar from '../compoents/Navbar'
import Footer from '../compoents/Footer' 
import Chat from '../compoents/Chat'
import History from '../compoents/History'
import ProfileSection from '../compoents/ProfileSection'
function Profile() {
  const [showchat , setShowChat] = useState(false);
  return (
    <>
    <Navbar showchat={() => {setShowChat(true)}}/>
    <ProfileSection/>
    <History/>
    <Footer/>
    <Chat isOpen ={showchat} toogleChat={()=>setShowChat(prev => !prev)} />
    </>
    
  )
}

export default Profile