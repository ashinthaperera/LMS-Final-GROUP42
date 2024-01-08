import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Header } from '../../components';

export default function Deletelec (){
  const {id} = useParams();
  const [lecturer, setLecData] = useState([]);
  const fetchLecturer =async()=>{
    const res = await axios.get(`http://localhost:5000/lecturer/viewlec/${id}`);
    console.log(res);
    setLecData(res.data);
  }

  useEffect(()=>{
    fetchLecturer();
  }, []);

  
  const handleDelete = async(id)=>{
    const response = window.confirm("Are you sure you want to delete that?");
    if(response===true){
      const res =await axios.delete(`http://localhost:5000/lecturer/deletelec/${id}`);
      console.log(res);
      if(res.status ===200){
        alert("Data Updated")
        window.location ="/admin/lecturer";
      }
    
    }
    else{
      fetchLecturer();
    }
  }
  return(

      <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Delete lecturer" />
        <b>
          <h2>Are you sure you want to delete this?</h2>
            <h4>Lecturer : {lecturer?.firstName} {lecturer?.lastName}</h4>
          </b>
    <hr/>
      <div className="container mt-4">
            
            <br/>
          <table>
              <tr>
                  <td>First name</td>
                  <td> :&emsp; &emsp;{lecturer?.firstName}</td>
              </tr>
              <tr>
                  <td>Last name</td>
                  <td> :&emsp; &emsp;{lecturer?.lastName} </td>
              </tr>
              <tr>
                  <td>Email</td>
                  <td> :&emsp; &emsp;{lecturer?.email}</td>
              </tr>
              {/* <tr>
                  <td>Password</td>
                  <td> {lecturer?.password}</td>
              </tr> */}
              <tr>
                  <td>Contact Number &emsp;</td>
                  <td> :&emsp; &emsp;{lecturer?.contactNumber}</td>
              </tr>
              <tr>
                  <td>Module</td>
                  <td> :&emsp; &emsp;{lecturer?.moduleName}</td>
              </tr>
          </table>
          </div>
          <br/>
          <br/>
          <br/>
          <NavLink className="btn btn-primary" to="/admin/lecturer">Back to List</NavLink>
          <NavLink className="btn btn-danger me-3" onClick={()=> handleDelete(lecturer._id)}>Delete</NavLink>
      </div>
      </>

  );

};