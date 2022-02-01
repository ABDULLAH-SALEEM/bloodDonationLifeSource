import React, { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot} from 'firebase/firestore'
import { db } from '../Auth/Firebase';

const CurrentEmail = () => {
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    const [logedinUserEmail, setLogedinUserEmail] = useState([]);

    useEffect(() => {
        if (currentUser) {
            const qry = query(collection(db, "users"));
            const q = query(qry, where("userUid", "==", currentUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setLogedinUserEmail((doc.data().email))
                });

            });
        }
    }, [])

    return (
        <div>
            {logedinUserEmail}
        </div>
    )
}

export default CurrentEmail;
