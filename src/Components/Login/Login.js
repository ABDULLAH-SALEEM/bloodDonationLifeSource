import { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import './Login.css';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Auth/Firebase';
import { useNavigate } from 'react-router';
import axios from 'axios';
import logo from '../../Assets/Images/lgo.png';

const Login = () => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [errorMs, setError] = useState('Firebase: Error (auth/')
    let newmsg = errorMs.replace('Firebase: Error (auth/', '')
    let formatedMsg = newmsg.replace(')', '')

    const onEmailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const onLoginFormSubmitHandler = async (e) => {
        e.preventDefault();
        // axios.post("http://localhost:5000/login", {
        //     email, password
        // })
        //     .then(res => {
        //         if (res.status == 200) {
                    signInWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            localStorage.setItem('currentUser', JSON.stringify(user))
                            navigate('/')
                        })
                        .catch((error) => {
                            const errorCode = error.code
                            const errorMessage = error.message;
                            setError(errorMessage);
                        })

            //     }
            // })
    }


    return (
        <div className='loginWraper' >
            <p className='name'>Life Source</p>
            <p className='tagline'>Give and let Live.</p>
            <img className='logo' src={logo} />
            <p></p>
            <div className='loginFormDiv'>
                <form onSubmit={onLoginFormSubmitHandler} className='loginForm' >
                    <TextField required className="email" value={email} type='email' id="standard-basic" onChange={onEmailChangeHandler} label="Enter Email" variant="standard" />
                    <TextField required value={password} className="password" type='password' id="standard-basic" onChange={onPasswordChangeHandler} label="Enter Password" variant="standard" />
                    <button className="Button">Login</button>
                    <Link to="/signup" className="jumpToLogin">Not Registered? Signup Now.</Link>
                </form>
                <p className='err'>{formatedMsg}</p>
            </div>
        </div>
    )
}

export default Login
