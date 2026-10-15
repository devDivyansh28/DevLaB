import { getCurrentUserData } from '@/modules/auth/actions'
import PlaylistsSection from '@/modules/profile/components/playlist-section';

import ProfileStats from '@/modules/profile/components/profile-stats';
import SolvedProblems from '@/modules/profile/components/solved-problem';
import UserInfoCard from '@/modules/profile/components/user-info-card';
import { auth } from '@clerk/nextjs/server';



import React from 'react'

const ProfilePage = async () => {
    await auth.protect();
    
    const {userData: profileData} = await getCurrentUserData();
    
  return (
    <div className="min-h-screen py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <UserInfoCard userData={profileData} />

        <ProfileStats
          submissions={profileData?.submissions}
          solvedCount={profileData?.solvedProblems.length}
          playlistCount={profileData?.playlists.length}
        />

        <div className="grid gap-8">
          <SolvedProblems solvedProblems={profileData.solvedProblems} />
          <PlaylistsSection playlists={profileData.playlists} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage
