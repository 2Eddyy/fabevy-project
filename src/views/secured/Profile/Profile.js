import React, { useState } from 'react';
import './Profile.css';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Profile() {

  const [imageUpload, setImageUpload] = useState("/Ninja-H2R.jpg");
  const [showPassword, setshowPassword] = useState(false);
  const [showPassword1, setshowPassword1] = useState(false);
  const [editprofile, setEditProfile] = useState(false);
  const { register, formState: { errors }, handleSubmit } = useForm();

  // image upload function
  const ProfileUpload = (event) => {
    console.log(event.target.files[0]);
    setImageUpload(event.target.files[0].name);
  }

  // profile edit enable function
  const Editprofile = () => {
    const inputElements = document.querySelectorAll('input');
    inputElements.forEach((inputElement) => {
      inputElement.removeAttribute('readOnly');
    });
    setEditProfile(true)
  }

  // Profile edit after save function
  const onSubmit = (data) => {
    console.log(data);
    const inputElements = document.querySelectorAll('input');
    inputElements.forEach((inputElement) => {
      inputElement.setAttribute('readOnly', 'readOnly');
    });
    setEditProfile(false);

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  // old-password show function 

  const ShowPassword = () => {
    setshowPassword(true)
  }

  // old-password hidden function

  const HiddenPassword = () => {
    setshowPassword(false)
  }

  // new password show function
  const ShowPassword1 = () => {
    setshowPassword1(true)
  }

  // new-password hidden function

  const HiddenPassword1 = () => {
    setshowPassword1(false)
  }

  return (
    <div className='main-body'>
      <div className=' d-flex align-items-center justify-content-center'>
        <div className='profile mt-2'>
          <div className='profile-img mt-3'>
            <img className='image' src={imageUpload} alt='profile' id='image' />
            <div className='profile-camera'>
              <div className="profile-file">
                <input type="file" id="fileInput" onChange={ProfileUpload} accept="image/png, image/gif, image/jpeg" />
                <CameraAltIcon htmlFor="file" />
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className='profile-details container text-center mt-4'>
              <div className='row'>
                <div className='col-6'>
                  <label>Full Name</label>
                </div>
                <div className='col-6'>
                  <input type='text' value="Edwin raj" readOnly className='form-control' />
                </div>
                <div className='col-6 mt-3'>
                  <label>Email Id</label>
                </div>
                <div className='col-6 mt-3'>
                  <input type='email' value="edwinantony2504@gmail.com" readOnly className='form-control' />
                </div>
                <div className='col-6 mt-3'>
                  <label>Phone Number</label>
                </div>
                <div className='col-6 mt-3'>
                  <input type='tell' value="+919876543210" readOnly className='form-control' />
                </div>
                <div className='col-12 mt-2'>
                  <h4 className='change-pass'>Change Password</h4>
                </div>
                <div className='col-6 mt-3'>
                  <label>Old Password</label>
                </div>
                <div className='col-6 mt-3'>
                  <input type={showPassword ? "text" : "password"} value="Welcome123" readOnly className='form-control' />
                  {showPassword ? (<VisibilityOffIcon className='show-password1' onClick={HiddenPassword} />) : <VisibilityIcon className='show-password1' onClick={ShowPassword} />}
                </div>
                <div className='col-6 mt-3'>
                  <label>New Password</label>
                </div>
                <div className='col-6 mt-3'>
                  <input type={showPassword1 ? "text" : "password"}  value="Welcome123" readOnly className='form-control' />
                  {showPassword1 ? (<VisibilityOffIcon className='show-password2' onClick={HiddenPassword1} />) : <VisibilityIcon className='show-password2' onClick={ShowPassword1} />}
                </div>
                {
                  editprofile ? (
                    <div className='col-12 mt-5 text-end'>
                      <input type='submit' value="Save" className='btn btn-primary' />
                    </div>
                  ) :
                    <div className='col-12 mt-5 text-end'>
                      <button type='button' className='btn btn-primary' onClick={Editprofile}>Edit</button>
                    </div>
                }
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile