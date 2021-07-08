import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import AuthContext from '../auth'
// import Project from './Project';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const Projects = () => {
    // const { fetchWithCSRF, currentUser, setCurrentUser } = useContext(AuthContext);
    // const [email, setEmail] = useState(currentUser.email);
    // const [password, setPassword] = useState('');
    // const [password2, setPassword2] = useState('')
    // const [errors, setErrors] = useState([]);
    // const [messages, setMessages] = useState([]);
    const [projects, setProjects] = useState([]);
    let history = useHistory();


    const getProjects = async () => {
        const response = await fetch("/api/projects");
        const newProjects = (await response.json()).projects;
        // setErrors(data.errors || []);
        // setMessages(data.messages || []);
        console.log(newProjects);
        newProjects.forEach(project => {
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

    const columns = [{
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'proj_start_date',
      text: 'Start date'
    }, {
      dataField: 'button',
      text: "details"
    }];

    return (
        <>
            Projects will be listed under here.
            <BootstrapTable keyField='id' data={ projects } columns={ columns } />
            {/* <ul>
                {projects.map(project => <Project key={`project${project.id}`} project={project} />)}
            </ul> */}
        </>
    )
};

export default Projects;
