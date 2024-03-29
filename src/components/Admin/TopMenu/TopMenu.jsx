import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import './TopMenu.scss';
import {Link, useLocation} from 'react-router-dom';   
import { useAuth } from '../../../hooks';

export const TopMenu = (props) => {
    const { toggleMenu , isOpen} = props;
    const { auth, logouth } = useAuth();
    const { pathname } = useLocation();

    // Renderiza el nombre del usuario en el menú
    const renderName = () => {
        if (auth.me?.first_name && auth.me?.last_name) {
            return `${auth.me.first_name} ${auth.me.last_name}`;
        }
        return auth.me?.email;
    };

    return (
        <Menu fixed='top' className='top-menu-admin'>           
            <Menu.Item className={`top-menu-admin__logo ${isOpen ? '' : 'logo_hide'}`}>
            <Icon name='users' className='left-margin'/>{isOpen ? <p>PANEL</p> : ''}
            </Menu.Item>
            <Menu.Item onClick={toggleMenu}>
                <Icon name={`${isOpen ? 'bars' : 'angle double right'}`} />
            </Menu.Item>

            <Menu.Menu position='right' className='top-menu-admin__user'>
                <Menu.Item> <Icon name='user' className='left-margin' />{renderName()}</Menu.Item>
                <Menu.Item as={Link} to='/admin'  active={pathname === '/admin'} onClick={logouth}>
                    <Icon name='sign-out'/>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

 