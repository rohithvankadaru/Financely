import { useContext, useEffect } from 'react';
import { auth } from '../../firebase';
import './header.css'
import authenticationContext from '../../context/authenticationContext';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import defaultImg from '../../../public/user.svg'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, loading } = useContext(authenticationContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user])

  async function logoutFnc() {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
      navigate('/login');
    }
    catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className='navbar'>
      <p className='logo'>Financely</p>
      {user && <div className='profile'>
        <img src={user.photoURL || defaultImg} className= {user.photoURL ?  'logo link' : 'user-logo logo link' }  />
        <p className='logo link' onClick={logoutFnc}>Logout</p>
      </div>}
      {loading && <p className='logo link'>Loading...</p>}
    </div>
  )
}

export default Header;