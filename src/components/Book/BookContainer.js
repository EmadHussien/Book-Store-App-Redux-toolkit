import React, { Fragment, useEffect, useState } from 'react';
import BookInfo from './BookInfo';
import BooksList from './BooksList';
import './book.css';
import { getBooks } from '../../store/bookSlice';
import { useDispatch,useSelector } from 'react-redux';


const PostContainer = () => {
  const dispatch = useDispatch();
  const {isLoading,books} = useSelector(state=>state.books);

  useEffect(()=>{
    dispatch(getBooks());
  },[dispatch])

  const [info,setBookInfo] = useState({});

  const selectedBook = (id, isDeleted) => {
    if ( isDeleted ){
      setBookInfo({});
    }
    else{
      const book = books.find(item=> item.id === id);
      setBookInfo(book);  
    }
   }

   return (
    <Fragment>
      <hr className='my-5' />
      <div className='row'>
        <div className='col'>
          <BooksList isLoading = {isLoading} listOfBooks = {books} getID = {selectedBook} />
        </div>
        <div className='col side-line'>
          <BookInfo info = {info} />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
