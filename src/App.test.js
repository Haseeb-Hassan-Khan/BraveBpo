import React from 'react';

const test = ({ users }) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.login.uuid}>
          {user.name.first} {user.name.last} - {user.gender}
        </li>
      ))}
    </ul>
  );
};

export default test;
