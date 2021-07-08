import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../auth'

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
        setProjects(newProjects || []);
    };

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <>
        Projects will be listed under here.
        {projects.map(project => (
            "Project"
        ))}
        </>
    )
};

export default Projects;
