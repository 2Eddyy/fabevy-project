import React from 'react';
import './Home.css';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';

import AppsIcon from '@mui/icons-material/Apps';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ApartmentIcon from '@mui/icons-material/Apartment';

function Home() {

  return (
    <div className='main-body'>
      <div className='container'>
        <div className='row'>
          <ul className='home-card'>
            <li className=' col-sm-6 col-lg-4  mb-5 mt-5'>
              <Link to="/opportunities">
                <Card className='cards'>
                  <div className='text-center'>
                    <AppsIcon className='home-icon'/>
                    <h2 className='text-center'>Opportunities</h2>
                  </div>
                </Card>
              </Link>
            </li>
            <li className=' col-sm-6 col-lg-4 mb-5 mt-5'>
              <Link to="/companies">
                <Card className='cards'>
                  <div className='text-center'>
                    <ApartmentIcon className='home-icon'/>
                    <h2 className='text-center'>Companies</h2>
                  </div>
                </Card>
              </Link>
            </li>
            <li className=' col-sm-6 col-lg-4 mb-5 mt-5'>
              <Link to="/recuiter">
                <Card className='cards'>
                  <div className='text-center'>
                    <CheckBoxIcon className=' home-icon'/>
                    <h2 className='text-center'>Recuiter</h2>
                  </div>
                </Card>
              </Link>
            </li>
            <li className=' col-sm-6 col-lg-4 mb-5 mt-5'>
              <Link to="/candidates">
                <Card className='cards'>
                  <div className='text-center '>
                    <RadioButtonUncheckedIcon className='home-icon'/>
                    <h2 className='text-center'>Candidates</h2>
                  </div>
                </Card>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home