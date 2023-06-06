import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavLinkStyled = styled(NavLink)`
    &{
        display: flex;
        color: white;
        gap: 1rem;
        padding: .5rem;
        border-radius: 1rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
    &:hover{
        background-color: #20282e
    }

    &.active{
        background-color: #20282e
    }
`
const ChatItem =  ({message, name, time, id, photoURL}) => {
    const dateTime = new Date(time)
    let timeText = `${dateTime.getHours()}:${dateTime.getMinutes()}`
    return (
        <NavLinkStyled to={`${id}/`} className={(isActive, isPending) =>      
            isActive ? 'active' : isPending ?' pending' : ''
        }

        >
            <div>
                <img className=' rounded-full w-14 h-14 object-cover object-center ' src={photoURL}></img>
            </div>
            <div className=' flex flex-col justify-between grow'>
                {/* <div className=' flex gap-2 items-center'>
                    {
                        !read ?
                        <div className=' h-2 w-2 rounded-full bg-lime-500'></div>
                        :''
                    }
                </div> */}
                <h4 className=' text-medium font-semibold '>{name}</h4>
                <h5 className=' text-gray-300 text-xs'></h5>
                <p className=' text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis text-xs w-full'>{message}</p>
            </div>
            <div>
                <p className=' text-xs text-gray-300'>{timeText}</p>
            </div>
        </NavLinkStyled>
    );
};

export default ChatItem;