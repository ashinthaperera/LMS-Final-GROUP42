import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Header } from '../../components';

export default function Alllec (){
  
  const [lecturers, setLecData] = useState([]);
  const fetchAllLecturer =async()=>{
    const res = await axios.get("http://localhost:5000/lecturer");
    console.log(res);
    setLecData(res.data);
  };
  

  useEffect(()=>{
    fetchAllLecturer();
  }, []);

    return(

        <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="Page" title="All Lecturers" />
    <hr/>
      <div className="container mt-4">
            <div className="mt-3">
                <NavLink className="btn btn-primary" to="/admin/lecturer/addlec">Add Lecturer</NavLink>
            </div>
        <table class="table mt-3">
          <thead>
            <tr className="table-success">
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              {/* <th scope="col">Password</th> */}
              <th scope="col">Contact Number</th>
              <th scope="col">Module</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {
          lecturers.map((lecturer,i)=>(
            <tr key={lecturer._id}>
              <th scope="row">{i+1}</th>
              <td>{lecturer?.firstName}</td> 
              <td>{lecturer?.lastName}</td>
              <td>{lecturer?.email}</td>
              {/* <td>{lecturer?.password}</td> */}
              <td>{lecturer?.contactNumber}</td>
              <td>{lecturer?.moduleName}</td>
              <td>
                <NavLink className="btn btn-primary me-3" to={`/admin/lecturer/viewlec/${lecturer._id}`} >View</NavLink>
                <NavLink className="btn btn-warning me-3" to={`/admin/lecturer/editlec/${lecturer._id}`}>Edit</NavLink>
                <NavLink className="btn btn-danger me-3" to={`/admin/lecturer/deletelec/${lecturer._id}`}>Delete</NavLink>
              </td>
            </tr>
          ))}
          
          
          
          </tbody>
        </table>
      </div>
      </div>
    </>

    );
;
}