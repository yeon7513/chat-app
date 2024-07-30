import { useAuthState } from 'react-firebase-hooks/auth';
import { getUserAuth } from './api/firebase';
import ChatRoom from './components/ChatRoom';
import SignIn from './components/SignIn';
import styles from './css/App.module.css';

function App() {
  const auth = getUserAuth();
  const [user] = useAuthState(auth);

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <h1>소원을 빌어주세요!</h1>
        {user && (
          <button className={styles.signOut} onClick={handleSignOut}>
            로그아웃
          </button>
        )}
      </header>
      <main>{user ? <ChatRoom auth={auth} /> : <SignIn auth={auth} />}</main>
    </div>
  );
}

export default App;
