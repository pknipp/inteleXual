import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import bootstrap from 'bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

const Project = ({match}) => {
    const projectId = Number(match.params.id);
    const [files, setFiles] = useState([]);
    const [users, setUsers] = useState([]);
    let history = useHistory();

    const getProject = async () => {
        const response = await fetch(`/api/projects/${projectId}`);
        const {users: newUsers, files: newFiles} = await response.json();
        // setProject(newProject);
        setUsers(newUsers);
        setFiles(newFiles);
    };

    useEffect(() => {
        getProject(projectId);
    }, [projectId]);

    const defaultSorted = [{
        dataField: 'name',
        order: 'asc'
      }];

    const userColumns = [{
      dataField: 'name',
      text: 'Name',
      sort: true
    }, {
      dataField: 'email',
      text: 'Email',
      sort: true,
    }];

    const fileColumns = [{
      dataField: 'name',
      text: 'Name',
      sort: true
    }, {
      dataField: 'file_type',
      text: 'Type',
      sort: true
    }];

    return (
        <>
            <BootstrapTable keyField='id' data={ users } columns={ userColumns } defaultSorted={defaultSorted}/>
            <BootstrapTable keyField='id' data={ files } columns={ fileColumns } defaultSorted={defaultSorted}/>
            <button onClick={() => history.push('/')}>Back to all projects</button>
        </>
    )
};

export default Project;
