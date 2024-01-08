import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000/", {
    transports: ["websocket"],
  });


export default function LecMaterial() {
  const [moduleName, setModuleName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [dateUploaded, setDateUploaded] = useState("");
  const [allImage, setAllTmage] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  useEffect(() => {
    console.log("useEffect");
    socket.on("connect", () => { //call the server
      console.log("Socket Id ", socket.id);
    });

    socket.on("material_add", (data) => {
      alert(data);
    });

    //return close socket
    return () => {
      socket.off();
    };

  },[]);

  const getPdf = async () => {
    //get the data from the backend
    const result = await axios.get("http://localhost:5000/get-files");
    console.log(result.data.data);
    setAllTmage(result.data.data);
  };

  const submitImage = async (e) => {
    e.preventDefault(); //prevent app from reloading
    const formData = new FormData();
    formData.append("moduleName", moduleName);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file); //used api
    formData.append("dateUploaded", dateUploaded);
    console.log(moduleName, title, description, file, dateUploaded);

    const result = await axios.post(
      "http://localhost:5000/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    if (result.data.status === "ok") {
      alert("Uploaded Successfully!!!");
      socket.emit("material_add", `Lecturer Material Added`);
      getPdf();
    }
  };
  const showPdf = (pdf) => {
    window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
    // setPdfFile(`http://localhost:5000/files/${pdf}`)
  };

  //delete function
  const handleDelete = async (id) => {
    const response = window.confirm("Are you sure you want to do that?");
    alert(response);
    if (response === true) {
      const res = await axios.delete(`http://localhost:5000/deletefile/${id}`);
      if (res.status === 200) {
        alert("Data Updated");
        window.location = "/file";
      }
    }
  };

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <form
          className="mx-auto w-50 shadow p-4 bg-white rounded-2xl"
          onSubmit={submitImage}
        >
          <Header category="Page" title="Lecture Material Submission" />
          <hr />
          <br />
          <Link className="btn btn-primary" to="/lecturer/dashboard">
            Home
          </Link>
          <div className="container mt-2">
            {/* <form className='formStyle' onSubmit={submitImage}> */}
            {/* <h4>Lecture Material Submission</h4> */}
            <br />
            <label htmlFor="exampleInputEmail1" class="form-label">
              Module Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="ModuleName"
              required
              onChange={(e) => setModuleName(e.target.value)}
            />
            <br />
            <label htmlFor="exampleInputEmail1" class="form-label">
              Lecture Slide Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <label htmlFor="exampleInputEmail1" class="form-label">
              File Description
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <label htmlFor="exampleInputEmail1" class="form-label">
              Insert File
            </label>
            <input
              type="file"
              className="form-control"
              accept="application/pdf"
              required
              onChange={(e) => setFile(e.target.files[0])}
            />
            <br />
            <label htmlFor="exampleInputEmail1" class="form-label">
              Choose Date
            </label>
            <input
              type="date"
              className="form-control"
              placeholder="DateUploaded"
              required
              onChange={(e) => setDateUploaded(e.target.value)}
            />
            <br />
            <br />
            <button className="btn btn-success" type="submit">
              Add Submision
            </button>
          </div>
        </form>
        <br />
        <div className="uploaded">
          <Header category="All Files" title="Uploaded PDF" />
          {/* <h4>Uploaded PDF:</h4> */}
          <div className="output-div">
            {allImage == null
              ? ""
              : allImage.map((data) => {
                  return (
                    // <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                    <div className="inner-div m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                      <b>
                        <h6>Title: {data.title}</h6>
                      </b>
                      <button
                        className="btn btn-primary"
                        onClick={() => showPdf(data.pdf)}
                      >
                        Show Pdf
                      </button>
                      <button
                        className="btn btn-danger me-3"
                        onClick={() => handleDelete(data._id)}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
}
