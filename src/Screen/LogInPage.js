import { useState } from 'react';
import logo from '../Images/logoTaskTracking.png';
function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState('typing');
    const [error, setError] = useState(null);
    function handleEmailInput(e) {
        setEmail(e.target.value);
    }
    function handlePasswordInput(e) {
        setPassword(e.target.value);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('submitting');
        try {
            // get data bla bla
            await setStatus('success');
            await setEmail("");
            await setPassword("");
        } catch (err) {
            setStatus('typing');
            setError(err);
        }
    }
    if (status === "success") {
        setStatus("typing")
        alert("login Succes");

    }
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
                <button onClick={handleSubmit}>
                    Log In
                </button>
                {error !== null &&
                    <p className="Error">
                        {error.message}
                    </p>
                }
                <button >
                    Forgot password
                </button>
                <div>
                    <p>Do not have account?</p>
                    <button>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}
export default LoginPage;