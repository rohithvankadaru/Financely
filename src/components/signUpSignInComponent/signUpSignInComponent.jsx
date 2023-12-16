import React, { useContext, useState } from 'react'
import './signUpSignInComponent.css'
import Input from '../input/Input.jsx'
import Button from '../button/Button.jsx';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth } from '../../firebase.js';
import authenticationContext from '../../context/authenticationContext.js';
import { useNavigate } from 'react-router-dom';

const SignUpSignInComponent = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);  

  const {createDoc, googleAuth } = useContext(authenticationContext);
  const navigate = useNavigate();

  async function signupWithEmail(e) {
    e.preventDefault();
    setLoading(true);
    if (name !== '' && email !== '' && password !== '' && confirmPassword !== '') {
      if (password === confirmPassword) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          toast.success('User created!!')
          setLoading(false);

          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          createDoc(user, name);

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
        toast.error('Password and confirm password do not match')
        setLoading(false);
      }
    }
    else {
      toast.error('Please fill all the fields')
      setLoading(false);
    }
  }

  return (
    <div className='signup-wrapper'>
      <h2 className='title'>
        Sign Up on <span style={{ color: 'var(--theme)' }}>Financely</span>
      </h2>
      <form>
        <Input
          label='full name'
          placeholder='John Doe'
          state={name}
          setState={setName}
        />
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
        <Input
          type='password'
          label='confirm password'
          placeholder='Example@123'
          state={confirmPassword}
          setState={setConfirmPassword}
        />
        <Button
          disabled={loading}
          text={loading ? 'Loading...' : "Signup using Email and Password"}
          onClick={signupWithEmail}
        />
        <p className='p-login'>or</p>
        <Button
          disabled={loading}
          text={loading ? 'Loading...' : "Continue with Google"}
          onClick={googleAuth}
          blue={true}
        />
        <p className='p-login' style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>Already have an account? click here</p>
      </form>
    </div>
  )
}

export default SignUpSignInComponent;