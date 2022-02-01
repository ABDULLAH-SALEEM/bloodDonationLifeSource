import { TextField, TextareaAutosize } from '@material-ui/core';
import React, {useState} from 'react';
import Footer from '../Home/Footer';
import Navbar from '../Navbar/Navbar';
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../Auth/Firebase';
import './ReportAProb.css'

const ReportAProb = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [des, setDes]=useState('');
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);

    const onNameChangeHandler = (e) => {
        setName(e.target.value);
    }

    const onDesChangeHandler = (e) => {
        setDes(e.target.value);
    }

    const onEmailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const onReportSubmitHandler=(e)=>{
        e.preventDefault();
        setDoc(doc(db, 'reportedProb', currentUser.uid), {
            name: name,
            email: email,
            des:des,
        })
        setName('')
        setDes('')
        setEmail('')
    }
    return (
        <div>
            <div className='nav'>
                <Navbar />
            </div>
            <div className='reportHead'>Report A Problem Or Give Feedback</div>
            <div className='reportFormArea'>
                <form className='reportForm' onSubmit={onReportSubmitHandler}>
                    <TextField value={name} onChange={onNameChangeHandler} className="naamee" required label="Enter Name" variant="standard"/>
                    <TextField value={email} onChange={onEmailChangeHandler} className="reportEmail" required label="Enter Email" variant="standard" />
                    <textarea value={des}
                        onChange={onDesChangeHandler}
                        className="des"
                        placeholder='Report a problem'

                    />
                    <button className="Button-Signup">Submit</button>
                </form>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default ReportAProb;
