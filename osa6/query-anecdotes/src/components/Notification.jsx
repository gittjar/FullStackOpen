import React, { useEffect } from 'react';

const Notification = ({ type, message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        onClose(); // sulje ilmoitus 5 sekunnin kuluttua
      }, 5000);

      return () => clearTimeout(timeoutId); // poista timeout
    }
  }, [message, onClose]);

  if (!message) return null;

  const style = {
    // ilmoituksen tyyli
    border: 'solid',
    padding: 10,
    width: 320,
    borderWidth: 1,
    marginBottom: 5,
    color: type === 'success' ? 'green' : 'red',
  };

  return (
    <div style={style}>
      {message}
    </div>
  );
};

export default Notification;
