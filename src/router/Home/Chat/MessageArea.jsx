import { get, getDatabase, limitToFirst, onValue, orderByChild, query, ref } from 'firebase/database';
import React, { useEffect, useRef, useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import ChatBar from './ChatBar';
import { Tooltip } from '@mui/material';
import MainMessage from './MainMessage';
import { sendMessage } from '../../../firebase/chatsController';

export function loader({params}) {
    const id = params.messageId
    return id
}

export async function action ({request, params}) {
    const formData = await request.formData()
    const id = params.messageId
    const {user, image, content}  = Object.fromEntries(formData)
    const res = sendMessage(content, JSON.parse(user), id , 'text')
    console.log(res)
    // const res = await sendMessage()
    return null
}

const MessageArea = () => {
    const [chatroom, setChatroom] = useState({})
    const id = useLoaderData()
    const db = getDatabase()
    // console.log('chatroom: ', chatroom)
    useEffect(() => {
        get(ref(db, `/group/${id}`))
        .then(data => {
            setChatroom(data.val())
        })
    }, [id])
    return (
        <div className=' flex text-white h-full'>
            <div className=' flex flex-col basis-3/4 rounded-xl overflow-hidden h-full grow-0'>
                <div className=' bg-black flex w-full p-4 items-center justify-between h-16'>
                    <div className=' flex items-center gap-5'>
                        <img className=' w-8 h-8 object-cover object-center rounded-full' src={chatroom.avatar}></img>
                        <p className=' mr-2 text-sm'>Conversation with <span className=' font-semibold'>{chatroom.name}</span></p>
                    </div>
                    <Form>
                        <Tooltip title='Pin chat' placement='top'>
                            <PushPinOutlinedIcon
                            className=' cursor-pointer'
                            ></PushPinOutlinedIcon>
                        </Tooltip>
                    </Form>
                </div>
                <div 
                    className=' flex-grow basis-full flex flex-col'
                    style={{
                        backgroundColor: '#1d1e24'
                    }}
                    >
                    <MainMessage></MainMessage>
                    <ChatBar></ChatBar>
                </div>
            </div>
            <div className=' flex flex-col'>
                
            </div>
        </div>
    );
};

export default MessageArea;