import React, { Fragment, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAlert } from "react-alert";
import { logoutUser } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  const dashboard = () => {
    navigate("/admin/dashboard");
  };

  const orders = () => {
    navigate("/orders");
  };

  const account = () => {
    navigate("/account");
  };

  const cart = () => {
    navigate("/cart");
  };

  const logout = () => {
    dispatch(logoutUser());
    alert.success("Logged out successfully");
  };

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: <ShoppingCartIcon style={{color: cartItems.length > 0 ? 'tomato' : 'unset'}}/>,
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logout },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        style={{ zIndex: "11" }}
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "./Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((option) => (
          <SpeedDialAction
            key={option.name}
            icon={option.icon}
            tooltipTitle={option.name}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
            onClick={option.func}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
