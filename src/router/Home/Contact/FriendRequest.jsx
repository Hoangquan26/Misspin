import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { getFriendRequest } from '../../../firebase/usercontroller';
import FriendCard from './FriendCard';

export async function loader({params}) {
    const friendRequest = await getFriendRequest(params.uid)
    return friendRequest
}

const FriendRequest = () => {
    let friendRequest = useLoaderData()
    if(friendRequest != null)
        friendRequest = Object.values(friendRequest)
    console.log(friendRequest)
    return (
        <div className=' flex gap-10 flex-wrap'>
            {
                friendRequest != null?
                friendRequest.map(value => 
                    <FriendCard
                    key={value.uid} uid={value.uid} photoURL={value.photoURL} name={value.name} email={value.email} type={'friendRequest'}
                    ></FriendCard>
                )
                :
                <p>You don't have any friend requests</p>
            }
        </div>
    );
};

export default FriendRequest