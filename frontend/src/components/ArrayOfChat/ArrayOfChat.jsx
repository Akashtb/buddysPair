import React from 'react'

function ArrayOfChat({message,own}) {
    console.log("each message",message);
    
  return (
    <div>
         <div key={message.id} className={`message ${own ?"sent":"received"}`}>
                <div className="message-cont">
                  {message.text}
                </div>
              </div>
    </div>
  )
}

export default ArrayOfChat