import React from 'react'
import { IPosition, IPlayerProp } from '../../interfaces/interfaces'

const Player: React.FC<IPlayerProp> = ({ player }) => {

  function sayHello() {
    console.log('Hello')
  }

  const classes = `player-dot ${player.instruction}`
  
  return (
    <button onClick={sayHello} className={classes}>
      <p>{player.userId}</p>
    </button>
  )
}

export default Player
