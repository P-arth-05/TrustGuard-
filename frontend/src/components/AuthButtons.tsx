// src/components/AuthButtons.tsx

import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';

const AuthButtons = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex gap-2">
      <Button onClick={handleLogin}>Login with Google</Button>
      <Button variant="outline" onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default AuthButtons;