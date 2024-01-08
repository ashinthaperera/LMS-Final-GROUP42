import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Header } from '../../components';

export default function Deletemod (){
  const {id} = useParams()
  
  const [module, setModData] = useState([]);
  const fetchModule =async()=>{
    const res = await axios.get(`http://localhost:5000/module/viewmod/${id}`);
    console.log(res);
    setModData(res.data);
  };

  useEffect(()=>{
    fetchModule();
  }, []);


  const handleDelete = async(id)=>{
    const response = window.confirm("Are you sure you want to delete that?");
    
    if(response===true){
      const res =await axios.delete(`http://localhost:5000/module/deletemod/${id}`);

      console.log(res);
      if(res.status ===200){
        alert("Data Updated")
        window.location ="/admin/module";
      }
    }
    else{
      fetchModule();
    }
  }

    return(

        <>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Delete Module" />
        <b>
          <h2>Are you sure you want to delete this?</h2>
            <h4>Module : {module?.moduleName}</h4>
          </b>
    <hr/>
      <div className="container mt-4">
            
            <br/>
            <table>
                <tr>
                    <td>Module Code &emsp; &emsp;</td>
                    <td> :&emsp; &emsp;{module?.moduleCode}</td>
                </tr>
                <tr>
                    <td>Module Name</td>
                    <td> :&emsp; &emsp;{module?.moduleName} </td>
                </tr>
                <tr>
                    <td>Degree</td>
                    <td> :&emsp; &emsp;{module?.degreeName} </td>
                </tr>
                <tr>
                    <td>Lecturer</td>
                    <td> :&emsp; &emsp;{module?.firstName} </td>
                </tr>
                
            </table>
            <br/>
            <br/>
            <br/>
            <NavLink className="btn btn-primary" to="/admin/module">Back to List</NavLink>
            <NavLink className="btn btn-danger me-3" onClick={()=> handleDelete(module._id)}>Delete</NavLink>
            </div>
        </div>
        </>

    );

};