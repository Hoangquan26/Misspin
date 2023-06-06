import React from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { messagesSelector } from '../../../app/messageSlice';
import useChat from '../../../firebase/chatsController';
import ChatItem from './ChatItem';

const MessageWrapper = () => {
    const q = useLoaderData()
    const chatrooms = useChat(q)
    return (
        <div className=' flex flex-col gap-4 mt-10 '>
            {
                chatrooms.map((value, index) => {
                    return (
                        <ChatItem key={index} name={value.name} photoURL={value.avatar} message={value.lastMessage} time={value.timestamp} uid={value.uid} id={value.id}></ChatItem>
                    )
                })
            }
        </div>
    );
};

export default MessageWrapper;