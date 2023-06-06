import { auth } from "./config";
import { get, set, ref, child, push, getDatabase, onValue, limitToFirst , orderByChild, query, update} from 'firebase/database'
import { useEffect, useState } from "react";

const db = getDatabase()
const chatsRef = ref(db, '/group')

const useChat = (queryString) => {
    const [ data, setData ] = useState([])
    const uid = auth.currentUser?.uid
    const ref = query(chatsRef, limitToFirst(6))
    useEffect(() => {
        const unsubcribed = onValue(ref, (snapshot) => {
            if(snapshot.exists()) {
                const val = Object.values(snapshot.val())
                const filterData = val.filter(item => Object.keys(item.member).includes(auth.currentUser?.uid))
                setData(filterData)
            }
        })
        return unsubcribed
    }, [])
    return data
}

export default useChat


export async function sendMessage(content, user, chatid, type) {
    try {
        const updateGroup = {} 
        const res = await push(ref(db, `/message/${chatid}`), {
            type: type,
            content: content,
            sendBy: {
                ...user
            },
            timestamp : new Date().getTime()
        })
        updateGroup[`/group/${chatid}/lastMessage`] = `${user.name}: ${content}`
        update(ref(db), updateGroup)
        return res
    }
    catch(error){
        console.log(error)
        return false
    }
}