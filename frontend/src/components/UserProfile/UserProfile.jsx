import React from 'react';
import UserInfo from './UserInfo';
import useUserInfo from '../../hooks/useUserInfo';
const UserProfile = () => {
  const { userInfo, loading } = useUserInfo();
  
  return (
    <>
      {loading ? (<p className='text-white items-center text-lg place-content-center bg-rose-500 w-full h-12'>Network Error</p>)
        : (
          <div className='container my-5'>
            {/*----Profile Header---- */}
            <UserInfo userInfo={userInfo} />
        
      </div>
        )}
    </>
  )
}

export default UserProfile
