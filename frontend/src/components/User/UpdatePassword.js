import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import './UpdatePassword.css';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswrodSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password updated successfully");
      navigate("/account");

      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [alert, dispatch, error, isUpdated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswrodSubmit}
              >
                  <div className='loginPassword'>
                    <VpnKeyIcon />
                    <input 
                        type='password'
                        placeholder='Old Password'
                        required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className='loginPassword'>
                    <VpnKeyIcon />
                    <input 
                        type='password'
                        placeholder='New Password'
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className='loginPassword'>
                    <VpnKeyIcon />
                    <input 
                        type='password'
                        placeholder='Confirm Password'
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <input 
                    type='submit'
                    value='Change'
                    className='updatePasswordBtn'
                  />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
