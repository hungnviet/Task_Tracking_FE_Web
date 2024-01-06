import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/logoTaskTracking.png';
function SignUpPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setname] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [accept, setAccet] = useState(false);
    const [error, setError] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    function handleEmailInput(e) {
        setEmail(e.target.value);
    }
    function handlePasswordInput(e) {
        setPassword(e.target.value);
    }
    function handleNameInput(e) {
        setname(e.target.value);
    }
    function handleConfimrPass(e) {
        setConfirmPass(e.target.value);

    }
    function checkMail(mail) {
        const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        // // check mail ton tai chua
        // const listMail=await fetch('/listMail');
        // listMail.find('mail');
        return gmailRegex.test(email);
    }
    function checkConfirmPass(a, b) {
        return a === b;
    }
    async function handleSubmit(e) {
        if (name === "" || email === "" || password === "" || confirmPass === "") {
            setError(true);
            setErrMsg('please enter all the information')
        }
        else {

            if (checkConfirmPass(password, confirmPass) === true && checkMail(email) && accept) {
                setError(false)
                setEmail("");
                setname("");
                setConfirmPass("");
                setPassword("");
                setAccet(false);
                alert('Sign Up Success \nPlease log in again for using');
                navigate('/login');
            }
            else if (!checkMail(email)) {

                setError(true);
                setErrMsg('Your email is wrong or maybe it has exist!');
            }
            else if (!checkConfirmPass(password, confirmPass)) {
                alert('helo')
                setError(true);
                setErrMsg("the password is different from the password")
            }
            else if (!accept) {
                setError(true);
                setErrMsg("You are not agree with the privacy policy and the term")
            }
        }
    }
    return (
        <div className="LoginPage">
            <div className="loginPageImage">
                <img src={logo} alt='logo' />
            </div>
            <div className='loginContainer'>
                <p style={{ fontSize: "xx-large" }}>WELCOME</p>
                <p style={{ fontSize: "x-large" }}>Enter your information to creat account</p>
                <input type="text" placeholder='Name' value={name} onInput={handleNameInput} />
                <input type="text" placeholder='Email addres' value={email} onInput={handleEmailInput} />
                <input type="text" placeholder='Password' value={password} onInput={handlePasswordInput} />
                <input type="text" placeholder='Confirm Password' value={confirmPass} onInput={handleConfimrPass} />

                {error !== null &&
                    <p className="Error">
                        {error.message}
                    </p>
                }

                <div style={{ display: 'flex', flexDirection: 'row', columnGap: 10 }}>
                    <p>Agree to the privacy olicy and the term</p>
                    <input type='checkbox' style={{ height: 20, width: 20 }} checked={accept} onChange={() => setAccet(!accept)} />

                </div>

                <button onClick={handleSubmit} style={{
                    cursor: 'pointer', width: '50%', borderWidth: 0, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: '#023047', color: 'white', fontWeight: 'bold'
                }}>
                    Sign Up
                </button >
                {
                    error && (
                        <div>
                            <p style={{ color: 'red' }}>{errMsg}</p>
                        </div>
                    )
                }
            </div>
        </div >
    )
}
export default SignUpPage;