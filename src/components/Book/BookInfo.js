import React, { Fragment } from 'react';

const BookInfo = (props) => {

  return (
    <Fragment>
      <h2>Book Details</h2>
      {
        Object.keys(props.info).length > 0 ?
            <div>
              <p className='fw-bold'>Title: {props.info.title}</p>
              <p className='fw-light'>Description: {props.info.description}</p>
              <p className='fw-light'>insered by: {props.info.userName}</p>
              <p className='fst-italic'>Price: {props.info.price}</p>
            </div> 
            :
            <div className='alert alert-secondary' role='alert'>
              There is no book selected yet. Please select!
            </div>
      } 
          
    </Fragment>
  );
};

export default BookInfo;
