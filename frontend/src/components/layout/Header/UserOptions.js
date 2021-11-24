import React, { Fragment, useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useAlert } from 'react-alert';
import { logoutUser } from '../../../actions/userAction';
import { useDispatch } from 'react-redux';

const UserOptions = ({ user }) => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    
    
    const dashboard = () => {
        navigate('/dashboard');
    }
    
    const orders = () => {
        navigate('/orders');
    }
    
    const account = () => {
        navigate('/account');
    }
    
    const logout = () => {
        dispatch(logoutUser());
        alert.success('Logged out successfully');
    }
    
    const options = [
        { icon: <ListAltIcon />, name: 'Orders', func: orders },
        { icon: <PersonIcon />, name: 'Profile', func: account },
        { icon: <ExitToAppIcon />, name: 'Logout', func: logout }
    ];

    if (user.role === 'admin') {
        options.unshift({ icon: <DashboardIcon />, name: 'Dashboard', func: dashboard })
    }

    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }}/>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="down"
                className="speedDial"
                style={{zIndex:"11"}}
                icon={
                    <img 
                        className="speedDialIcon"
                        src={user.avatar.url ? user.avatar.url : './Profile.png'}
                        alt="Profile"
                    />
                }
            >
            {
                options.map(option => (
                   <SpeedDialAction key={option.name} icon={option.icon} tooltipTitle={option.name} onClick={option.func}/> 
                ))
            }
            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions
