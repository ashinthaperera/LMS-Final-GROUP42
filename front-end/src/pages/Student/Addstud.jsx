import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components";

export default function Addstud() {

  const [inputval,setInputval] = useState ({
    firstName:"",
    lastName:"",
    address:"",
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


  const setData=(e)=>{
    const {name,value}=e.target;
    setInputval((preval)=>{
      return{
        ...preval,[name] :value
      }
    })
  }


    const addStudData =async(e)=>{
      // e.preventDefault();

      const {firstName, lastName, email, password, dob, contactNumber, address, degreeName}=inputval;
      
      const res = await fetch("http://localhost:5000/student/addstud",{  
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            firstName, lastName, email, password, dob, contactNumber, address, degreeName
          })
      });

      const data =await res.json();
      console.log(data);

      
      if(res.status ===422 || !data){
        alert("Error");
      }
      else{
        //setInputval(data);

        console.log(data);
        // alert("Data Added ")
        // window.location ="/student";

        //this if isnt working
        if(res.status ===200){
          alert("Data Added")
          // window.location ="/student";
        }
      }

    };

    const addStudUserData =async(e)=>{
      // e.preventDefault();

      
      const {firstName,lastName,email,password}=inputval;
      const role = "student"
      

        const res = await fetch("http://localhost:5000/user/register",{  
            method:"POST",
            headers:{
              "Content-Type" : "application/json"
            },
            body : JSON.stringify({
              firstName,lastName,email,password,role
            })
        });
  
        const data =await res.json();
        console.log(data);
  
        //validation
        if(res.status ===422 || !data){
          alert("Error");
        }
        else{
          //setInputval(data);
  
          console.log(data);
          alert("Data Added")
          window.location ="/admin/student";
          //this if isnt working
          if(res.status ===200){
            alert("Data Added")
            window.location ="/admin/student";
          }
        }
      

    }

    const handleButtonClick = async(e)=>{
      try {
        e.preventDefault();
        // alert("hi");
         await addStudData();
         await addStudUserData();
        // window.location = "/student"
      } catch (error) {
          console.error('Error:', error);
        // Handle errors as needed
      }
    };
  
  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">    
        <form className="mx-auto w-50 shadow p-4 bg-white rounded-2xl">
          <Header category="Page" title="Add Student Details" />
    <hr/>
    <br/>
        <Link className="btn btn-primary" to="/admin/student">Home</Link>
    <div className="container mt-4">
       
        {/* <h3 className="mt-5">Fill Student Details</h3> */}
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
        {/**email */}
        
        <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">Email</label>
                <input type="text" class="form-control" id="exampleInputEmail1"
                  name="email" onChange={setData} value={inputval.email}
                aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputEmail1"
                  name="password" onChange={setData} value={inputval.password}
                aria-describedby="emailHelp"/>
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
        <button className="btn btn-primary" 
        onClick={handleButtonClick}
         >Add Student</button>
      </div>
        </form>
      </div>
    </>
  );
  
}
