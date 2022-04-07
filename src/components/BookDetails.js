import React, { useEffect, useState } from 'react';
import './bookDetails.css';
import BookCover from '../images/bookcover.jpeg';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



export default function BookDetails({bookValue}) {
    // let []=useEffect();
   



    return (
        <div className='book_details'>
            {
                bookValue ?
                    <div className='book_info'>
                        <div>
                            <div className='inner_div'>
                                <div>
                                    <div className='image-div'>
                                    <img src={bookValue.imageUri} width={130} height={130}/>
                                    </div>
                                    
                                </div>
                                <div className='right_div'>
                                    <div><h2>{bookValue.title}</h2></div>
                                    <div><h5>by {bookValue.author}</h5></div>

                                </div>

                            </div>
                            <div className='review_btn'>
                                <Button variant="primary" >
                                    Add a review
                                </Button>

                            </div>

                        </div>

                        <div className='summary'>
                            <h2>Summary</h2>
                            <div className='summary_text'>
                                {bookValue.summary}
                            </div>

                        </div>
                
            

                    </div>:null
}
          






          
        </div>
    )
}
