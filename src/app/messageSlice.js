import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase/config";
const initialState = {
    status: 'idle',
    messages: [
        {
            id: 1,
            uid: 'Mkop8ROkLQV9q5kvteGCE8hSXCH2',
            message: 'Hello?',
            time: 'December 17, 1995 03:24:00',
            pin: false,
            read: false
        },
        {
            id: 2,
            uid: 'Mkop8ROkLQV9q5kvteGCE8hSXCH2',
            message: 'Hi?',
            time: 'December 17, 1995 03:24:00',
            pin: false,
            read: false
        },
        {
            id: 3,
            uid: 'Mkop8ROkLQV9q5kvteGCE8hSXCH2',
            message: 'Nice?',
            time: 'December 17, 1995 03:24:00',
            pin: false,
            read: false
        },
        {
            id: 4,
            uid: 'Mkop8ROkLQV9q5kvteGCE8hSXCH2',
            message: 'Sa tị?',
            time: 'December 17, 1995 03:24:00',
            pin: false,
            read: false
        },
        {
            id:5,
            uid: 'Mkop8ROkLQV9q5kvteGCE8hSXCH2',
            message: 'Khả Minh?',
            time: 'December 17, 1995 03:24:00',
            pin: false,
            read: false
        },
    ]
}
const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    }
})

export const getAllChat = createAsyncThunk('message/getAllChat', (uid) => {
    const db = getDatabase()
    const chatsRef = ref(db, '/chats')

})
export const messagesSelector = (state) => state.messages.messages
export default messageSlice.reducer