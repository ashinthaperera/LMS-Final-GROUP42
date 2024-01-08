import React, {useEffect,useState} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Header } from "../../components";
// import DataTable from "react-data-table-component";


export default function Allmod() {
  
  const [Modules, setModData] = useState([]);
  const fetchAllModules =async()=>{
    const res = await axios.get("http://localhost:5000/module");
    console.log(res);
    setModData(res.data);
  };

  useEffect(()=>{
    fetchAllModules();
  }, []);
  
  // const columns =[
  //   {
  //     name : "ID",
  //     selector : row =>row.id
  //   },
  //   {
  //     name : "Module Code",
  //     selector : row =>row.moduleCode,
  //     sortable : true,
  //   },
  //   {
  //     name : "Module Name",
  //     selector : row =>row.moduleName,
  //     sortable : true,
  //   },
   
  //   {
  //     name : "Action",
  //     selector : row =>row.action
  //   },
    
  // ]

  // const data = Modules.map((Modules,i)=>(
  //     {
  //       id : i+1,
  //       moduleCode : Modules?.moduleCode,
  //       moduleName : Modules?.moduleName,
  //       degreeName : Modules?.degreeName,
  //       firstName: Modules?.firstName,
  //       action : 
  //       [
  //         <NavLink className="btn btn-primary me-3" to={`module/viewmod/${Modules._id}`} >View</NavLink>,
  //         <NavLink className="btn btn-warning me-3" to={`module/editmod/${Modules._id}`}>Edit</NavLink>,
  //         <NavLink className="btn btn-danger me-3" to={`module/deletemod/${Modules._id}`}>Delete</NavLink>
  //         // <NavLink className="btn btn-danger me-3" onClick={()=> handleDelete(student._id)}>Delete</NavLink>
  //       ]
  //     }
  //   ))

    
  // const [records, setRecords] = useState(data);

  // function handleFilter(e){
  //   const searchTerm = e.target.value.toLowerCase();
  //   if (searchTerm === '') {
  //     setRecords(data);
  //   }
  //   else{const newData = data.filter(row =>
  //     row.moduleCode.toLowerCase().includes(searchTerm) ||
  //     row.moduleName.toLowerCase().includes(searchTerm)
  // );
  //      setRecords(newData);
  //   }
  // }
  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="Page" title="All Modules" />
    <hr/>
      <div className="container mt-4">
            <div className="mt-3">
                <NavLink className="btn btn-primary" to="/admin/module/addmod">Add Module</NavLink>
            </div>
        <table class="table mt-3">
          <thead>
            <tr className="table-success">
              <th scope="col">ID</th>
              <th scope="col">Module Code</th>
              <th scope="col">Module Name</th>
              <th scope="col">Degree</th> 
              <th scope="col">Lecturer</th>                 
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {
          Modules.map((Modules,i)=>(
            <tr key={Modules._id}>
              <th scope="row">{i+1}</th>
              <td>{Modules?.moduleCode}</td> 
              <td>{Modules?.moduleName}</td>
              <td>{Modules?.degreeName}</td>
              <td>{Modules?.firstName}</td>
              <td>
                <NavLink className="btn btn-primary me-3" to={`/admin/module/viewmod/${Modules._id}`} >View</NavLink>
                <NavLink className="btn btn-warning me-3" to={`/admin/module/editmod/${Modules._id}`}>Edit</NavLink>
                <NavLink className="btn btn-danger me-3" to={`/admin/module/deletemod/${Modules._id}`}>Delete</NavLink>
                {/* <NavLink className="btn btn-danger me-3" onClick={()=> handleDelete(student._id)}>Delete</NavLink> */}
              </td>
            </tr>
          ))}
          
          
          
          </tbody>
        </table>

        {/* <div className="text-end"><input type="text" onChange={handleFilter}/>
          </div>
        <DataTable
            columns ={columns}
            data ={records}
            fixedHeader
            pagination
            >
        </DataTable> */}
      </div>
      </div>
    </>
  );
}
