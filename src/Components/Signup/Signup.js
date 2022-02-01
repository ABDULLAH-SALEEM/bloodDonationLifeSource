import { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import './Signup.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { auth } from '../Auth/Firebase';
import axios from 'axios';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../Auth/Firebase';
import logo from '../../Assets/Images/lgo.png';


const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");
    const [errorMs, setError] = useState('Firebase: Error (auth/')
    let newmsg = errorMs.replace('Firebase: Error (auth/', '')
    let msg = newmsg.replace('Firebase:', '')
    let err = msg.replace('(auth/weak-password', '')
    let formatedMsg = err.replace(')', '')
    const navigate = useNavigate();

    const onFullNameChangeHandler = (e) => {
        setName(e.target.value);
    }

    const onEmailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const onCnfPasswordChangeHandler = (e) => {
        setCnfPassword(e.target.value);
    }

    const onSignupFormSubmitHandler = (e) => {
        e.preventDefault();

        // axios.post("http://localhost:5000/users",
        //     {
        //         name, email, password, cnfPassword
        //     })
        //     .then(res => {
        //         if (res.status === 400) {
        //             setError('Email already exist');
        //         } else if (res.status == 500) {
        //             setError('Please Fill All Fields')
        //         } else if (res.status == 600) {
        //             setError("Password and Confirm Password does not match")
        //         } else if (res.status == 700) {
        //             setError("password must contain atleast 6 characters")
        //         } else if (res.status === 200) {
        if (password === cnfPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    let user = userCredential.user;
                    localStorage.setItem('currentUser', JSON.stringify(user))
                    navigate('/')
                    setDoc(doc(db, 'users', user.uid), {
                        name: name,
                        email: email,
                        password: password,
                        userUid: user.uid,
                        AvatarUrl:null
                    })
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    setError(errorMessage)
                })
        } else {
            setError("Password doesn't match")
        }

        //     }

        // })
    }
    //     const res = await fetch("http://localhost:5000/users", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             name, email, password, cnfPassword
    //         })
    //     });
    //     if (res.status === 400) {
    //         console.log('invalidRegisteration');
    //     }
    //     else if (res.status === 200) {
    //         createUserWithEmailAndPassword(auth, email, password)
    //             .then((userCredential) => {
    //                 let user = userCredential.user;
    //                 localStorage.setItem('currentUser', JSON.stringify(user));

    //                 // Signed in
    //             })
    //             .catch((error) => {
    //                 const errorCode = error.code
    //                 const errorMessage = error.message
    //                 console.log(errorMessage)
    //             })
    //         navigate('/')
    //     }
    // }
    return (
        <div className='signupWraper' >
            <p className='name'>Life Source</p>
            <p className='tagline'>Give and let Live.</p>
            <img className='logoSignup' src={logo} />
            <div className='signupFormDiv'>
                <form onSubmit={onSignupFormSubmitHandler} className='signupForm' >
                    <TextField required value={name} onChange={onFullNameChangeHandler} className="fullName" id="standard-basic" label="Enter Full Name" variant="standard" />
                    <TextField required value={email} onChange={onEmailChangeHandler} className="email" type='email' id="standard-basic" label="Enter Email" variant="standard" />
                    <TextField required value={password} onChange={onPasswordChangeHandler} className="password" type='password' id="standard-basic" label="Enter Password" variant="standard" />
                    <TextField required value={cnfPassword} onChange={onCnfPasswordChangeHandler} className="cnfPassword" type='password' id="standard-basic" label="Confirm Password" variant="standard" />
                    <button className="Button-Signup">Signup</button>
                    <Link to="/login" className="backToSignIn">Already Registered? Login Now.</Link>
                    <p className='err'>{formatedMsg}</p>
                </form>

            </div>
        </div>
    )
}

export default Signup
