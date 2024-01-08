import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Header } from '../../components';
import { NavLink } from 'react-router-dom';

const LecMaterialView = () => {
    const [lecMaterials, setLecMaterials] = useState([]);

    useEffect(() => {
        getMaterials();
    }, []);

    const getMaterials = async () => {
        try {
            const file = await axios.get("http://localhost:5000/get-files");
            setLecMaterials(file.data.data);
        } catch(error) {
            console.error('Error fetching materials: ', error);
        }
    };

    const ViewLecMaterials = (pdf) => {
        window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
    };

    return(
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="Page" title="All Lecture Materials" />
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
                                <div className="card-title">{lecMaterial.title}</div>
                                <div className="card-title">{lecMaterial.description}</div>
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
    );
};

export default LecMaterialView;