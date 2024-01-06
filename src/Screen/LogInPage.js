import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/logoTaskTracking.png';
function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    function handleEmailInput(e) {
        setEmail(e.target.value);
    }
    function handlePasswordInput(e) {
        setPassword(e.target.value);
    }
    async function check(a, b) {
        return true;
    }
    async function handleSubmit(e) {
        if (password === "" && email === "") {
            setError(true);
            setErrMsg("Please enter email address and password")
        }
        else if (email === "") {
            setError(true);
            setErrMsg("Please enter email address ")
        }
        else if (password === "") {
            setError(true);
            setErrMsg("Please enter password ")
        }
        else {
            const a = await check(email, password)
            if (a === true) {
                const userId = "userID";
                navigate(`/homepage`, { state: { userId } });
            }
            else {
                setError(true);
                setErrMsg("Your information is wrong \nTry again")
            }
        }
    }
    async function handleForgot() {

    }
    const navigate = useNavigate();
    return (
        <div className="LoginPage">
            <div className="loginPageImage">
                <img src={logo} alt='logo' />
            </div>
            <div className='loginContainer'>
                <p style={{ fontSize: "xx-large" }}>WELCOME</p>
                <p style={{ fontSize: "x-large" }}>Log in to your account</p>
                <input type="text" placeholder='Email addres' value={email} onInput={handleEmailInput} />
                <input type="text" placeholder='Password' value={password} onInput={handlePasswordInput} />
                <button onClick={handleSubmit} style={{
                    cursor: 'pointer', width: '50%', borderWidth: 0, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: '#023047', color: 'white', fontWeight: 'bold'
                }}>
                    Log In
                </button >
                {error && (
                    <div>
                        <p style={{ color: 'red' }}>{errMsg}</p>
                    </div>
                )
                }
                <button onClick={handleForgot} style={{ backgroundColor: 'transparent', borderWidth: 0, textDecoration: 'underline', cursor: 'pointer' }} >
                    Forgot password
                </button>
                <div className='noAccount'>
                    <p>Do not have account?</p>
                    <button style={{ backgroundColor: 'transparent', borderWidth: 0, textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/signup')}>
                        Sign Up
                    </button>
                </div>
            </div>
        </div >
    )
}
export default LoginPage;