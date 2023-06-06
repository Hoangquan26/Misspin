import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { hideOnCreateChat } from '../../../app/createChatSlice';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getListFriends } from '../../../firebase/usercontroller';
import { auth } from '../../../firebase/config';
import ImageIcon from '@mui/icons-material/Image';
import { Button } from '@mui/material';
import { createNewChat } from '../../../firebase/firebaseStorage';
import { userSelector } from '../../../app/userSlice';
const CreateChat = () => {
    const currentUser = useSelector(userSelector)
    const [name, setName] = useState('')
    const [friendList, setFriendList] = useState([])
    const [selectedList, setSelectedList] = useState([])
    const [selectedAvatar, setSelectedAvatar] = useState(null)
    const [avatarURL, setAvatarURL] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        getListFriends(currentUser.uid)
        .then(data => {
            if(data)
            setFriendList(Object.values(data))
        })
        return () => {
            if(avatarURL)
                URL.revokeObjectURL(selectedAvatar) 
        }
    }, [])
    useEffect(() => {
        if(selectedAvatar)
        setAvatarURL(URL.createObjectURL(selectedAvatar))
        return () => URL.revokeObjectURL(selectedAvatar)
    }, [selectedAvatar])

    const handleChangeAvatar = (e) => {
        const file = e.target.files[0]
        setSelectedAvatar(file)
    }
    const handleSubmit = () => {
        createNewChat(selectedList, name, selectedAvatar, currentUser)
        dispatch(hideOnCreateChat())
    }
    return (
        <div className={` flex transition-all justify-center items-center fixed top-0 left-0 h-full w-full`}>
            <div className=' absolute top-0 left-0 w-full h-full bg-black opacity-60'></div>
            <div className=' rounded-md bg-white z-10 p-2 flex flex-col min-w-[400px]'>
                <div className=' flex justify-between text-sm items-center'>
                    <span></span>
                    <CloseIcon
                    onClick={ () => {
                        dispatch(hideOnCreateChat())
                    }}
                    className=' cursor-pointer text-sky-500' sx={{fontSize: 20}}></CloseIcon>
                </div>
                <div className=' flex-col flex p-4'>
                    <div className=' mb-4'>
                        <h3 className=' text-center font-medium'>Fill your chat room's information...</h3>
                    </div>
                    <div className=' mt-2 mb-2 w-full flex flex-col items-center'>
                        <div className=' overflow-hidden  w-[220px] h-[220px] border-[1px] border-sky-600 rounded-full mb-4 flex items-center justify-center'>
                            <img className=' w-full h-full object-cover object-center' src={avatarURL}></img>
                        </div>
                        <Button variant="outlined" component="label" color="primary">
                            {" "}
                            <ImageIcon className=' mr-2'></ImageIcon>
                            Group Avatar
                            <input type="file" onChange={handleChangeAvatar} hidden />
                        </Button>
                    </div>
                    <TextField 
                    helperText={name.length ===0 ? 'Please enter group name' : ''} defaultValue={name} onChange={(e) => setName(e.target.value)} className=' w-full' label="Room name" variant="standard" />
                    <Autocomplete
                        className=' mt-4 max-w-full'
                        multiple
                        id="tags-standard"
                        options={
                            friendList ? friendList : []
                        }
                        onChange= {(e, newValue) => {
                            setSelectedList(newValue)
                        }}
                        
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            helperText={
                                !selectedList.length
                                ?'Please select at least 1 friend':''
                            }
                            variant="standard"
                            label="Member"
                        />
                        )}
                    />
                    <div className=' mt-4 w-full'>
                        <Button 
                        disabled={
                            !selectedList.length || !name.length || !selectedAvatar
                        }
                        onClick={handleSubmit}
                        className=' w-full' variant='contained'>
                            Create
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateChat;