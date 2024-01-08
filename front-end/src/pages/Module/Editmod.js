import axios from "axios";
import React, {useEffect, useState}  from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "../../components";

export default function Editmod() {
  const [inputval,setInputval] =useState ({
    moduleCode:"",
    moduleName:"",
    degreeName:"",
    firstName:""
  });

  const [degreeOptions, setDegreeOptions] = useState([]);

  useEffect( () => {
    const fetchDegreeCodes = async () => {
      const degreeCodes = await fetch("http://localhost:5000/degree");
      
      const data = await degreeCodes.json();
      setDegreeOptions(
        data.map((degree) => degree.degreeName)
      );
    };
    fetchDegreeCodes();
  }, []);

  const handleDegreeCodeChange = (e) => {
    setInputval((prevVal) => ({
      ...prevVal,
      degreeName: e.target.value
    }));
  };

  const [lecturerOptions, setLecturerOptions] = useState([]);

  useEffect( () => {
    const fetchLecturerCodes = async () => {
      const lecturerCodes = await fetch("http://localhost:5000/lecturer");
      
      const data = await lecturerCodes.json();
      setLecturerOptions(
        data.map((lecturer) => lecturer.firstName)
      );
    };
    fetchLecturerCodes();
  }, []);

  const handleLecturerFirstNameCodeChange = (e) => {
    setInputval((prevVal) => ({
      ...prevVal,
      firstName: e.target.value
    }));
  };

  const {id} = useParams()
  
  const fetchModule =async()=>{
    const res = await axios.get(`http://localhost:5000/module/viewmod/${id}`);
    console.log(res);
    setInputval({
      moduleCode:res.data.moduleCode,
      moduleName:res.data.moduleName,
      degreeName:res.data.degreeName,
      firstName:res.data.firstName
    });
  };

  useEffect(()=>{
    fetchModule();
  }, []);

  
  const setData=(e)=>{
    setInputval({
      ...inputval,[e.target.name]:e.target.value
    });
  };
   const updateModData =async(e)=>{
    e.preventDefault();  
    console.log(inputval);
    const res =await axios.put(`http://localhost:5000/module/editmod/${id}`, inputval);
    console.log(res);
    if(res.status ===200){
      alert("Data Updated")
      window.location ="/admin/module";
    }
   };
    
  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">    
        <form className="mx-auto w-50 shadow p-4 bg-white rounded-2xl">
          <Header category="Page" title="Edit Module Details" />
    <hr/>
    <br/>
        <Link className="btn btn-primary" to="/admin/module">Home</Link>
    <div className="container mt-3">
          <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">First Name</label>
                <input type="text" class="form-control" id="exampleInputEmail1"
                  name="firstName" onChange={setData} value={inputval.firstName}
                aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">Module Code</label>
                <input type="text" class="form-control" id="exampleInputEmail1"
                  name="moduleCode" onChange={setData} value={inputval.moduleCode} //magic
                aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">Module Name</label>
                <input type="text" class="form-control" id="exampleInputEmail1"
                  name="moduleName" onChange={setData} value={inputval.moduleName}
                aria-describedby="emailHelp"/>
        </div>

        <div className="mb-3">
          <label htmlFor="degreeName" className="form-label">
            Degree
          </label>
          <select
            className="form-select"
            id="degreeName"
            name="degreeName"
            onChange={handleDegreeCodeChange}
            value={inputval.degreeName}
            >
              <option value="" disabled>Select Degree</option>
              {degreeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}

          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            Lecturer
          </label>
          <select
            className="form-select"
            id="firstName"
            name="firstName"
            onChange={handleLecturerFirstNameCodeChange}
            value={inputval.firstName}
            >
              <option value="" disabled>Select Lecturer</option>
              {lecturerOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}

          </select>
        </div>
        <br/>
        <button className="btn btn-primary" onClick={updateModData}>Update Module</button>
        </div>
        </form>
      </div>
    </>
  );
}
