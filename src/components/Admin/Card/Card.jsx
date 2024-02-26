import React from 'react';
import { Card as CustomCard, Col, Row, Button } from 'antd';
import './Card.scss';

export const CustomCardComponent = ({ user, action, electionCards }) => {
    const handleClick = () => {
        electionCards(user);
      };
      return (
        <>
          <CustomCard title={user.first_name + ' ' + user.last_name} className='card-default'>
            <h3>{user.dependency}</h3>
            <p>{user.workstation}</p>
            <Button type="primary" onClick={handleClick}>{action}</Button>
          </CustomCard>
        </>
      );
}