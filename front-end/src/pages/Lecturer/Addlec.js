import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components';

export default function Addlec (){
  const [inputval,setInputval] = useState ({
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

  
  const setData=(e)=>{
    console.log(e.target.value)
    const {name,value}=e.target;
    setInputval((preval)=>{
      return{
        ...preval,[name] :value
      }
    })
  }

    //after the api works (through postman checking)
    const addLecData =async(e)=>{
      // e.preventDefault();

      //magic
      const {firstName, lastName, email, password, contactNumber, moduleName} = inputval;

      const res = await fetch("http://localhost:5000/lecturer/addlec",{  
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          firstName, lastName, email, password, contactNumber, moduleName
        })
    });

      const data =await res.json();
      console.log(data);

      //validation
      if(res.status ===422 || !data){
        alert("Error");
      }
      else{
        setInputval(data);

        console.log(data);
        // alert("Data Added")
        // window.location ="/lecturer";
        //this if isnt working
        if(res.status ===200){
          // alert("Data Added")
          // window.location ="/lecturer";
        }
      }

    }

    const addLecUserData =async(e)=>{
      // e.preventDefault();

      //magic
      const {firstName,lastName,email,password}=inputval;
      const role = "lecturer"
      //insert route url of the addstud of the backend (see the backend port is similar to link's port)
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
        setInputval(data);

        console.log(data);
        alert("Data Added")
        window.location ="/admin/lecturer";
        //this if isnt working
        if(res.status ===200){
          alert("Data Added")
          window.location ="/admin/lecturer";
        }
      }

    }

    const handleButtonClick = async(e)=>{
      try {
        e.preventDefault();
        // alert("hi")
         await addLecData();
         await addLecUserData();
        // window.location = "/student"
      } catch (error) {
        console.error('Error:', error);
        // Handle errors as needed
      }
    };


    return(

        <>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">    
        <form className="mx-auto w-50 shadow p-4 bg-white rounded-2xl">
          <Header category="Page" title="Add Lecturer Details" />
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
        aria-describedby="emailHelp"/>
      </div>
      <div class="mb-3">
        <label htmlFor="exampleInputEmail1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputEmail1"
          name="password" onChange={setData} value={inputval.password}
        aria-describedby="emailHelp"/>
      </div>
      <div class="mb-3">
        <label htmlFor="exampleInputEmail1" class="form-label">Contact Number</label>
        <input type="text" class="form-control" id="exampleInputEmail1"
          name="contactNumber" onChange={setData} value={inputval.contactNumber}
        aria-describedby="emailHelp"/>
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
          <button className="btn btn-primary" onClick={handleButtonClick} >Add Lecturer</button>
          </div>
          </form>
        </div>
      </>

    )

}