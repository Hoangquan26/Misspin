import React, { useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { createChatSeletor } from '../../app/createChatSlice';
import { userSelector } from '../../app/userSlice';
import Header from './Header';
import CreateChat from './CreateChat/CreateChat';
const Home = () => {
    const onCreateChat = useSelector(createChatSeletor)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(userSelector)
    useEffect(() => {
        if(!user) {
            navigate('/')
        }
    }, [user])
    return (
        <>
            <div className=' flex flex-col overflow-hidden' 
            style={{
                backgroundColor: '#29313c',
                height: '100vh'
            }}>
                <Header user={user}></Header>
                <Outlet></Outlet>
            </div>
            {
                onCreateChat ? 
                    <CreateChat></CreateChat>
                :
                ''
            }
            
        </>
    );
};

export default Home;