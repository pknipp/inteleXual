import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import bootstrap from 'bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    let history = useHistory();
    const getProjects = async () => {
        const response = await fetch("/api/projects");
        const newProjects = (await response.json()).projects;
        newProjects.forEach(project => {
            project.proj_start_date = new Date(project.proj_start_date).toISOString().slice(0,10);
            project.button = (
                <button onClick={() => history.push(`/${project.id}`)}>
                    See details.
                </button>
            );
        })
        setProjects(newProjects || []);
    };

    useEffect(() => {
        getProjects();
    }, []);

    const columns = [
        {dataField: 'name', text: 'Name', sort: true},
        {dataField: 'proj_start_date', text: 'Start date', sort:true},
        {dataField: 'button', text: ""
    }];

    return (
        <div>
            Projects:
            <BootstrapTable keyField='id' data={ projects } columns={ columns } />
        </div>
    )
};

export default Projects;
