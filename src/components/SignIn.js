import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import * as FcIcons from 'react-icons/fc';
import styles from '../css/SignIn.module.css';

function SignIn({ auth }) {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <div className={styles.container}>
      <button className={styles.signIn}>
        <FcIcons.FcGoogle />
        <span>구글로 로그인하기</span>
      </button>
      <p className={styles.notice}></p>
    </div>
  );
}

export default SignIn;
