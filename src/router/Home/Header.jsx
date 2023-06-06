import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import style, { keyframes } from 'styled-components'
import { auth } from '../../firebase/config';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { signOutUser } from '../../app/userSlice';
const NavLinkStyle = style(NavLink)`
    &{
        font-size: 14px
    }
    &.active {
        color: #f2fc89;
        position: relative;
    }

    $.active::after {
        content: '';
        position: absolute;
        top: 0vh;
        width: 100%;
        left: 0;
        height: 2rem;
        background-color: #f2fc89;
    }
`
const fadein = keyframes`
    from {
        opacity: 0
    }
    to {
        opacity: 1
    }
`

const Header = ({user}) => {
    const [onOption, setOnOption] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <div className=' flex p-2 pl-4 pr-4 items-center justify-between text-white shadow-sm shadow-black min-h-[64px]' 
        style={{
            backgroundColor: '#29313c'
        }}>
            <div>
                <p style={{
                    fontSize: '20px',
                    background: '-webkit-linear-gradient(#000, #fff)',
                    WebkitTextFillColor: 'transparent',
                    WebkitBackgroundClip: 'text'
                }}>Messpin</p>
            </div>
            <div className=' flex items-center gap-10'>
                <NavLinkStyle to={'/home/message'}
                className={({isActive, isPending}) => 
                    isPending? 'pending' : isActive ? 'active' : ''
                }
                >
                    <p><ChatOutlinedIcon className=' mr-2' sx={{fontSize: 18}}></ChatOutlinedIcon>Chats</p>
                </NavLinkStyle>
                <NavLinkStyle to={'/home/contacts'}
                className={({isActive, isPending}) => 
                    isPending? 'pending' : isActive ? 'active' : ''
                }
                >
                    <p><PeopleAltRoundedIcon className=' mr-2' sx={{fontSize: 18}}></PeopleAltRoundedIcon>Contacts</p>
                </NavLinkStyle>
                <NavLinkStyle to={'/home/setting'}
                className={({isActive, isPending}) => 
                    isPending? 'pending' : isActive ? 'active' : ''
                }
                >
                    <p><SettingsOutlinedIcon className=' mr-2' sx={{fontSize: 18}}></SettingsOutlinedIcon>Setting</p>
                </NavLinkStyle>
            </div>
            <div onClick={() => {
                setOnOption(OnOption => !OnOption)
            }} className=' relative flex items-center hover:bg-white hover:text-black transition-all p-2 rounded-xl cursor-pointer'>
                <div className=' flex flex-col mr-2'>
                    <h3>{user?.displayName}</h3>
                    <p className=' text-xs'>{user?.email}</p>
                </div>
                <div>
                    <img className=' h-8 w-8 rounded-full' src={user?.photoURL}></img>
                </div>
                {
                    onOption ?
                    <div className=' absolute -bottom-14 w-full left-0 rounded-xl p-2 text-sm' 
                    style={{
                        backgroundColor: '#29313c',
                    }}>
                        <div>
                            <button
                            onClick={ () => {
                                signOut(auth)
                                .then(data => {
                                    console.log(data)
                                    dispatch(signOutUser())
                                })
                                .catch(error => {
                                    console.error(error)
                                })
                            }}
                            className=' pl-2'>Log out</button>
                        </div>
                    </div>

                    :''
                }
            </div>
        </div>
    );
};

export default Header;