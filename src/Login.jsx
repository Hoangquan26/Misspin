import { useEffect, useState } from 'react'
import './App.css'
import { addNewUser, auth, facebookProvider, googleProvider } from './firebase/config'
import { signInWithPopup } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { currentUserThunk, setUser, statusSelector, userSelector } from './app/userSlice'
import { useNavigate } from 'react-router-dom'
import { GoogleButton} from 'react-google-button'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(userSelector)
  const status = useSelector(statusSelector)
  useEffect(() => {
    if(user){
      navigate('/home')
    }
  }, [user])
  useEffect(() => {
    dispatch(currentUserThunk())
    if(user){
      navigate('/home')
    }
  }, [])
  return (
    <>
      <div className=' flex flex-col gap-3'>
        <div class="fb-login-button" data-width="" data-size="" data-button-type="" data-layout="" data-auto-logout-link="false" data-use-continue-as="false"></div>
        <button onClick={async () => {
          const data = await signInWithPopup(auth, facebookProvider);
          dispatch(setUser(data))
        }} className=' border-2 border-gray-500 p-4 rounded-lg'>Login With Facebook</button>
        <GoogleButton onClick={async () => {
          const data = await signInWithPopup(auth, googleProvider);
          console.log(data)
          const name = data.user.displayName
          const email = data.user.email
          const photoURL = data.user.photoURL
          const uid = data.user.uid
          const isNewUser = data._tokenResponse.isNewUser
          if(isNewUser) {
            addNewUser({
              name,
              email,
              photoURL,
              uid
            })
          }
          dispatch(setUser({
            name,
            email,
            photoURL,
            uid
          }))
        }}></GoogleButton>
      </div>
    </>
  )
}

export default Login
