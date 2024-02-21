import React from 'react';
import { Outlet } from 'react-router-dom';
import './ClientLayout.scss';

export function ClientLayout(props) {
  const { children } = props;

  return (
    <>
      <p>ClientLayout</p>
      {children}
    </>
  );
}



/* import React from 'react';
import './ClientLayout.scss';

export function ClientLayout(props) {
    const {children} = props;
  return (
    <>
      <p>ClientLayout</p>
      {children}
    </>
  )
}
 */