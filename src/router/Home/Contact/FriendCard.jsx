import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../app/userSlice';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import ChatIcon from '@mui/icons-material/Chat';
import { Form, json, useFetcher } from 'react-router-dom';


const FriendCard = ({photoURL, name, email, uid, type}) => {
    const fetcher = useFetcher()
    const user = useSelector(userSelector)
    let customBtn
    if(type == 'friendRequest')
        customBtn = <div className=' flex gap-2 '>
                    <fetcher.Form method='post'>
                        <input type={'hidden'} name='sender' value={
                            JSON.stringify({
                                ...user
                            })
                        }></input>
                        <input type={'hidden'} name='reUID' value={
                            JSON.stringify({
                            uid,
                            name,
                            email,
                            type,
                            photoURL
                        })
                        }></input>
                        <input type={'hidden'} name='type' value='requestresponse'></input>
                        <input type={'hidden'} name='accept' value={true}></input>
                        <button type='submit'
                        className=' hover:border-green-600 hover:bg-white hover:text-green-600 transition-all border-[1px] p-2 mb-2 bg-green-600 rounded-lg text-sm text-white font-semibold flex items-center gap-2'>
                        <PersonAddRoundedIcon sx={{fontSize: 16}}></PersonAddRoundedIcon>
                        Accept
                        </button>
                    </fetcher.Form>
                    <fetcher.Form method='post'>
                        <input type={'hidden'} name='sender' value={
                             JSON.stringify({
                                ...user
                            })
                        }></input>
                        <input type={'hidden'} name='reUID' value={
                            JSON.stringify({
                            uid,
                            name,
                            email,
                            type,
                            photoURL
                        })
                        }></input>
                        <input type={'hidden'} name='accept' value={false}></input>
                        <input type={'hidden'} name='type' value='requestresponse'></input>
                        <button type='submit'
                        className=' hover:border-red-500 hover:bg-white hover:text-red-500 transition-all border-[1px] p-2 mb-2 bg-red-500 rounded-lg text-sm text-white font-semibold flex items-center gap-2'>
                        <PersonAddRoundedIcon sx={{fontSize: 16}}></PersonAddRoundedIcon>
                        Reject
                        </button>
                    </fetcher.Form>
                    </div>
    else if(type == 'friendList')
        customBtn = 
        <button className=' p-2 mb-2 bg-blue-600 rounded-lg text-sm text-white font-semibold flex items-center gap-2'>
            <ChatIcon sx={{fontSize: 16}}></ChatIcon>
            Chat
        </button>
    else 
        customBtn = 
        <fetcher.Form method='post'>
            <input type={'hidden'} name='sender' value={JSON.stringify(user)}></input>
            <input type={'hidden'} name='reUID' value={uid}></input>
            <input type={'hidden'} name='type' value='addfriend'></input>
            <button type='submit'
            className=' hover:border-blue-600 hover:bg-white hover:text-blue-600 transition-all border-[1px] p-2 mb-2 bg-blue-600 rounded-lg text-sm text-white font-semibold flex items-center gap-2'>
            <PersonAddRoundedIcon sx={{fontSize: 16}}></PersonAddRoundedIcon>
            Add friend
            </button>
        </fetcher.Form>
    return (
        <div className=' transition-all hover:-translate-y-3 h-56 w-44 p-4 flex flex-col bg-white text-black rounded-lg shadow-lg shadow-black'>
            <div className=' flex items-center justify-center mb-5'>
                <img className=' rounded-full w-20 h-20 object-cover object-center' src={`${photoURL}`}></img>
            </div>
            <div className=' flex flex-col items-center justify-between'>
                <div className=' flex flex-col items-center'>
                    <p className=' font-semibold'>{name}</p>
                    <p className=' text-xs text-gray-400 text-ellipsis whitespace-nowrap overflow-hidden w-full'>{email}</p>
                </div>
                <div className=' flex items-center justify-center mt-5'>
                    {
                        customBtn
                    }
                </div>
            </div>
        </div>
    );
};

export default FriendCard;