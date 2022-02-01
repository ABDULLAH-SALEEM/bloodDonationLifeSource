import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core';
import { collection, query, where, onSnapshot} from 'firebase/firestore'
import { db } from '../Auth/Firebase';
import './AvatarName.css'

const CurrentAvatar = () => {

    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    const [logedinUserAvatarUrl, setLogedinUserAvatarUrl] = useState();

    useEffect(() => {
        if (currentUser) {
            const qry = query(collection(db, "users"));
            const q = query(qry, where("userUid", "==", currentUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setLogedinUserAvatarUrl((doc.data().AvatarUrl))
                });

            });
        }
    }, [])

    return (
        <div>
            <Avatar className='currentAvatarDp' src={logedinUserAvatarUrl} />
        </div>
    )
}

export default CurrentAvatar
