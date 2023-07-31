import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
  return (
    <div className='footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-6 footer-left'>
            <h5 className='mb-3'>Copyright 2022 Fabevy Technologies. All Rights Reserved.</h5>
          </div>
          <div className='col-6 footer-right'>
            <ul className='footer-list'>
              <li>
                <Link><InstagramIcon/></Link>
              </li>
              <li>
                <Link><FacebookIcon/></Link>
              </li>
              <li>
                <Link><LinkedInIcon/></Link>
              </li>
              <li>
                <Link><YouTubeIcon/></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer