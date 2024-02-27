import React from 'react';
import { Card as CustomCard, Button } from 'antd';
import './Card.scss';

export const CustomCardComponent = ({ user, action, electionCards, etapa }) => {
    const handleClick = () => {
        electionCards(user);
      };
      return (
        <>
          <CustomCard title={etapa === 1 ? user.first_name + ' ' + user.last_name : user.full_name} className='card-default'>
          {etapa === 2 ? <img src={user.image} alt="Imagen" /> : null}
            <h3>{user.dependency}</h3>
            <p>{user.workstation}</p>
            <Button type="primary" onClick={handleClick}>{action}</Button>
          </CustomCard>
        </>
      );
}