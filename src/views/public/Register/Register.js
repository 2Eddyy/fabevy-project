import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";


function Register() {
  const { register, formState: { errors }, handleSubmit } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = (event) => {
    setShowPassword(event.target.checked);
  };

  // register function

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
                <h2>Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label> UserName<span>*</span></label>
                    <input type='text' placeholder='Enter you name'
                      name='username'
                      {...register("username", {
                        required: "Username is required"
                      })}
                    />
                    {errors.username && (<p className='text-danger'>{errors.username.message}</p>)}
                  </div>
                  <div>
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
                  <div>
                    <label>Password <span>*</span></label>
                    <input type={showPassword?'text':'password'}
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
                    <input type='submit' value="Sign Up" />
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

export default Register