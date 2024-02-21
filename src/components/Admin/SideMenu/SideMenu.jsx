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
                <Icon name='home' /><span>Pedidos</span>
            </Menu.Item>  

            <Menu.Item as={Link} to='/admin/tables'  active={pathname === '/admin/tables'} className='side-menu-item'>
                <Icon name='table' /><span>Mesas</span>
            </Menu.Item>  

            <Menu.Item as={Link} to='/admin/payments-history'  active={pathname === '/admin/payments-history'} className='side-menu-item'>
                <Icon name='history' /><span>Historial de pago</span>
            </Menu.Item>  

            <Menu.Item as={Link} to='/admin/categories'  active={pathname === '/admin/categories'} className='side-menu-item'>
                <Icon name='folder' /><span>Categorias</span>
            </Menu.Item>

            <Menu.Item as={Link} to='/admin/products'  active={pathname === '/admin/products'} className='side-menu-item'>
                <Icon name='cart' /><span>Productos</span>
            </Menu.Item>
            
            {/*bloqueamos el acceso de los usuarios que no son administradores*/}
            {auth.me?.is_staff && (
                 <Menu.Item as={Link} to='/admin/users'  active={pathname === '/admin/users'} className='side-menu-item'>
                    <Icon name='users' /><span>Usuarios</span>
                </Menu.Item>
            )}            
        </Menu>
    )
}





/* import React from 'react';
import {Menu, Icon} from 'semantic-ui-react';
import './SideMenu.scss';

export const SideMenu = (props) => {
    const {children} = props;
     
  return (
    <div className='side-menu-admin'>
        <MenuLeft />    
        <div>{children}</div>
    </div>
  )
}


function MenuLeft(props) {
    const {} = props;

    return (
        <Menu fixed='left' borderless className='side' vertical>
            <Menu.Item>
                <Icon name='home'/>Pedidos
            </Menu.Item>   
        </Menu>
    )
}
 */