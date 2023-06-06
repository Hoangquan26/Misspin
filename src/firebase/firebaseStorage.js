import { getDownloadURL, getStorage, ref as stoRef, uploadBytesResumable } from 'firebase/storage'
import { ref as dbRef, child as dbChild, set as dbSet, get, getDatabase, push, update, set, child} from 'firebase/database'
import { auth } from './config'
const db = getDatabase()
const storage = getStorage()
export function createNewChat(member, name, photo, currentUser){
    const groupDbRef = dbRef(db, 'group')
    const groupKey = push(groupDbRef, {}).key
    const messKey = push(dbRef(db, `/message/${groupKey}/}`)).key
    const memberObject = {}
    const updateGroup = {}
    const updateMessage = {}

    updateMessage[`/message/${groupKey}/${messKey}`] = {   
        content: `${currentUser.name} was create ${name} room`,
        timestamp: new Date().getTime(),
        type: 'notify',
        sendBy: {
            ...currentUser
        }
    }
    update(dbRef(db), updateMessage)

    memberObject[currentUser.uid] = {
        ...currentUser
    }
    member.forEach(item => {
        memberObject[item.uid] = {
            ...item
       }
    })
    updateGroup[`group/${groupKey}`] = {
        name: name,
        member: memberObject,
        timestamp: new Date().getTime(),
        lastMessage: `${currentUser.name} was create ${name} room`,
        avatar: '',
        id: groupKey
    }

    const groupStoRef = stoRef(storage, `group/${groupKey}/${photo.name}`)
    const messageStoRef = stoRef(storage, 'message')
    const createGroupSto = uploadBytesResumable(groupStoRef, photo)
    createGroupSto.on('state_changed', 
    (snapshot) => {

    },
    (error) => {

    },
    () => {
        getDownloadURL(createGroupSto.snapshot.ref).then((downloadURL) => {
            updateGroup[`group/${groupKey}`].avatar = downloadURL
            console.log(updateGroup)
            update(dbRef(db), updateGroup)
        })
    }
    )   
}