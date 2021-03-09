import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
      <div className="center-div">
        <div className="logo"></div>
        <form>
          <input type="text" placeholder="EMAIL"/>
          <input type="password" placeholder="EMAIL"/>
        </form>
        <Link to="/home">ENTER</Link>
      </div>
    </div>
  )
}

export default Login
