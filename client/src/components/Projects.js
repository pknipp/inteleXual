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
        {dataField: 'name', text: 'Project name', sort: true},
        {dataField: 'proj_start_date', text: 'Start date', sort:true},
        {dataField: 'button', text: ""}
    ];

    const defaultSorted = [{dataField: 'name', order: 'asc'}];

    return (
        <div>
            <h3>Projects:</h3>
            <BootstrapTable keyField='id' data={ projects } columns={ columns } defaultSorted={defaultSorted}/>
        </div>
    )
};

export default Projects;
