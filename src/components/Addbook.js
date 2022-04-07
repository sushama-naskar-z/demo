import React,{ useState,useEffect } from 'react'
// import AdminForm from './AdminForm'
import './addbook.css'

export default function Addbook() {
    let formObj = {
        inputValue:{
            title:null,
            author:null,
            genre:null,
            year:null,
            publisher:null,
            summary:null,
            regd_number:null

        },
        errorValue:false,
        formStatus:{
            status:'notsubmitted',
            message:null

        }

    }
    const [formValue, setFormValue] = useState(formObj);

    const handleChange = (e) => {
        let {inputValue,errorValue,formStatus}={...formValue}
        errorValue=false
        inputValue[e.target.id]=e.target.value;
        setFormValue({inputValue,errorValue,formStatus});
    }

    const validateForm=(indexName,val)=>{
        console.log(indexName);
        let {inputValue,errorValue,formStatus}={...formValue}
        let errorMessage=0;
        if(val==undefined || val=='' || val==null ){
            errorValue=true;
            errorMessage=1;
        }
           
     setFormValue({inputValue,errorValue,formStatus})
     return errorMessage;
       }

    const handleOnClick=(e)=>{
        e.preventDefault();
      let {inputValue,errorValue,formStatus}={...formValue}
     let checkValid=Object.keys(inputValue).map((ele)=>{
         return validateForm(ele,inputValue[ele]);
     })
      if(checkValid.includes(1)){
        errorValue=true;
          formStatus.status="not submitted";
          console.log('not submitted');
         
      }else{
        console.log('author',inputValue.author)
        errorValue=false;
          
           fetch(`http://617a-223-226-38-198.ngrok.io/book`,
          {
           method: 'POST',
           headers: {
               
               'Authorization': `Bearer ${localStorage.getItem('Authorization')}`, // notice the Bearer before your token
               'Content-type':'application/json'
           },
           body:JSON.stringify({
            
                "title": `${inputValue.title}`,
                "author": `${inputValue.author}`,
                "summary": `${inputValue.summary}`,
                "genre": `${inputValue.genre}`,
                "year": Number(inputValue.year),
                "regNum": `${inputValue.regd_number}`,
                "publisher": `${inputValue.publisher}`,
                "language": "English",
                "imageUri": "https://drive.google.com/uc?export=view&id=13RhJ1SvXjEMA8zoZRaavSyYJBCl1-AkX"
              

           })
          }).then((res)=>{
              console.log(res.status)
            if(res.status === 201){
                formStatus.status="submitted";
                console.log('submitted');
                console.log(formObj)
    
               }

          })
          
          

          
          
      }
      setFormValue({inputValue,errorValue,formStatus});
  
    }

  return (
    <div className='add-book'>
        <div className='error-message'>
            {formValue.errorValue==true?<div>All feilds are required.</div>:null}

            </div>
            <div className='submitted'>
            {formValue.formStatus.status=='submitted'?<div>Data added successfully.</div>:null}

            </div>
        <form onSubmit={handleOnClick}>
        
              <div className='adminform'>

            <div className='item'>
                <label>
                    Title
                </label>
                <input type="text" id="title" onChange={handleChange} />


            </div>
            <div className='item'>
                <label>
                    Author
                </label>
                <input type="text" id="author" onChange={handleChange}/>


            </div>
            <div className='item'>
                <label>
                    Genre
                </label>
                <input type="text" id="genre" onChange={handleChange}/>


            </div>
            <div className='item'>
                <label>
                    Year
                </label>
                <input type="number" id="year" onChange={handleChange}/>


            </div>
            <div className='item'>
                <label>
                    Publisher
                </label>
                <input type="text" id="publisher" onChange={handleChange}/>


            </div>
            
            <div className='item'>
                <label>
                    Registration Number
                </label>
                <input type="text" id="regd_number" onChange={handleChange}/>


            </div>
            <div className='item'>
                <label>
                    Summary
                </label>
                <textarea className="summary" cols="50" rows="10"  id="summary" onChange={handleChange}/>


            </div>


        </div>
            <div className='add-btn'> <button>Add</button></div>
           
        </form>
    </div>
  )
}
