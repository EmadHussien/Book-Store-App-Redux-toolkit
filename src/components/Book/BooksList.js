import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { deleteBooks } from '../../store/bookSlice';
const BooksList = (props) => {

  const {isLoggedIn} = useSelector(state =>state.auth);
  const dispatch = useDispatch();
  

  const bookList =  props.listOfBooks.length > 0 ? props.listOfBooks.map(item=>{
    return (
        <li className='list-group-item d-flex  justify-content-between align-items-center' key={item.id}>
        <div>{item.title}</div>
        <div className='btn-group' role='group'>
          <button type='button' className='btn btn-primary' onClick={()=>props.getID(item.id, false)}>
            Read
          </button>
          <button type='button' className='btn btn-danger' disabled = {!isLoggedIn} 
           onClick = {()=> {dispatch(deleteBooks(item.id)); props.getID(item.id ,true)}}
          >
            Delete
          </button>
        </div>
      </li>
    )
  })  : 'There are no books Available'

  return (
    <div>
      <h2>Books List</h2>
      {
        props.isLoading ? 'Loading...' : 
          <ul className='list-group'>
              {bookList}
          </ul>
      }
    </div>
  );
};

export default BooksList;
