import React from 'react'
import './Message.css'

const Message = ({message}) => {
    return (
        <div>
            {message.sender_name}: {message.content}
        </div>
    )
}

export default Message