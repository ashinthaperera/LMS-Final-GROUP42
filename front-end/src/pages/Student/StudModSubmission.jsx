import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Header } from "../../components";
import { NavLink } from "react-router-dom";

const StudModSubmission = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);

  // const [moduleName, setModuleName] = useState("");
  // const [title, setTitle] = useState("");
  // const [dueDate, setDueDate] = useState("");
  // const [submittedDate, setSubmittedDate] = useState("");
  // const [submittionStatus, setSubmittionStatus] = useState("");

  const [moduleName, setModuleName] = useState(""); //to create a new state when
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [dateUploaded, setDateUploaded] = useState("");
  const [allImage, setAllTmage] = useState(null);

  const moduleNameInputRef = useRef(null);
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const dateUploadedInputRef = useRef(null);

  useEffect(() => {
    if (uploadSuccess) {
      setReloadPage(true);
    }
  }, [uploadSuccess]);

  useEffect(() => {
    if (reloadPage) {
      window.location.reload();
    }
  }, [reloadPage]);

  useEffect(()=>{
    getPdf();
},[]);
  //description, file, dateUploaded, allImage moduleName:String,
  // title:String,
  // description:String,
  // pdf:String,
  // dateUploaded:Date,

  const getPdf = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        "http://localhost:5000/studmodulesub/get-studmodSubfiles"
      );

      const reversedData = result.data.data.slice().reverse();

    // Display only the last submitted file
    setAllTmage(reversedData.length > 0 ? [reversedData[0]] : []);

      // setItems(result.data.items);
      // setAllTmage(result.data.data.slice()); //remove the one to show all files
        
      setLoading(false);

      console.log(result.data.items);
    } catch (error) {
      console.log(error);
    }
  };


  const submitImage = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("moduleName", moduleName);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", fileInputRef.current.files[0]);
      formData.append("dateUploaded", dateUploaded);

      const item = await axios.post(
        "http://localhost:5000/studmodulesub/upload-studmodSubfiles",
        formData
      );
      console.log(item);

      if (item.data.status === "ok") {
        alert("You have submitted successfully!");
        // viewItem();
        setModuleName("");
        setTitle("");
        setDescription("");
        setDateUploaded("");
  
        moduleNameInputRef.current.value = "";
        titleInputRef.current.value = "";
        descriptionInputRef.current.value = "";
        dateUploadedInputRef.current.value = "";
  
        fileInputRef.current.value = null;
  
        setUploadSuccess(true);
        // getPdf();
      }

     
    } catch (error) {
      console.log(error);
    }
  };

  const showPdf = (itemId) => {
    window.open(
      `http://localhost:5000/studmodSubfiles/${itemId}`,
      "_blank",
      "noreferrer"
    );
  };

  const handleDelete = async (itemId) => {
    try {
      const response = window.confirm("Are you sure you want to do that?");
    alert(response);
    if(response===true){
      const res =await axios.delete(`http://localhost:5000/studmodulesub/deletefile/${itemId}`);
      if(res.status ===200){
        alert("Data Updated")
        window.location ="/studentfile";
      }
    }

      console.log("Item removed successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="Page" title="Student Submission" />
    <hr/>
      <div className="container mt-4">
            <div className="mt-3">
                <NavLink className="btn btn-primary" to="/student/dashboard">Home</NavLink>
            </div>
            <br/>
      {/* <div class="container">
        <p class="display-4">Student Submission</p>
        <div class="m-2"> */}
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td class="mx-2">Module Name</td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput"
                    ref={moduleNameInputRef}
                    onChange={(e) => setModuleName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td class="mx-2">Title</td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput"
                    ref={titleInputRef}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td class="mx-2 form-label">Description</td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput"
                    ref={descriptionInputRef}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td class="mx-2">Submitted Date</td>
                <td>
                  <input
                    type="date"
                    class="form-control"
                    id="formGroupExampleInput"
                    ref={dateUploadedInputRef}
                    onChange={(e) => setDateUploaded(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <form>
          <div class="form-group">
            <input
              type="file"
              class="file mx-5 "
              id="exampleFormControlFile1"
              ref={fileInputRef}
            />

            <button
              type="button"
              class="btn btn-success"
              onClick={submitImage}
            >
              Upload
            </button>

            {/* 
                <button type="button" class="btn btn-secondary" onClick={() => viewItem(id)}>View</button>
                 */}
          </div>
        </form>

        {/* <div className="items">
          {items &&
            items.map((item) => (
              <div className="item" key={item._id}>
                <h6>{item.moduleName}</h6>
                <button
                  type="button"
                  class="btn btn-secondary mx-3"
                  onClick={() => viewItem(item._id)}
                >
                  View File
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
            ))}
        </div> */}

<div className="uploaded">
<Header category="All Files" title="Uploaded PDF" />
        <div className="output-div">
          {allImage == null
            ? ""
            : allImage.map((data) => {
                return (
                  <div className="inner-div">
                    <b>

                    <h6>Title: {data.title}</h6>
                    </b>
                    <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button>
                     <button className="btn btn-danger me-3" onClick={()=> handleDelete(data._id)}>Delete</button> 
                  </div>
                );
              })}
        </div>
      </div>
      </div>
    </>
  );
};

export default StudModSubmission;
