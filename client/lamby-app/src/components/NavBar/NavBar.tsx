import './NavBar.scss';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
return (
  <nav className='navbar'>
  <ul>
    <li>
      <NavLink to='/home' activeClassName='active'>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to='/match' activeClassName='active'>
        Match
      </NavLink>
    </li>
    <li>
      <NavLink to='/profile' activeClassName='active'>
        Profile
      </NavLink>
    </li>
  </ul>
</nav>
)
}

export default NavBar; 