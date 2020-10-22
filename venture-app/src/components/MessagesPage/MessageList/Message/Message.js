import React, { useEffect } from 'react'
import queryString from 'query-string'
import './Message.css'

const Message = ({message}) => {
    let sentByUser = false;

    if (message.sender_name == window.localStorage.getItem('loggedUser')) {
        sentByUser = true;
    }
    
    return (
        <div>
            {sentByUser && <div className='messageContainer justifyEnd'>
                <p className='sentText pr-10'>{message.sender_name}</p>
                <div className='messageBox backgroundBlue'> 
                    <p className='messageText colorWhite'>{message.content}</p>
                </div>
            </div>}
            {!sentByUser && <div className='messageContainer justifyStart'>
                <p className='sentText pr-10'>{message.sender_name}</p>
                <div className='messageBox backgroundLight'> 
                    <p className='messageText colorDark'>{message.content}</p>
                </div>
            </div>}
        </div>
    )
}

export default Message