import React from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

const AddNewFab = () => {
const dispatch = useDispatch();

const handleModal = () => {
dispatch(uiOpenModal())
}

  return (
    <button className='btn btn-primary fab' onClick={handleModal} >
        <i className="fas fa-plus"></i>
    </button>
  )
}

export default AddNewFab