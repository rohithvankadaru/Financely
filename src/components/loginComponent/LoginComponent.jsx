import React, { useContext, useState } from 'react'
import Input from '../input/Input'
import Button from '../button/Button'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import authenticationContext from '../../context/authenticationContext';

const LoginComponent = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { googleAuth } = useContext(authenticationContext);
    const navigate = useNavigate();


    async function loginUsingEmail(e) {
        e.preventDefault();
        setLoading(true);
        if (email !== '' && password !== '') {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password)

                toast.success(`user logged in!!`)
                setLoading(false);
                
                setEmail('');
                setPassword('');

                navigate('/dashboard');
            }
            catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage)
                setLoading(false);
            }
        }
        else {
            toast.error('Kindly enter username and password')
            setLoading(false);
        }
    }

    return (
        <div className='signup-wrapper'>
            <h2 className='title'>
                Login to <span style={{ color: 'var(--theme)' }}>Financely</span>
            </h2>
            <form>
                <Input
                    type='email'
                    label='Email Address'
                    placeholder='johndoe@gmail.com'
                    state={email}
                    setState={setEmail}
                />
                <Input
                    type='password'
                    label='password'
                    placeholder='Example@123'
                    state={password}
                    setState={setPassword}
                />
                <Button
                    disabled={loading}
                    text={loading ? 'Loading...' : "Login using Email and Password"}
                    onClick={loginUsingEmail}
                />
                <p className='p-login'>or</p>
                <Button
                    disabled={loading}
                    text={loading ? 'Loading...' : "Login using Google"}
                    onClick={googleAuth}
                    blue={true}
                />
                <p className='p-login' style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>or Don't have an account? Signup here</p>
            </form>
        </div>
    )
}

export default LoginComponent