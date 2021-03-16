import React, {useEffect, useState} from 'react'
import { IPlayer } from '../../interfaces/IPlayer'
import {api} from '../../services/apiClient'
import './Profile.scss'

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<IPlayer>({
    id: 0,
    firstName: "",
    lastName: "",
    playerNumber: 0,
    goals: 0,
    assists: 0,
    matches: 0,
    defaultPosition: ''
  });
  useEffect(() => {
    async function getProfile(): Promise<void> {
      const currentUser = await api.getCurrentUser();
      setProfile(currentUser);
    }

    getProfile();
  }, []);

  return (
    <div>
      <header className='header'>
        <h1>PROFILE</h1>
      </header>
      <div className='center-div home px-4'>
        <h1>{profile.lastName}</h1>
        <h1>{profile.playerNumber}</h1>
        <div>
          <div className='profile__flex-row'>
            <div className='p-1'>
              <p>POSITION</p>
              <p>{profile.defaultPosition}</p>
            </div>
            <div className='p-1'>
              <p>MATCHES</p>
              <p>{profile.matches}</p>
            </div>
          </div>
          <div className='profile__flex-row'>
            <div className='p-1'>
              <p>GOALS</p>
              <p>{profile.goals}</p>
            </div>
            <div className='p-1'>
              <p>ASSISTS</p>
              <p>{profile.assists}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile
