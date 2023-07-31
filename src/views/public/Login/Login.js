import React, { useContext, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { StateContext } from '../../../Context/Context';

function Login() {

  const { register, formState: { errors }, handleSubmit } = useForm();
  const { dispatch } = useContext(StateContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = (event) => {
    setShowPassword(event.target.checked);
  };

  // login function

  const onSubmit = (data) => {
    localStorage.setItem("userLogin", true);
    dispatch(
      {
        type: "login",
        payload: true
      }
    );
  }

  return (
    <div>
      <div className='login-page'>
        <div className='wrapper login'>
          <div className='login-container'>
            <div className='col-left'>
              <div className='login-text'>
                <h2>Welcome Fabevy !</h2>
                <p>Create your account.</p>
                <Link to="/register" className='signup-btn'>Sign Up</Link>
              </div>
            </div>
            <div className='col-right'>
              <div className='login-form'>
                {/* <img src='../public/fabevy.jepg' alt='fabevy'/> */}
                <h2>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} >
                  <div>
                    <label>Email Id <span>*</span></label>
                    <input type='text' placeholder='Enter your email'
                      name='email'
                      {...register("email", {
                        required: "Email Address is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />
                    {errors.email && (<p className='text-danger'>{errors.email.message}</p>)}
                  </div>
                  <div>
                    <label>Password <span>*</span></label>
                    <input type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required"
                      })}
                    />
                    {errors.password && (<p className='text-danger'>{errors.password.message}</p>)}
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={showPassword}
                      onChange={handleCheckboxChange} />
                    <label className="form-check-label" >
                      Show password
                    </label>
                  </div>
                  <div>
                    <input type='submit' value="Sign In" />
                  </div>
                  <div className='forgot'>
                    <Link to="/forgotpassword">Forgot Password?</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login