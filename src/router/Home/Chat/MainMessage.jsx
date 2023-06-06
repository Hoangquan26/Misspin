import { getDatabase, limitToFirst, limitToLast, onValue, orderByChild, query, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { auth } from '../../../firebase/config';
import MessageItem from './MessageItem';
import styled from 'styled-components';

const DivStyled = styled.div`
    &{
        height: 100px;
        overflow-y: scroll;
    }
    ::-webkit-scrollbar {
        width: 1px;
    }
`

const MainMessage = () => {
    const [message, setMessage] = useState({})
    const id = useLoaderData()
    const db = getDatabase()
    let thisMessage = null
    // if(message.length > 0) {
    //     const firstChild = message[0]
    //     thisUser = {
    //         ...firstChild.sendBy
    //     }
    // }
    // console.log('message: ', message)
    useEffect(() => {
        const sort = query(query(ref(db, `/message/${id}`), orderByChild('timestamp'), limitToLast(20)))
        const unsubcribe = onValue(sort, (snapshot) => {
            if(snapshot.exists) {
                const reverseArray = Object.values(snapshot.val()).reverse()
                setMessage(reverseArray)
            }
        })
        return unsubcribe
    }, [id])
    return (
        <DivStyled className=' grow p-4 flex flex-col-reverse'>
        {
            message.length > 0 ?
            message.map((value, index) => {
                let byMe = value.sendBy.uid == auth.currentUser.uid ? true : false;
                const date = new Date(value.timestamp)
                let userComponent
                if(thisMessage == null ||(thisMessage.sendBy.uid != value.sendBy.uid && thisMessage.timestamp >= (value.timestamp - 3 * 60 * 60 * 1000))) {
                    userComponent = 
                    !byMe ? 
                    <div className=' flex gap-4 items-center p-2'>
                        <img src={value.sendBy.photoURL} className=' h-8 w-8 rounded-full object-cover object-center'></img>
                        <p className=' text-xs'>{value.sendBy.name}</p>
                        <p className=' text-gray-400 text-xs'>{`${date.getHours()}:${date.getMinutes()}`}</p>
                    </div>
                    :
                    <div className=' flex gap-4 items-center p-2 justify-end'>   
                        <p className=' inline-block text-right text-gray-400 text-xs'>{`${date.getHours()}:${date.getMinutes()}`}</p>
                    </div>
                }
                else {
                    thisMessage = value
                    userComponent = ''
                }
                return (
                    <div>
                        {userComponent}
                        <MessageItem content={value.content} type={value.type} byMe={byMe}></MessageItem>
                    </div>
                )
            }
            )
            :
            ''
        }
    </DivStyled>
    );
};

export default MainMessage;