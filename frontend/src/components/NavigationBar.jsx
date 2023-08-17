import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NavigationBar ({ location }) {
  const [pathname, setPathName] = useState();
  // setPathName(location);

  const navChecker = ( page) => {
    return { pointerEvents: pathname === page ? 'none' : 'auto' }
  }

  useEffect(() => {
    setPathName(location);
    // eslint-disable-next-line
  }, []);

  return (
    <nav>
      <Link to='/dashboard' style={navChecker('/dashboard')}>Dashboard</Link>
      <br />
      <br />
      <Link to='/disciplines' style={navChecker('/disciplines')}>Disciplinas</Link>
    </nav>
  )
};
