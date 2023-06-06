import { auth } from './config'
import { getDatabase, ref, get, set, push, onValue, child } from 'firebase/database'

const db = getDatabase();
const userRef = ref(db, '/user')

export async function getFriendRequest(uid) {
    try{
        const paramsUser = ref(db, `/friendRequest/${uid}`)
        let listRequest = null
        await onValue(paramsUser, (snapshot) => {
            if(snapshot.exists())
            {
                listRequest = snapshot.val()
            }
        })
        return listRequest
    }
    catch(error) {
        console.log(error)
    }
}

export async function getListFriends(uid) {
    const paramsUser = ref(db, `/listFriend/${uid}`)
    let listFriend = null
    await onValue(paramsUser, (snapshot) => {
        if(snapshot.exists())
        {
            listFriend = snapshot.val()
        }
    })
    return listFriend
}

export async function findUser(email, tag, uid) {
    const res = []
    if(!email || email == undefined)
        email = ''
    if(!tag || tag == undefined)
        tag = ''
    let friendList = await getListFriends(uid)
    let friendRequest = await getFriendRequest(uid)
    if(friendRequest != null)
        friendRequest = Object.keys(friendRequest)
    else    
        friendRequest =[]
    if(friendList != null)
        friendList = Object.keys(friendList)
    else
        friendList = []
    await onValue(userRef, (snapshot) => {
        Object.values(snapshot.val()).forEach(item => {
            if(item.email.includes(email) && item.tagNumber.includes(tag) && !friendRequest.includes(item.uid) && !friendList.includes(item.uid) && item.uid != uid)
                {
                    res.push({...item})
                }
        })
    })
    return res
}

export async function addfriend(sender, reUID) {
    try{
        const friendRef = ref(db, `/friendRequest/${reUID}`)
        set(friendRef, 
        {
            [sender.uid] : {
                ...sender
            }
        })
        return true
    }
    catch(error){
        console.error(error)
        return false  
    }
}

