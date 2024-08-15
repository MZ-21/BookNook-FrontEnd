// //import React from 'react'
// import './Hero.css';
// import Carousel from 'react-material-ui-carousel';
// import { Paper } from '@mui/material';


// const Hero = ({ books }) => {
//     if(!books){
//         return  <div>Loading...</div>
//     }
//     return (
//         <div className='books-carousel-container'>
//             <Carousel>
//                 {
//                     books.map((book) => {
//                         return(
//                             <Paper key={book.bookId}>
//                                 <div className = 'book-card-container'>
//                                     <div className='book-card'>
//                                         <div className='book-detail'>
//                                             <div className='book-poster'>
//                                                 <img src={book.coverImg} alt="" />
//                                             </div>
//                                             <div className='book-title'>
//                                                 <h4>{book.title}</h4>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Paper>
//                         )
//                     })
//                 }
//             </Carousel>

//         </div>
//     )
// }

// export default Hero;