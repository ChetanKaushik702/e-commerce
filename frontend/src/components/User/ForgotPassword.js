import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import { clearErrors } from "../../actions/productAction";
import { forgotPassword } from "../../actions/userAction";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MetaData from "../layout/MetaData";
import './ForgotPassword.css';

const ForgotPassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const forgotPasswordSubmit = (e) => {
      e.preventDefault();

      const myForm = new FormData();

      myForm.set('email', email);
      dispatch(forgotPassword(myForm));
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='Forgot Password'/>
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className='forgotPasswordForm'
                onSubmit={forgotPasswordSubmit}
              >
                  <div className='forgotPasswordEmail'>
                    <MailOutlineIcon />
                    <input 
                        type='email'
                        placeholder='Email'
                        required
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <input 
                    type='submit'
                    value='Send'
                    className='forgotPasswordBtn'
                  />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
