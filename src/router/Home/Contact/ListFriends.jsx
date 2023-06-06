import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { getListFriends } from '../../../firebase/usercontroller';
import SearchBar from '../../component/SearchBar';
import FriendCard from './FriendCard';

export async function loader({request ,params}) {
    const list = await getListFriends(params.uid)
    if(list)
        return Object.values(list)
    else    
        return []
}

const ListFriends = () => {
    const listFriends = useLoaderData() 
    console.log(listFriends)
    return (
        <div className=' flex flex-col'>
            <div className=' flex justify-between w-full'>
                <h3 className=' text-2xl'> List Friends</h3>
                <SearchBar></SearchBar>
            </div>
            <div className=' flex gap-10 flex-wrap'>
                {
                    !listFriends ?
                    <p className=' text-gray-200'>You don't have any friends yet</p>
                    :
                    listFriends.map(value => 
                    <FriendCard
                    key={value.uid} uid={value.uid} photoURL={value.photoURL} name={value.name} email={value.email} type={'friendList'}
                    ></FriendCard>
                )
                }
            </div>
        </div>
    );
};

export default ListFriends;