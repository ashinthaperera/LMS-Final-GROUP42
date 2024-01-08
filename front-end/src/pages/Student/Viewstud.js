import React, {useEffect,useState} from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { Header } from "../../components";

export default function Viewstud() {
  const {id} = useParams();
  const [student, setStudentData] = useState([]);
  const fetchStudent =async()=>{
    try {
      const res = await axios.get(`http://localhost:5000/student/viewstud/${id}`);
      console.log(res);
      setStudentData(res.data);
  } catch (error) {
      console.error("Error fetching student:", error);
  }
};
    

  useEffect(()=>{
    fetchStudent();
  }, []);

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="View Student Details" />
    <hr/>
    <br/>
    <NavLink className="btn btn-primary" to="/admin/student/">Home</NavLink>
      <div className="container mt-4">
            <ul class="list-group">
              <li class="list-group-item active" aria-current="true">Student Details : {student?.firstName} {student?.lastName}</li>
              <li class="list-group-item">First Name : {student?.firstName}</li>
              <li class="list-group-item">Last Name : {student?.lastName}</li>
              <li class="list-group-item">Email : {student?.email}</li>
              {/* <li class="list-group-item">{student?.password}</li> */}
              <li class="list-group-item">D.O.B : {student?.dob}</li>
              <li class="list-group-item">Contact Number : {student?.contactNumber}</li>
              <li class="list-group-item">Address : {student?.address}</li>
              <li class="list-group-item">Degree Name : {student?.degreeName}</li>
            </ul>
          </div>
        </div>
    </>
  );
};
