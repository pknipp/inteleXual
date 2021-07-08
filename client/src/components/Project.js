import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
// import AuthContext from '../auth'

const Project = ({match}) => {
    const userKeys = ['name', 'email'];
    const fileKeys = ['name', 'file_type'];
    const projectId = Number(match.params.id);
    const [project, setProject] = useState({});
    const [files, setFiles] = useState([]);
    const [users, setUsers] = useState([]);
    const [sortUsersByName, setSortUsersByName] = useState(true);
    const [ascendingUsers, setAscendingUsers] = useState(true);
    const [sortFilesByKey, setSortFilesByKey] = useState(0);
    const [ascendingFiles, setAscendingFiles] = useState(true);
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

    const sortUsers = () => {
        users.sort((a, b) => (
            sortUsersByName ?
                (a.name > b.name ? -1 : a.name === b.name ? 0 : 1)
            :
                (a.email > b.email ? 1 : a.email === b.email ? 0 : -1)
        ));
    }

    useEffect(sortUsers, [sortUsersByName, ascendingUsers]);

    const userNameButton = (
        <button onClick={() => setSortUsersByName(!sortUsersByName)}>Name</button>
    )

    const defaultSorted = [{
        dataField: 'name',
        order: 'asc'
      }];

    const userColumns = [{
      dataField: 'name',
      text: 'Name', //userNameButton,
      sort: true
    }, {
      dataField: 'email',
      text: 'Email',
      sort: true
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
            <BootstrapTable keyField='id' data={ users } columns={ userColumns } />
            <BootstrapTable keyField='id' data={ files } columns={ fileColumns } />
            <button onClick={() => history.push('/')}>Back to all projects</button>
        </>
    )
};

export default Project;
