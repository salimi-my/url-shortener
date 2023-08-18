import type { Metadata } from 'next';
import { ClerkLoaded, ClerkLoading, UserProfile } from '@clerk/nextjs';

import ProfileLoading from '@/components/profile-loading';

export const metadata: Metadata = {
  title: 'My Profile — URL Shortener'
};

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
