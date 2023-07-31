import React, { useState, useRef, useEffect, useContext } from 'react';
import './Header.css';

import { StateContext } from '../../../Context/Context';

import { Link, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {

    const { dispatch } = useContext(StateContext);
    const [open, setOpen] = useState(false);
    const [sidebarActive, setSidebarActive] = useState(false);
    const anchorRef = useRef(null);

    const location = useLocation();
    const currentPath = location.pathname;

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    // Logout functon 
    const Logout = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
        localStorage.setItem("userLogin", false)
        dispatch(
            {
                type: "logout",
                payload: false
            }
        );
    }

    // LeftMenu function 
    const LeftMenus = () => {
        setSidebarActive(!sidebarActive);
    }
    return (
        <div>
            <div className="header">
                <div className="container-fluied">
                    <div className='row'>
                        <div className="col-6 logo-sec">
                            < div className="logo">
                                <img src="/fabevy-logo-landscape.png" alt="" />
                            </div>
                        </div>

                        <div className="col-6 headerlist">
                            <ul className='header-list'>
                                <li className={currentPath === "/home" || currentPath === "/" ? 'active-item' : 'inactive-item'}>
                                    <Link to="/home"><span><HomeIcon /></span>Dashboard</Link>
                                </li>
                                <li className={currentPath === "/opportunities" ? 'active-item' : 'inactive-item'}>
                                    <Link to="/opportunities"><span><AppsIcon /></span>Opportunities</Link>
                                </li>
                                <li className={currentPath === "/companies" ? 'active-item' : 'inactive-item'}>
                                    <Link to="/companies"><span><ApartmentIcon /></span>Companies</Link>
                                </li>
                                <li className={currentPath === "/recuiter" ? 'active-item' : 'inactive-item'}>
                                    <Link to="/recuiter"><span><CheckBoxIcon /></span>Recuiter</Link>
                                </li>
                                <li className={currentPath === "/candidates" ? 'active-item' : 'inactive-item'}>
                                    <Link to="/candidates"><span><RadioButtonUncheckedIcon /></span>Candidates</Link>
                                </li>
                                <li className='mt-1'>
                                    <Stack direction="row" spacing={2}>
                                        <div className='user-icon'>
                                            <Button
                                                ref={anchorRef}
                                                id="composition-button"
                                                aria-controls={open ? 'composition-menu' : undefined}
                                                aria-expanded={open ? 'true' : undefined}
                                                aria-haspopup="true"
                                                onClick={handleToggle}
                                            >
                                                <AccountCircleIcon />
                                            </Button>
                                            <Popper
                                                open={open}
                                                anchorEl={anchorRef.current}
                                                role={undefined}
                                                placement="bottom-start"
                                                transition
                                                disablePortal
                                            >
                                                {({ TransitionProps, placement }) => (
                                                    <Grow
                                                        {...TransitionProps}
                                                        style={{
                                                            transformOrigin:
                                                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                                        }}
                                                    >
                                                        <Paper>
                                                            <ClickAwayListener onClickAway={handleClose}>
                                                                <MenuList
                                                                    autoFocusItem={open}
                                                                    id="composition-menu"
                                                                    aria-labelledby="composition-button"
                                                                    onKeyDown={handleListKeyDown}
                                                                >
                                                                    <MenuItem onClick={handleClose}><Link to="/profile">Profile</Link></MenuItem>
                                                                    <MenuItem onClick={Logout}>Logout</MenuItem>
                                                                </MenuList>
                                                            </ClickAwayListener>
                                                        </Paper>
                                                    </Grow>
                                                )}
                                            </Popper>
                                        </div>
                                    </Stack>
                                </li>
                                {/* <li><button className='btn btn-secondary'>check</button></li> */}
                            </ul>
                        </div>
                        <div className="menu-btn d-md-none" id="menu-toggle-btn" onClick={() => LeftMenus()}>
                            <div className="btn-line1"></div>
                            <div className="btn-line2"></div>
                            <div className="btn-line3"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='left-menus'>
                <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
                    <ul className='leftmenu-list'>
                        <li onClick={() => LeftMenus()}>
                            <Link to="/home"><HomeIcon className='left-icon' />Dashboard</Link>
                        </li>
                        <li onClick={() => LeftMenus()}>
                            <Link to="/opportunities"><AppsIcon className='left-icon' />Opportunities</Link>
                        </li>
                        <li onClick={() => LeftMenus()}>
                            <Link to="/companies"><ApartmentIcon className='left-icon' />Companies</Link>
                        </li>
                        <li onClick={() => LeftMenus()}>
                            <Link to="/recuiter"><RadioButtonUncheckedIcon className='left-icon' />Recuiter</Link>
                        </li>
                        <li onClick={Logout}>
                            <LogoutIcon className='left-icon' />Logout
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header