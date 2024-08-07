import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getQuery } from '../api/firebase';
import Message from './Message';

function ChatRoom({ auth }) {
  const [textValue, setTextValue] = useState('');

  const queryOptions = {
    orders: [{ field: 'createdAt', direction: 'asc' }],
    limits: 100,
  };

  const q = getQuery('messages', queryOptions);

  const [message] = useCollectionData(q);

  return (
    <>
      <section>
        {message?.map((msg, idx) => (
          <Message key={idx} message={msg} auth={auth} />
        ))}
      </section>
    </>
  );
}

export default ChatRoom;
