import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
// import { useHistory } from 'react-router-dom';
// import AuthContext from '../auth'

const Project = ({match}) => {
    const projectId = Number(match.params.id);
    const [project, setProject] = useState({});
    const [files, setFiles] = useState([]);
    const [users, setUsers] = useState([]);
    // const { fetchWithCSRF, currentUser, setCurrentUser } = useContext(AuthContext);
    // const [email, setEmail] = useState(currentUser.email);
    // const [password, setPassword] = useState('');
    // const [password2, setPassword2] = useState('')
    // const [errors, setErrors] = useState([]);
    // const [messages, setMessages] = useState([]);
    // const [projects, setProjects] = useState([]);
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
    }, []);

    const userColumns = [{
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'email',
      text: 'Email'
    }];

    const fileColumns = [{
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'file_type',
      text: 'Type'
    }];

    return (
        <>
            <BootstrapTable keyField='id' data={ users } columns={ userColumns } />
            <BootstrapTable keyField='id' data={ files } columns={ fileColumns } />
            <button onClick={() => history.push('/')}>Back to all projects</button>
        </>
    )
};

export default Project;
