import React,{useEffect,useState} from 'react';
import Bookcover from '../images/bookcover.jpeg';
import './booklist.css';
import { Link } from 'react-router-dom';
import Data from '../data/data';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactComponent as Prev } from '../images/prev.svg';
import { ReactComponent as Next} from '../images/next.svg';
import Loading from './Loading';


export default function Booklist() {
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div onClick={onClick} style={{ ...style}}>
                <div className='arrow'><Next width="15"/></div>
                </div>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div onClick={onClick} style={{ ...style}}>
                <div className='arrow'><Prev width="15"/></div>
                </div>

        );
    }
    var settings = {
        dots: false,
        infinite: false,
        arrows: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    }

    const [book,setBook]=useState([]);
    const [genre,setGenre]=useState();
    const [allbook,setAllBook]=useState();
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        console.log("useell")
        

    //  .then((res)=>res.json()).then((res)=>{
    //      console.log(res);
    //  })
     
       const fetchApi=async()=>{
        console.log('fetch data');

            // let category= await fetch('http://617a-223-226-38-198.ngrok.io/list/genre',
            // // headers:{
            // //     "Authorization":"Bearer  "
            // // }
            // );
            // let categoryList=await category.json();
            // const urls = categoryList.data.map((ele)=>{
            //     return `http://617a-223-226-38-198.ngrok.io/book?genre=${ele}`;
            // });
            // console.log(urls);
            // const results = await Promise.all(
            //   urls.map(url => fetch(url).then(res => res.json()).then((res)=>{
            //     let bookObj={};
            //              bookObj['category']=url.split('=')[1];
            //             //  console.log(res.data)
            //              bookObj['books']=res.data;
            //             //  console.log(bookObj['books'])
            //       return bookObj;
            //     }))
            // );
            // console.log(results);
            
          
        //    let l= await categoryList.data.reduce(async (bookl,ele)=>{
        //        let b=await  fetch(`http://617a-223-226-38-198.ngrok.io/book?genre=${ele}`);
        //        let res=await b.json();
               
                
        //        console.log(res);


               
        //          let bookObj={};
        //          bookObj['category']=ele;
        //          bookObj['books']=res.data;
                 
        //          console.log(bookl)
        //         //  bookl.push(bookObj);
        //         //  setBook(bookl);


               
        //         return bookl.data;
                
        //     },Promise.resolve([]))
            
            
                
            
       let d=await fetch(`http://617a-223-226-38-198.ngrok.io/book?size=${45}`,
       {
        method: 'GET',
        headers: {
            
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`, // notice the Bearer before your token
        },
       });
        let data=await d.json();
        // console.log(data.data);
         setLoading(false)
        let h=data.data.reduce((results,curr)=>{
            let index=results.findIndex(function(book){
                return book['category']==curr.genre
            })
            if(index!==-1){
                let booklist=results[index]['books'];
                booklist.push(curr);
                // console.log(booklist)
                // console.log(results[index]['books'])
                
                  
            }else{
                
                let bookObj={};
            bookObj['category']=curr.genre;
           
            bookObj['books']=[];
            bookObj['books'].push(curr)
           
            results.push(bookObj);

            }
            return results
    
         },[])

         console.log(h);
         setBook(h);
                
        }
       
        fetchApi();
        
        
            // setData(res.data);

       
        // fetch('http://617a-223-226-38-198.ngrok.io/book?genre=Fiction').then((res)=>{
        //     return res.json();
        // }).then((res)=>{
        //     console.log(res);
        //     console.log('fetch data');
        //     // setData(res.data);

        // })
        

    },[])

    const booklist = Data.bookList;
    
    return (
        <div>
            {
                loading==true?<div>
                    <Loading/>

                </div>:
                <>
                {
           book?   <div className='booklist'>
               {
                   book.map((book) => {
                       return (
                           <div   className="category">
                               <h2>{book.category}</h2>
                               <hr></hr>
                               <Slider {...settings} className="b">
                                   {book.books.map((ele) => {
                                       
                                       return (
                                           <Link to={`/update/${ele.id}`}className="a">
                                               <div className='a'><div className='image-div'><img src={ele.imageUri} width={128} height={130}/></div></div>
                                               <div>
                                                   {ele.title}
                                               </div>
                                               <div>by Author Name</div>
                                               <div>
                                                   
       
       
                                               </div>
       
       
       
       
       
                                           </Link>
                                       )
                                   })}
                               </Slider>
                           </div>
       
       
                       )
       
                   })
               }
       
           </div>:<div>no data</div>
       }

                </>
            }
           
       
        </div>
       
    )
}


{/* <div key={book.category.category_id}>{book.category['catgory_name']}
                            <Carousel responsive={responsive}
                                
                                autoPlay={false}
                            >
                                {book.books.map((ele) => {
                                    return (
                                        <div draggable={false}>{ele.title}</div>
                                    )
                                })}
                            </Carousel>
                        </div> */}

{/* <h1>Booklist</h1>
            <Link to="/book" className='booklist' >
                
                
                <div>
                    <div className='title'>Book Title</div>
                    <div><span className='grey-font'>by</span>Author Name</div>
                </div>

            </Link> */}


        //     <div
        //     className={className}
        //     style={{ ...style, display: "block", background: "white" ,border:"1px solid gray"}}
        //     onClick={onClick}
        //   />




    //     <div className='booklist'>
    //     {
    //         booklist.map((book) => {
    //             return (
    //                 <div  key={book.category.category_id} className="category">
    //                     <h2>{book.category['catgory_name']}</h2>
    //                     <hr></hr>
    //                     <Slider {...settings} className="b">
    //                         {book.books.map((ele) => {
    //                             return (
    //                                 <Link to="/update" key={ele.id} className="a">
    //                                     <div className='a'><img src={Bookcover} width={128} /></div>
    //                                     <div>
    //                                         {ele.title}
    //                                     </div>
    //                                     <div>by Author Name</div>
    //                                     <div>
                                            


    //                                     </div>





    //                                 </Link>
    //                             )
    //                         })}
    //                     </Slider>
    //                 </div>


    //             )

    //         })
    //     }

    // </div>