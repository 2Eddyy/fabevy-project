import React, { useContext } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useNavigate } from 'react-router-dom';

import { StateContext } from '../../../Context/Context';

function CandidateView() {

  const navigate = useNavigate();

  const { state } = useContext(StateContext);
  console.log(state.opportunities);

  // back home button
  const BackButton = () => {
    navigate('/candidates')
  }


  return (
    <div className='main-body'>
      <div className='oppview mt-2'>
        <div className='container oppview-card'>
          <div className='row oppview-cards'>
            <div className='oppview-btn'>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="my-tooltip">Back to home</Tooltip>}
              >
                <button onClick={BackButton} ><ArrowCircleLeftIcon /></button>
              </OverlayTrigger>
            </div>
            <div className='col-6'>
              <h4>Id</h4>
            </div>
            <div className='col-6'>
              <h5>{state.opportunities.id}</h5>
            </div>
            <div className='col-6'>
              <h4>User Id</h4>
            </div>
            <div className='col-6'>
              <h5>{state.opportunities.userId}</h5>
            </div>
            <div className='col-6'>
              <h4>Title</h4>
            </div>
            <div className='col-6'>
              <h5>{state.opportunities.title}</h5>
            </div>
            <div className='col-6'>
              <h4>Body data</h4>
            </div>
            <div className='col-6'>
              <h5>{state.opportunities.body}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateView