import React, {useEffect,useState} from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { Header } from "../../components";

export default function Viewmod() {
  const {id} = useParams();
  const [module, setModData] = useState([]);
  const fetchModule =async()=>{
    try {
      const res = await axios.get(`http://localhost:5000/module/viewmod/${id}`);
      console.log(res);
      setModData(res.data);
  } catch (error) {
      console.error("Error fetching module:", error);
  }
};

  useEffect(()=>{
    fetchModule();
  }, []);

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="View Module Details" />
    <hr/>
    <br/>
    <NavLink className="btn btn-primary" to="/admin/module/">Home</NavLink>
      <div className="container mt-4">
            <ul class="list-group">
              <li class="list-group-item active" aria-current="true">Module Details : {module?.moduleName}</li>
              <li class="list-group-item">Module Code : {module?.moduleCode}</li>
              <li class="list-group-item">Module Name : {module?.moduleName}</li>
              <li class="list-group-item">Degree Name : {module?.degreeName}</li>
              <li class="list-group-item">Lecturer Name : {module?.firstName}</li>
            </ul>
          </div>
        </div>
    </>
  );
}
