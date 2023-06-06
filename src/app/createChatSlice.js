import { createSlice } from "@reduxjs/toolkit";

const createChatSlice = createSlice({
    name: 'createChat',
    initialState: false,
    reducers: {
        showOnCreateChat: () => {
            return true
        },
        hideOnCreateChat: () => {
            return false;
        }
    }
})

export const createChatSeletor = (state) => state.createChat
export const { showOnCreateChat, hideOnCreateChat } = createChatSlice.actions;
export default createChatSlice.reducer