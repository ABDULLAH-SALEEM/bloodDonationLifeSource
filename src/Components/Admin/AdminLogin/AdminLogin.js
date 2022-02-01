import { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Auth/Firebase';
import './AdminLogin.css';
import { useNavigate } from 'react-router';
import logo from '../../../Assets/Images/lgo.png';

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setErrorMessage] = useState('')

    const onEmailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const onFormSubmitHandler = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem('currentUser', JSON.stringify(user))
                navigate('/admin/dashboard');
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message;
                console.log(errorMessage);
            })

    }

    return (
        <div className='loginWraper' >
              <p className='name'>Life Source</p>
            <p className='tagline'>Give and let Live.</p>
            <img className='logo' src={logo} />
            <h3>Admin Login</h3>
            <div className='loginFormDiv'>
                <form onSubmit={onFormSubmitHandler} className='loginForm' >
                    <TextField className="email" type='email' id="standard-basic" value={email} onChange={onEmailChangeHandler} label="Enter Email" variant="standard" />
                    <TextField className="password" type='password' id="standard-basic" value={password} onChange={onPasswordChangeHandler} label="Enter Password" variant="standard" />
                    <Button className="login" type='submit' variant="outlined">Login</Button>
                </form>
            </div>
        </div>

    )
}

export default AdminLogin
