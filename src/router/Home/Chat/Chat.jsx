import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchBar from '../../component/SearchBar';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import MessageWrapper from './MessageWrapper';
import { useDispatch } from 'react-redux';
import { showOnCreateChat } from '../../../app/createChatSlice';
import './chat.css'
/*

groups : {
    id1: {
        name: ...,
        photoURL: ...,
        member: {
            one: ...,
            two: ...
        },
        lastMessage: ...,
        timeStamp: ...
    },
    id2: {
        ...
    },...
}

massage : {
    id1: {
        one: {
            content: ...,
            timeStamp: ...
        }
    }
}

*/ 

export async function loader({request}) {
    const url = new URL(request.url)
    const requestParams = new URLSearchParams(url.searchParams)
    return requestParams.get('q')
}

const Chat = () => {
    const dispatch = useDispatch()
    return (
        <div className=' flex p-8 gap-10'>
            <div className=' flex flex-col'>
                <div className=' flex justify-between'>
                    <SearchBar options={[]}></SearchBar>
                    <button
                    onClick={() => {
                        dispatch(showOnCreateChat())
                    }}
                    className=' bg-white text-gray-800 rounded-full text-sm font-semibold ml-4 pl-4 pr-4 transition-all border-[1px] hover:border-white hover:text-white hover:bg-[#29313c]'>
                        <AddCircleRoundedIcon sx={{fontSize: 24}}></AddCircleRoundedIcon>
                    </button>
                </div>
                <MessageWrapper></MessageWrapper>
            </div>
            <div className=' basis-2/3 chatWrapper'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Chat;