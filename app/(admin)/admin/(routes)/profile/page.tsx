import { UserProfile } from '@clerk/nextjs';

const ProfilePage = () => {
  return (
    <div className='my-profile'>
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
