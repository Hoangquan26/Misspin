import React from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { addfriend, findUser } from '../../../firebase/userController';
import FriendCard from './FriendCard';
import { requestFriendResponse } from '../../../firebase/friendController';

export async function loader ({request, params}){
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const email = searchParams.get('q') 
    const tag = searchParams.get('tag')
    const res = await findUser(email,tag, params.uid)
    return res
}

export async function action({request}) {
    const formData = await request.formData()
    const {sender, reUID, type, accept} = Object.fromEntries(formData)
    
    switch(type) {
        case 'addfriend': 
            addfriend(JSON.parse(sender), reUID)
            break;
        case 'requestresponse':
            requestFriendResponse(JSON.parse(sender),JSON.parse(reUID), accept)
            break;
        default: 
            throw new Error('Not found')
    }
    return null
}

const FindFriend = () => {
    const res = useLoaderData()
    return (
        <div className=' flex flex-col h-screen'>
            <div className=' grid grid-cols-4 justify-between w-full'>
                <h3 className=' text-2xl'> Find Friends</h3>
                <Form
                className=' w-full text-white rounded-xl flex items-center gap-2 col-span-3'
                style={{
                    backgroundColor: '#16171b'
                }}
                >
                <div className=' gap-2 basis-full flex items-center p-2'>
                    <SearchRoundedIcon></SearchRoundedIcon>
                    <input defaultValue={''} placeholder='Gmail' className=' p-2 w-full bg-transparent outline-0' type="text" name='q'/>
                </div>
                <div className=' w-1/6 pl-4 border-l-2 border-white '>
                    <input defaultValue={''} placeholder='tag' name='tag' type='text' className=' p-2 w-full outline-none bg-transparent' ></input>
                </div>
                <div className=' w-1/6 h-full flex items-center '>
                    <button className=' w-full h-full bg-white rounded-r-xl text-black font-semibold' type='submit'>
                        Search
                    </button>
                </div>
                </Form>
            </div>
            <div className='  h-full flex gap-10 flex-wrap mt-10 '>
                {
                    !res ?
                    <p>No User Found</p>
                    :
                    res.map((value) => 
                        <FriendCard 
                        key={value.uid} uid={value.uid} photoURL={value.photoURL} name={value.name} email={value.email} type={`findFriend`}></FriendCard>
                    )
                }
            </div>
        </div>
    );
};

export default FindFriend;