import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';

const Navbar = () => {

  const {name} = useSelector( state => state.auth );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout())
  }


  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
        <div className="navbar-brand">
        {name}
        </div>
    
    <button
    onClick={handleLogout}
    className="btn btn-outline-danger">
       <i className="fa fa-sign-out-alt"></i>
        <span> Salirse</span>
    </button>
    </div>
  )
}

export default Navbar