import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Header } from '../../components';

export default function Viewlec (){
  const {id} = useParams();
  const [lecturer, setLecData] = useState([]);
  const fetchLecturer =async()=>{
    try {
      const res = await axios.get(`http://localhost:5000/lecturer/viewlec/${id}`);
      console.log(res);
      setLecData(res.data);
  } catch (error) {
      console.error("Error fetching lecturer:", error);
  }
};

  useEffect(()=>{
    fetchLecturer();
  }, []);

  return(
      <>
      
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="View Lecturer Details" />
    <hr/>
    <br/>
    <NavLink className="btn btn-primary" to="/admin/lecturer/">Home</NavLink>
      <div className="container mt-4">
             
            <ul class="list-group">
              <li class="list-group-item active" aria-current="true">Lecturer Details : {lecturer?.firstName} {lecturer?.lastName}</li>
              <li class="list-group-item">FirstName : {lecturer?.firstName}</li>
              <li class="list-group-item">LastName : {lecturer?.lastName}</li>
              <li class="list-group-item">Email : {lecturer?.email}</li>
              {/* <li class="list-group-item">{lecturer?.password}</li> */}
              <li class="list-group-item">Contact Number : {lecturer?.contactNumber}</li>
              <li class="list-group-item">Module Name : {lecturer?.moduleName}</li>
            </ul>
          </div>
        </div>
 
    </>

  );

};