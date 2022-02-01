import React, { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { Link } from 'react-router-dom';
import { db } from '../Auth/Firebase';

const style = {
    textDecoration: 'none',
    color: 'white',
    cursor: 'pointer',
    fontWeight:600
}

const CurrentName = () => {

    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    const [logedinUserName, setLogedinUserName] = useState([]);

    useEffect(() => {
        if (currentUser) {
            const qry = query(collection(db, "users"));
            const q = query(qry, where("userUid", "==", currentUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setLogedinUserName((doc.data().name))
                });

            });
        }
    }, [])

    return (
        <div>
            <Link to='/profile' style={style} >{logedinUserName}</Link>

        </div>
    )
}

export default CurrentName
