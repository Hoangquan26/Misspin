import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { userSelector } from '../../../app/userSlice';
const NavLinkStyled = styled(NavLink)`
    &{
        display: flex;
        padding: 1rem;
        align-items: center;
        border-radius: 0.75rem;
        gap: .5rem;
    }

    &.active {
        background-color: #20282e
    }
`

const Contact = () => {
    const user = useSelector(userSelector)
    return (
        <div className=' grid grid-cols-5 p-8 text-white gap-8'>
            <div className=' flex flex-col gap-2'>
                <NavLinkStyled
                to={`listfriends/${user?.uid}`}
                className={(isActive, isPending) => 
                    isActive? 'active' : isPending ? 'pending' : ''
                }
                >
                    <PeopleAltRoundedIcon></PeopleAltRoundedIcon>
                    <p>List friends</p>
                </NavLinkStyled>
                <NavLinkStyled
                to={`friendrequests/${user?.uid}`}
                className={(isActive, isPending) => 
                    isActive? 'active' : isPending ? 'pending' : ''
                }
                >
                    <SendRoundedIcon></SendRoundedIcon>
                    <p>Friend Requests</p>
                </NavLinkStyled>
                <NavLinkStyled
                to={`findfriend/${user?.uid}`}
                className={(isActive, isPending) => 
                    isActive? 'active' : isPending ? 'pending' : ''
                }
                >
                    <PersonAddRoundedIcon></PersonAddRoundedIcon>
                    <p>Find Friend</p>
                </NavLinkStyled>
            </div>
            <div className=' col-span-4'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Contact;