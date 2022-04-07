import React, { useEffect, useState } from 'react';
import BookDetails from './BookDetails'
import { Link } from 'react-router-dom';
import './update.css'
import { useParams } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import Loading from './Loading';

export default function Update() {
    const navigate = useNavigate();
    const [bookValue, setBookValue] = useState();
    const [loading,setLoading]=useState(true);
    const [delbook,setDelBook]=useState(false);
    const { id } = useParams();
    useEffect(() => {

        console.log("useell")
        fetch(`http://617a-223-226-38-198.ngrok.io/book/${id}`,{
            method: 'GET',
            headers: {
            
                'Authorization': `Bearer ${localStorage.getItem('Authorization')}`, // notice the Bearer before your token
            },
        }
        ).then((res) => {
            return res.json();
        }).then((res) => {
            console.log(res.data);
            console.log('fetch data');
            setBookValue(res.data);
            setLoading(false)


        })


    }, [id])
 
    const handleDelete=async ()=>{
        let res= await fetch(`http://617a-223-226-38-198.ngrok.io/book/${id}`,{
            method: 'Delete',
            headers: {
            
                'Authorization': `Bearer ${localStorage.getItem('Authorization')}`, // notice the Bearer before your token
            },
        }
        )
        let responseStatus=await res.status;
   if(responseStatus === 204){
       setDelBook(false)
       navigate('/')

   }
        

    }
    return (
        <div className='update'>
            {
                loading==true?<>
                <Loading/>
                </>:<>
                {
                bookValue ?
                    <>
                        <div className='buttons'>
                            <Link to={`/EditBook/${bookValue.id}`}><button>Edit</button></Link>

                            <button onClick={()=>{handleDelete()}}>Delete</button>
                        </div>
                        <BookDetails bookValue={bookValue} />

                    </> : null
            }

                </>
            }
           

        </div>
    )
}
