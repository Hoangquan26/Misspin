import { auth } from "./config";
import { get, set, push, child, ref, getDatabase, remove } from 'firebase/database'
const db = getDatabase()

export async function requestFriendResponse(sender, reUID, accept) {
    console.log(sender, reUID, accept)
    try{
        const friendRequestRef = ref(db, `/friendRequest/${sender.uid}/${reUID.uid}`)
        remove(friendRequestRef)
        if(accept == 'true'){
            let listFriendRef = ref(db, `/listFriend/${sender.uid}`)
            set(listFriendRef, {
                [reUID.uid] : {
                    ...reUID
                }
            })
            listFriendRef = ref(db, `/listFriend/${reUID.uid}`)
            set(listFriendRef, {
                [sender.uid] : {
                    ...sender
                }
            })
        }
        return true
    }
    catch(error) {
        console.error(error)
        return false  
    }
}