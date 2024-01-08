import axios from "axios";
import React, {useEffect, useState}  from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "../../components";

export default function Editstud() {
  const [inputval,setInputval] =useState ({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    dob:"",
    contactNumber:"",
    address:"",
    degreeName:""
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

  const handleDegreeNameCodeChange = (e) => {
    setInputval((prevVal) => ({
      ...prevVal,
      degreeName: e.target.value
    }));
  };

  const {id} = useParams();

  const fetchStudent =async()=>{
    const res = await axios.get(`http://localhost:5000/student/viewstud/${id}`);
    
    const formattedDate = res.data.dob ? new Date(res.data.dob).toISOString().split('T')[0] : '';
    setInputval({
      firstName:res.data.firstName,
      lastName:res.data.lastName,
      email:res.data.email,
      password:res.data.password,
      dob:formattedDate,
      contactNumber:res.data.contactNumber,
      address:res.data.address,
      degreeName:res.data.degreeName
    })
  }

  useEffect(()=>{
    fetchStudent();
  }, []);

  const setData=(e)=>{
    
    setInputval({
      ...inputval,[e.target.name]:e.target.value
    });
  }
  
   
   const updateStudData =async(e)=>{
    e.preventDefault();  
    console.log(inputval);
    
    const res =await axios.put(`http://localhost:5000/student/editstud/${id}`, inputval);

    console.log(res);
    if(res.status ===200){
      alert("Data Updated")
      window.location ="/admin/student";
    }
   };
    
  return (
    <>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">    
        <form className="mx-auto w-50 shadow p-4 bg-white rounded-2xl">
          <Header category="Page" title="Edit Student Details" />
    <hr/>
    <br/>
        <Link className="btn btn-primary" to="/admin/student">Home</Link>
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
                <label htmlFor="exampleInputEmail1" class="form-label">DOB</label>
                <input type="date" class="form-control" id="exampleInputEmail1"
                  name="dob" onChange={setData} value={inputval.dob}
                aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">Contact Number</label>
                <input type="text" class="form-control" id="exampleInputEmail1"
                  name="contactNumber" onChange={setData} value={inputval.contactNumber}
                aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">Address</label>
                <input type="text" class="form-control" id="exampleInputEmail1"
                  name="address" onChange={setData} value={inputval.address}
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
            onChange={handleDegreeNameCodeChange}
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
          <br/>
        <button className="btn btn-primary" onClick={updateStudData}>Update Student</button>
        </div>
        </form>
      </div>
    </>
  );
}
