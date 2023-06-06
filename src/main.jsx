import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Login from './Login.jsx'
import Home from './router/Home/Home'
import { Provider, useDispatch } from 'react-redux'
import { store } from './app/store'
import Chat, { loader as chatLoader } from './router/Home/Chat/Chat'
import Setting from './router/Home/Setting/Setting'
import Contact from './router/Home/Contact/Contact'
import MessageArea, { action as messageAction, loader as messageLoader } from './router/Home/Chat/MessageArea'
import ListFriends from './router/Home/Contact/ListFriends'
import FriendRequest, { loader as friendRequestLoader } from './router/Home/Contact/FriendRequest'
import FindFriend, { action as findFriendAction, loader as findFriendLoader } from './router/Home/Contact/FindFriend'
//loader
import { loader as listFriendsLoader } from './router/Home/Contact/ListFriends'
const router = createBrowserRouter([
  {
    path: 'home/',
    element: <Home></Home>,
    children: [
      {
        path: 'message/',
        element: <Chat></Chat>,
        loader: chatLoader,
        children: [
          {
            path: ':messageId/',
            element: <MessageArea></MessageArea>,
            loader: messageLoader,
            action: messageAction
          }
        ]
      },
      {
        path: 'setting/',
        element: <Setting/>
      },
      {
        path: 'contacts/',
        element: <Contact/>,
        children: [
          {
            path: 'listfriends/:uid',
            element: <ListFriends/>,
            loader: listFriendsLoader
          },
          {
            path: 'friendrequests/:uid',
            element: <FriendRequest/>,
            loader: friendRequestLoader,
            action: findFriendAction
          },
          {
            path: 'findfriend/:uid',
            element: <FindFriend/>,
            loader: findFriendLoader,
            action: findFriendAction
          }
        ]
      }
    ]
  },
  {
    path: '/',
    element: <Login></Login>,
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
