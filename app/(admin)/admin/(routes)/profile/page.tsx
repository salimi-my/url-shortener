import ProfileLoading from '@/components/profile-loading';
import { ClerkLoaded, ClerkLoading, UserProfile } from '@clerk/nextjs';

const ProfilePage = () => {
  return (
    <div className='my-profile min-h-[1125px]'>
      <ClerkLoading>
        <ProfileLoading />
      </ClerkLoading>
      <ClerkLoaded>
        <UserProfile />
      </ClerkLoaded>
    </div>
  );
};

export default ProfilePage;
