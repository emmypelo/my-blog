import React from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {
    const store = useSelector((state) => state.users.userAuth);
    const firstName = store.firstName
  return (
    <div>{[firstName]}</div>
  )
}

export default Profile