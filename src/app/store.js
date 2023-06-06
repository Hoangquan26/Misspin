import { configureStore } from "@reduxjs/toolkit";
import createChatSlice from "./createChatSlice";
import messageSlice from "./messageSlice";
import userSlice from "./userSlice";
export const store = configureStore({
    reducer: {
        user: userSlice,
        messages: messageSlice,
        createChat: createChatSlice
    }
})