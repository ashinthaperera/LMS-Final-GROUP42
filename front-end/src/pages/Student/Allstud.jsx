import React, {useEffect,useState} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Header } from "../../components";


export default function Allstud() {


  
  const [students, setStudData] = useState([]);
  const fetchAllStudent =async()=>{
    const res = await axios.get("http://localhost:5000/student");
    console.log(res);
    setStudData(res.data);
  }
  

  useEffect(()=>{

    fetchAllStudent();
  }, []);

  return (
    <>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="Page" title="All Students" />
    <hr/>
      <div className="container mt-4">
            <div className="mt-3">
                <NavLink className="btn btn-primary" to="/admin/student/addstud">Add Student</NavLink>
            </div>
        <table class="table mt-3">
          <thead>
            <tr className="table-success">
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              {/* <th scope="col">Password</th> */}
              <th scope="col">DOB</th>
              <th scope="col">Contact Number</th>
              <th scope="col">Address</th>
              <th scope="col">Degree</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {
          students.map((student,i)=>(
            <tr key={student._id}>
              <th scope="row">{i+1}</th>
              <td>{student?.firstName}</td> 
              <td>{student?.lastName}</td>
              <td>{student?.email}</td>
              {/* <td>{student?.password}</td> */}
              <td>{student?.dob}</td>
              <td>{student?.contactNumber}</td>
              <td>{student?.address}</td>
              <td>{student?.degreeName}</td>
              <td>
                <NavLink className="btn btn-primary me-3" to={`/admin/student/viewstud/${student._id}`} >View</NavLink>
                <NavLink className="btn btn-warning me-3" to={`/admin/student/editstud/${student._id}`}>Edit</NavLink>
                <NavLink className="btn btn-danger me-3" to={`/admin/student/deletestud/${student._id}`}>Delete</NavLink>
              </td>
            </tr>
          ))}
          
          
          
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
};
