import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Header } from "../../components";

export default function Deletestud() {
  const { id } = useParams();
  // const {email} = useParams();

  const [student, setStudent] = useState([]);
  // const [user, setUser] = useState([]);
  const fetchStudent = async () => {
    const res = await axios.get(`http://localhost:5000/student/viewstud/${id}`);
    console.log(res);
    setStudent(res.data);
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  // const fetchUser =async()=>{
  //   const res = await axios.get(`http://localhost:5000/deleteUser${email}`);
  //   console.log(res);
  //   setUser(res.data);
  // };

  // useEffect(()=>{
  //   fetchUser();
  // }, []);

  // const handleDelete = async (id) => {
  //   const response = window.confirm("Are you sure you want to delete that?");
  //   try {
  //     if (response === true) {
  //       const res = await axios.delete(
  //         `http://localhost:5000/student/deletestud/${id}`
  //       );

  //       // const res =await axios.delete(`http://localhost:5000/user/deleteUser/${id}`);

  //       console.log(res);
  //       if (res.status === 200) {
  //         alert("Data Updated");
  //         window.location = "/admin/student";
  //       } else {
  //         fetchStudent();
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleDelete = async(id)=>{
    const response = window.confirm("Are you sure you want to delete that?");
    if(response===true){
      const res =await axios.delete(`http://localhost:5000/student/deletestud/${id}`);
      console.log(res);
      if(res.status ===200){
        alert("Data Updated")
        window.location ="/admin/student";
      }
    
    }
    else{
      fetchStudent();
    }
  }

  // const handleuserDelete = async(email)=>{
  //   const response = window.confirm("Are you sure you want to delete that?");
  //     //alert(response);
  //   if(response===true){
  //     const userRes =await axios.delete(`http://localhost:5000/user/deleteUser/${email}`);

  //     console.log(userRes);
  //     if(userRes.status ===200){
  //       alert("Data Updated")
  //       window.location ="/student";
  //     }
  //   }
  //   else{
  //     fetchStudent();
  //   }
  // };

  // const handleButtonClick = async(e)=>{
  //   try {
  //     e.preventDefault();
  //     alert("hi");
  //     await handleDelete(student._id);
  //     //await handleuserDelete(user.email);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Delete Module" />
        <b>
          <h2>Are you sure you want to delete this?</h2>
          <h4>
            Student : {student?.firstName} {student?.lastName}
          </h4>
        </b>
        <hr />
        <div className="container mt-4">
          <br />
          <table>
            <tr>
              <td>First Name</td>
              <td> :&emsp; &emsp;{student?.firstName}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td> :&emsp; &emsp;{student?.lastName}</td>
            </tr>
            <tr>
              <td>Username</td>
              <td> :&emsp; &emsp;{student?.email} </td>
            </tr>
            {/* <tr>
                    <td>Password</td>
                    <td> :&emsp; &emsp;{student?.password} </td>
                </tr> */}
            <tr>
              <td>DOB</td>
              <td> :&emsp; &emsp;{student?.dob}</td>
            </tr>
            <tr>
              <td>Contact Number &emsp;</td>
              <td> :&emsp; &emsp;{student?.contactNumber}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td> :&emsp; &emsp;{student?.address}</td>
            </tr>
            <tr>
              <td>Degree</td>
              <td> :&emsp; &emsp;{student?.degreeName}</td>
            </tr>
          </table>
        </div>
        <br />
        <br />
        <br />
        <NavLink className="btn btn-primary" to="/admin/student">
          Back to List
        </NavLink>
        <NavLink className="btn btn-danger me-3" onClick={()=> handleDelete(student._id)}>
          Delete
        </NavLink>
      </div>
    </>
  );
}
