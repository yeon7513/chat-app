import cn from 'classnames';
import React from 'react';
import styles from '../css/Message.module.css';

function Message({ message, auth }) {
  const { uid, photoURL, text, createdAt } = message;

  const date = createdAt.toDate();
  const time = new Date(date).toLocaleString();

  const msgClass =
    uid === auth?.currentUser.uid ? styles.sent : styles.received;

  return (
    <div className={cn(styles.messageBox, msgClass)}>
      <img className={styles.photo} src={photoURL} alt="" />
      <p className={styles.text}>{text}</p>
      <span className={styles.time}>{time}</span>
    </div>
  );
}

export default Message;
