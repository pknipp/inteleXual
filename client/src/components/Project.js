import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import bootstrap from 'bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

const Project = ({match}) => {
    const projectId = Number(match.params.id);
    const [project, setProject] = useState({});
    const [files, setFiles] = useState([]);
    const [users, setUsers] = useState([]);
    let history = useHistory();

    const getProject = async () => {
        const response = await fetch(`/api/projects/${projectId}`);
        const {project: newProject, users: newUsers, files: newFiles} = await response.json();
        setProject(newProject);
        setUsers(newUsers);
        setFiles(newFiles);
    };

    useEffect(() => {
        getProject(projectId);
    }, [projectId]);

    const defaultSorted = [{dataField: 'name', order: 'asc'}];

    const userColumns = [
      {dataField: 'name',  text: 'Name',  sort: true},
      {dataField: 'email', text: 'Email', sort: true}
    ];

    const fileColumns = [
      {dataField: 'name', text: 'Name', sort: true},
      {dataField: 'file_type', text: 'Type', sort: true}
    ];

    return (
      <>
        <button onClick={() => history.push('/')}>Back to all projects</button>
        <h3>Details about Project "{project.name}"</h3>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button className="nav-link active" id="nav-users-tab" data-bs-toggle="tab" data-bs-target="#nav-users" type="button"    role="tab" aria-controls="nav-users" aria-selected="true">Users</button>
            <button className="nav-link" id="nav-files-tab" data-bs-toggle="tab" data-bs-target="#nav-files" type="button"role="tab"           aria-controls="nav-files" aria-selected="false">Files</button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-users" role="tabpanel" aria-labelledby="nav-users-tab">
            <BootstrapTable keyField='id' data={ users } columns={ userColumns } defaultSorted={defaultSorted}/>
          </div>
          <div className="tab-pane fade" id="nav-files" role="tabpanel" aria-labelledby="nav-files-tab">
            <BootstrapTable keyField='id' data={ files } columns={ fileColumns } defaultSorted={defaultSorted}/>
          </div>
        </div>
      </>
    )
};

export default Project;
