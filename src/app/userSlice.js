import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, getUserByUID } from "../firebase/config";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        status: 'idle'
    },
    reducers: {
        getUser: (state) => {
            return state
        },
        setUser : (state, action) => {
            return {
                ...state,
                currentUser: { ...action.payload}
            }
        },
        signOutUser: (state) => {
            return {
                currentUser: null,
                status: 'idle'
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(currentUserThunk.pending, (state) => {
            return {
                ...state,
                status: 'pending'
            }
        })
        builder.addCase(currentUserThunk.fulfilled, (state, action) => {
            console.log(action.payload)
            return {
                currentUser : { ...action.payload},
                status: 'success'
            }
        })
    }
})

export const currentUserThunk = createAsyncThunk('user/currenUserThunk', async(state, action) => {
    const getCurrentUser = () => {
        return new Promise((resolve, reject) => {
            const unsubcribed = auth.onAuthStateChanged(async (user) => {
                unsubcribed()
                if(user){
                    const { uid } = user;
                    
                    const dbuser = await getUserByUID(uid)
                    resolve({ ...dbuser })
                }
                // else {
                //     reject(new Error)
                // }
            })
        })
    }
    const currentUser = await getCurrentUser()
    return currentUser
})

export const { getUser, setUser, signOutUser } = userSlice.actions
export const userSelector = (state) => state.user.currentUser
export const statusSelector = (state) => state.user.status
export default userSlice.reducer