import { toast } from "react-toastify";
import authenticationContext from "./authenticationContext"
import { getDoc } from "firebase/firestore";
import { auth, db, doc, provider, setDoc } from '../firebase'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthenticationProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function createDoc(user, name) {
    // Doc does not match any uid
    //Create a doc
    setIsLoading(true);
    if (!user) return;
    const userData = await getDoc(doc(db, 'users', user.uid))

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : '',
          createdAt: new Date()
        });
        setIsLoading(false);
        toast.success('Doc created!!')
      }
      catch (e) {
        setIsLoading(false);
        toast.error(e.message);
      }
    }
    else {
      setIsLoading(false);
    }
  }

  async function googleAuth(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
      createDoc(user);

      setIsLoading(false);
      toast.success('User Authenticated!!');

      navigate('/dashboard');
    }
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setIsLoading(false);
      toast.error(errorMessage)
    }
  }

  return (
    <authenticationContext.Provider value={{ googleAuth, createDoc, user, loading }}>
      {children}
    </authenticationContext.Provider>
  )
}

export default AuthenticationProvider