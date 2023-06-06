import React, { useState } from 'react';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Button, Tooltip } from '@mui/material';
import { Form } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../app/userSlice';
const ChatBar = () => {
    const user = useSelector(userSelector)
    const [message, setMessage] = useState('')
    const [image, setImage] = useState(null)
    // const [message, setMessage] = useState('')
    return (
        <Form method='post'
        onSubmit={(e) => {
            setMessage('')
        }}
        style={{
            backgroundColor: '#16171b'
        }}
        className=' gap-2 items-center flex rounded-xl h-14 m-4 p-2'>
            <input type={'hidden'} name='user' value={JSON.stringify(user)}></input>
            <input 
            value={message}
            onChange={(e) => {
                setMessage(e.target.value)
            }}
            placeholder='Type here...' 
            name='content'
            className=' ml-2 p-2 text-sm border-0 outline-0 bg-transparent flex-grow'></input>
            <div className=' flex gap-2'>
                <Tooltip title='image' placement='top'>
                    <Button variant=' standard' component='label'>
                        <ImageRoundedIcon></ImageRoundedIcon>
                        <input name='image' type={'file'} hidden ></input>
                    </Button>
                </Tooltip>
            </div>
            <button type='submit' className=' transition-all hover:bg-yellow-300 cursor-pointer text-black flex items-center justify-center p-2 bg-[#f3fc89] rounded-xl mr-1'>
                <SendRoundedIcon className=''></SendRoundedIcon>
            </button>
        </Form>
    );
};

export default ChatBar;