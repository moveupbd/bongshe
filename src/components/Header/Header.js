import React from 'react';
import { Button } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '../../images/logo.png'
import './Header.css'

const Header = () => {
    const { user, logout } = useAuth() || {};
    return (
        <div className='header'>
            <Link to='/'>
                <img className='logo' src={logo} alt="" />
            </Link>
            <nav>
                <NavLink to="/products">Products</NavLink>
                <NavLink to="/review">Order Review</NavLink>
                <NavLink to="/inventory">Manage Inventory</NavLink>

                {
                    user?.email ?
                        <Button
                            style={{ color: "white" }}
                            onClick={logout}
                            color="inherit" >
                            Logout
                        </Button>
                        :
                        <NavLink to="/login">Login</NavLink>

                }

            </nav>
        </div>
    );
};

export default Header;