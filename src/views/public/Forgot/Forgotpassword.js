import React from 'react';
import './Forgotpassword.css';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

function Forgotpassword() {

  const { register, formState: { errors }, handleSubmit } = useForm();

  // forgot password function

  const onSubmit = (data) => {
    console.log(data);
  }
  return (
    <div>
      <div className='login-page'>
        <div className='wrapper login'>
          <div className='login-container'>
            <div className='col-left'>
              <div className='login-text'>
                <h2>Welcome Fabevy !</h2>
                <p>You have an account.</p>
                <Link to="/login" className='signup-btn'>Sign In</Link>
              </div>
            </div>
            <div className='col-right'>
              <div className='login-form'>
                <div className='forgot-pass'>
                  <h2>Reset</h2>
                  <h2>Password</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='forgot-email'>
                    <label>Email <span>*</span></label>
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
                  <div className='forgot-btn'>
                    <input type='submit' value="Reset password" />
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

export default Forgotpassword