import React from 'react'
import Banner from '../Components/Banner/Banner'
import Chat from '../Components/ChatWithSeller/Chat'

function ChatWithSeller() {
  return (
    <div>
        <Banner showImg={true}/>
        <Chat />
    </div>
  )
}

export default ChatWithSeller