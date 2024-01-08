import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Header } from '../../components';
import { NavLink } from 'react-router-dom';
// import { selectUser } from "../redux/user/userSlice";


const ModSubmissionView = () => {
    const [lecMaterials, setLecMaterials] = useState([]);

    
    useEffect(() => {
        getMaterials();
    }, []);

    const getMaterials = async () => {
        try {
            const file = await axios.get("http://localhost:5000/modulesub/get-modSubfiles");
            setLecMaterials(file.data.data);
        } catch(error) {
            console.error('Error fetching materials: ', error);
        }
    };

    const ViewLecMaterials = (pdf) => {
        window.open(`http://localhost:5000/modSubfiles/${pdf}`, "_blank", "noreferrer");
    };
  return (

    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="Page" title="All Module Courseworks" />
    <hr/>
      <div className="container mt-4">
            <div className="mt-3">
                <NavLink className="btn btn-secondary btn-sm" to="/student/dashboard">Home</NavLink>
            </div>
            <br/>
            <div className="row">
                {lecMaterials.map((lecMaterial) => (
                    <div key={lecMaterial._id} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title"><b>Title : <u>{lecMaterial.title}</u></b></div>
                                <div className="card-title">Description : {lecMaterial.description}</div>
                                <button 
                                    className="btn btn-primary me-2"
                                    onClick={() => ViewLecMaterials(lecMaterial.pdf)}
                                    >
                                        View
                                    </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
  )
}

export default ModSubmissionView