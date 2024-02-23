import React from 'react';
import {Menu, Icon} from 'semantic-ui-react';
import {Link, useLocation} from 'react-router-dom';   
import { useAuth } from '../../../hooks';
import './SideMenu.scss';

export const SideMenu = (props) => {
    const { isOpen, children } = props;
    const { pathname } = useLocation();
     
    return (   
        <div className={`side-menu-admin ${isOpen ? '' : 'menu-closed'}`}>
            <MenuLeft pathname={pathname} />
            <div className='content'>{children}</div>
        </div>
    );
}

function MenuLeft(props) {
    const {pathname} = props;
    //par obtener los datos del usuario que esta logeado actualmente en el sistema y saber a que permitirle dar acceso de nuestro menu
    const {auth} = useAuth();
    //console.log(auth);

    return (
        <Menu fixed='left' borderless className='side' vertical> 
            <Menu.Item as={Link} to='/admin'  active={pathname === '/admin'} className='side-menu-item'>
                <Icon name='home' /><span>Home</span>
            </Menu.Item>  

            {auth.me?.is_staff && (
                <Menu.Item as={Link} to='/admin/payments-history'  active={pathname === '/admin/payments-history'} className='side-menu-item'>
                    <Icon name='history' /><span>Historial de Votos</span>
                </Menu.Item>  
            )} 
            
            {/*bloqueamos el acceso de los usuarios que no son administradores*/}
            {auth.me?.is_staff && (
                 <Menu.Item as={Link} to='/admin/users'  active={pathname === '/admin/users'} className='side-menu-item'>
                    <Icon name='users' /><span>Usuarios</span>
                </Menu.Item>
            )}     

            {auth.me?.is_staff && (
                 <Menu.Item as={Link} to='/admin/RankingVotes'  active={pathname === '/admin/RankingVotes'} className='side-menu-item'>                    
                    <Icon name='line graph' /><span>Rankin votos</span>
                </Menu.Item>
            )}        
        </Menu>
    )
}