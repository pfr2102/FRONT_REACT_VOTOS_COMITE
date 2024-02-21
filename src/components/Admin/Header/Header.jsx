import React from 'react';
import { Button } from 'semantic-ui-react';
import './Header.scss';

export const Header = (props) => {
  const {title, btnTitle, btnClick} = props;

  return (
    <div className='header-page-admin'>
      <h2>{title}</h2>

      <div>
        {btnTitle && (
          <Button positive onClick={btnClick}>
            {btnTitle}
          </Button>
        )}
      </div>
    </div>
  )
}
