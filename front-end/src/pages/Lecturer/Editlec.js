import axios from "axios";
import React, {useEffect, useState}  from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "../../components";

export default function Editslec() {
  const [inputval,setInputval] =useState ({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    contactNumber:"",
    moduleName:""
  });

  const [moduleOptions, setModuleOptions] = useState([]);

  useEffect( () => {
    const fetchModuleCodes = async () => {
      const moduleCodes = await fetch("http://localhost:5000/module");
      
      const data = await moduleCodes.json();
      setModuleOptions(
        data.map((module) => module.moduleName)
      );
    };
    fetchModuleCodes();
  }, []);

  const handleModuleNameCodeChange = (e) => {
    setInputval((prevVal) => ({
      ...prevVal,
      moduleName: e.target.value
    }));
  };

  const {id} = useParams();

  const fetchLecturer =async()=>{
    const res = await axios.get(`http://localhost:5000/lecturer/viewlec/${id}`);
    console.log(res);
    setInputval({
      firstName:res.data.firstName,
      lastName:res.data.lastName,
      email:res.data.email,
      password:res.data.password,
      contactNumber:res.data.contactNumber,
      moduleName:res.data.moduleName
    });
  };

  useEffect(()=>{
    fetchLecturer();
  }, []);

  const setData=(e)=>{
    setInputval({
      ...inputval,[e.target.name]:e.target.value
    });
  };
  
   const updateStudData =async(e)=>{
    e.preventDefault();  
    console.log(inputval);
    const res =await axios.put(`http://localhost:5000/lecturer/editlec/${id}`, inputval);

    console.log(res);
    if(res.status ===200){
      alert("Data Updated")
      window.location ="/admin/lecturer";
    }
   };
    
  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">    
        <form className="mx-auto w-50 shadow p-4 bg-white rounded-2xl">
          <Header category="Page" title="Edit Lecturer Details" />
    <hr/>
    <br/>
        <Link className="btn btn-primary" to="/admin/lecturer">Home</Link>
    <div className="container mt-3">
          <div class="mb-3">
        <label htmlFor="exampleInputEmail1" class="form-label">First Name</label>
        <input type="text" class="form-control" id="exampleInputEmail1"
          name="firstName" onChange={setData} value={inputval.firstName}
        aria-describedby="emailHelp"/>
      </div>
      <div class="mb-3">
        <label htmlFor="exampleInputEmail1" class="form-label">Last Name</label>
        <input type="text" class="form-control" id="exampleInputEmail1"
          name="lastName" onChange={setData} value={inputval.lastName}
        aria-describedby="emailHelp"/>
      </div>
      <div class="mb-3">
        <label htmlFor="exampleInputEmail1" class="form-label">Email</label>
        <input type="text" class="form-control" id="exampleInputEmail1"
          name="email" onChange={setData} value={inputval.email}
        aria-describedby="emailHelp" disabled/>
      </div>
      <div class="mb-3">
        <label htmlFor="exampleInputEmail1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputEmail1"
          name="password" onChange={setData} value={inputval.password}
        aria-describedby="emailHelp" disabled/>
      </div>
      <div class="mb-3">
        <label htmlFor="exampleInputEmail1" class="form-label">Contact Number</label>
        <input type="text" class="form-control" id="exampleInputEmail1"
          name="contactNumber" onChange={setData} value={inputval.contactNumber}
        aria-describedby="emailHelp" />
      </div>
      
      <div className="mb-3">
          <label htmlFor="moduleName" className="form-label">
            Module
          </label>
          <select
            className="form-select"
            id="moduleName"
            name="moduleName"
            onChange={handleModuleNameCodeChange}
            value={inputval.moduleName}
          >
            <option value="" disabled>Select Module</option>
            {moduleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}

          </select>
        </div>
        <br/>
        <button className="btn btn-primary" onClick={updateStudData}>Update Lecuter</button>
        </div>
        </form>
      </div>
    </>
  );
};
