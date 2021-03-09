import React, {useEffect, useState} from 'react'
import { IPlayer } from '../../interfaces/interfaces'
import {api} from '../../services/apiClient'

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

  console.log(profile)
  return (
    <div>
      <h1>{profile.lastName}</h1>
      <h1>{profile.playerNumber}</h1>
      <div>
        <div>
          <p>POSITION</p>
          <p>{profile.defaultPosition}</p>
        </div>
        <div>
          <p>MATCHES</p>
          <p>{profile.matches}</p>
        </div>
        <div>
          <p>GOALS</p>
          <p>{profile.goals}</p>
        </div>
        <div>
          <p>ASSISTS</p>
          <p>{profile.assists}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
