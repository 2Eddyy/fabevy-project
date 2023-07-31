import React, { useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { StateContext } from './Context/Context';
import { intialState, stateReducer } from './Component/Reducer';

import Login from './views/public/Login/Login';
import ForgotPassword from './views/public/Forgot/Forgotpassword';
import Register from './views/public/Register/Register';

import Home from './views/secured/Home/Home';
import Profile from './views/secured/Profile/Profile';
import Header from './views/secured/Header/Header';
import Footer from './views/secured/Footer/Footer';
import Opportunities from './views/secured/Opportunities/Opportunities';
import Companies from './views/secured/Companies/Companies';
import Recuiter from './views/secured/Recuiter/Recuiter';
import Candidates from './views/secured/Candidates/Candidates';
import OppViewDetails from './views/secured/Opportunities/OppViewDetails';
import CandidateView from './views/secured/Candidates/CandidateView';

function Approuter() {
  const [state, dispatch] = useReducer(stateReducer, intialState);
  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <Router>
          {state?.isAthentication ? (
            <>
              <Header />
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='home' element={<Home />}></Route>
                <Route path='profile' element={<Profile />}></Route>
                <Route path='opportunities' element={<Opportunities />}></Route>
                <Route path='companies' element={<Companies />}></Route>
                <Route path='recuiter' element={<Recuiter />}></Route>
                <Route path='candidates' element={<Candidates />}></Route>
                <Route path='opportunities/viewDetails' element={<OppViewDetails />}></Route>
                <Route path='candidates/viewDetails' element={<CandidateView />}></Route>
                <Route path='*' element={<Navigate to={'/'}></Navigate>}></Route>
              </Routes>
              <Footer />
            </>
          ) :
            <Routes>
              <Route path='login' element={<Login />}></Route>
              <Route path='register' element={<Register />}></Route>
              <Route path='forgotpassword' element={<ForgotPassword />}></Route>
              <Route path='*' element={<Navigate to={'login'}></Navigate>}></Route>
            </Routes>
          }
        </Router>
      </StateContext.Provider>
    </div>
  )
}

export default Approuter