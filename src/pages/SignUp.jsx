import React from 'react'
import Header from '../components/header/Header';
import SignUpSignInComponent from '../components/signUpSignInComponent/signUpSignInComponent';

const SignUp = () => {
  return (
    <div>
      <Header />
      <div className='wrapper'>
        <SignUpSignInComponent />
      </div>
    </div>
  )
}

export default SignUp;