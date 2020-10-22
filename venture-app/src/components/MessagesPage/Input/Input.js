import React from 'react'
import './Input.css'

const Input = ({ setMessage, sendMessage, message }) => {

    const handleInput = (event) => {
        setMessage(event.target.value)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage(event)
        }
        else {
            return null
        }
    }


    return (
        <form className='form'>
            <input className='input' type='text' placeholder='Enter a message...' 
            value={message} 
            onChange={handleInput} 
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}/>
            <button className='sendButton' onClick={e => sendMessage(e)}>Send</button>
        </form>
    )
}

export default Input