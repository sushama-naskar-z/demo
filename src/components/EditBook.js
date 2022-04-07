import React, { useState, useEffect } from "react";
import AdminForm from "./AdminForm";
import "./editbook.css";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";

export default function EditBook() {
  const navigate = useNavigate();
  const [bookValue, setBookValue] = useState();
  const { id } = useParams();
  let formObj = {
    inputValue: {
      title: null,
      author: null,
      genre: null,
      year: null,
      publisher: null,
      summary: null,
    },
    errorValue: false,
    formStatus: {
      status: "notsubmitted",
      message: null,
    },
  };
  const [formValue, setFormValue] = useState(formObj);
  useEffect(() => {
    let { inputValue, errorValue, formStatus } = { ...formValue };
    fetch(`http://617a-223-226-38-198.ngrok.io/book/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`, // notice the Bearer before your token
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res.data);
        // console.log('fetch data');
        setBookValue(res.data);
        inputValue = res.data;
        setFormValue({ inputValue, errorValue, formStatus });
      });
  }, [id]);
  // console.log(id);

  const handleChange = (e) => {
    let { inputValue, errorValue, formStatus } = { ...formValue };
    errorValue = false;
    inputValue[e.target.id] = e.target.value;
    setFormValue({ inputValue, errorValue, formStatus });
  };

  const validateForm = (keyName, val) => {
    console.log(keyName, val);

    if (
      keyName == "title" ||
      keyName == "author" ||
      keyName == "genre" ||
      keyName == "publisher"
    ) {
      if (val == undefined || val == "" || val == null || val.length < 2) {
        return 1;
      } else {
        return 0;
      }
    }
  };

  const handleOnClick =  (e) => {
    e.preventDefault();
    let { inputValue, errorValue, formStatus } = { ...formValue };
    let checkValid = Object.keys(inputValue).map((ele) => {
      return validateForm(ele, inputValue[ele]);
    });
    if (checkValid.includes(1)) {
      errorValue = true;
      formStatus.status = "not submitted";
      console.log("not submitted");
    } else {
        console.log('title',inputValue.title);
        let dataBody={
            id: `${id}`,
            title: `${inputValue.title }`,
            author: `${inputValue.author}`,
            summary: `${inputValue.summary}`,
            genre: `${inputValue.genre}`,
            year: `${inputValue.year}`,
            publisher: `${formObj.inputValue.publisher}`,
            imageUri: "https://drive.google.com/uc?export=view&id=13RhJ1SvXjEMA8zoZRaavSyYJBCl1-AkX",
          }
          console.log('databody',dataBody);
       fetch(`http://617a-223-226-38-198.ngrok.io/book/${id}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("Authorization")}`, // notice the Bearer before your token
          'Content-type':'application/json'

        },
        body: JSON.stringify({
            
            title: `${inputValue.title}`,
            author: `${inputValue.author}`,
            summary: `${inputValue.summary}`,
            genre: `${inputValue.genre}`,
            year: Number(inputValue.year),
            publisher:`${inputValue.publisher}`,
            imageUri: "https://drive.google.com/uc?export=view&id=13RhJ1SvXjEMA8zoZRaavSyYJBCl1-AkX",
          }),
      }).then((res)=>{
          console.log(res)
          if (res.status === 200) {
            errorValue = false;
            formStatus.status = "submitted";
            console.log("submitted");
            console.log(formObj);
            navigate(`/update/${id}`);
          }
          return res;
      }).then((res)=>{

      })
      
    }
    setFormValue({ inputValue, errorValue, formStatus });
  };

  return (
    <div className="edit-book">
      {console.log(formValue)}
      <div className="error-message">
        {formValue.errorValue == true ? (
          <div>All feilds are required.</div>
        ) : null}
      </div>

      <form onSubmit={handleOnClick}>
        <div className="adminform">
          <div className="item">
            <label>Title</label>
            <input
              type="text"
              id="title"
              onChange={handleChange}
              defaultValue={bookValue ? `${bookValue.title}` : ""}
            />
          </div>
          <div className="item">
            <label>Author</label>
            <input
              type="text"
              id="author"
              onChange={handleChange}
              defaultValue={bookValue ? `${bookValue.author}` : ""}
            />
          </div>
          <div className="item">
            <label>Genre</label>
            <input
              type="text"
              id="genre"
              onChange={handleChange}
              defaultValue={bookValue ? `${bookValue.genre}` : ""}
            />
          </div>
          <div className="item">
            <label>year</label>

            <input
              type="number"
              id="year"
              onChange={handleChange}
              defaultValue={bookValue ? `${bookValue.year}` : ""}
            />
          </div>
          <div className="item">
            <label>Publisher</label>
            <input
              type="text"
              id="publisher"
              onChange={handleChange}
              defaultValue={bookValue ? `${bookValue.publisher}` : ""}
            />
          </div>

          <div className="item">
            <label>Summary</label>
            <textarea
              className="summary"
              cols="50"
              rows="10"
              id="summary"
              onChange={handleChange}
              defaultValue={bookValue ? `${bookValue.summary}` : ""}
            />
          </div>
        </div>
        <div className="edit-btn">
          <button>Update</button>
        </div>
      </form>
    </div>
  );
}
