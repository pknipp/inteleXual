import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../auth'


const EditUser = props => {
    const { fetchWithCSRF, currentUser, setCurrentUser } = useContext(AuthContext);
    // const [email, setEmail] = useState(currentUser.email);
    // const [password, setPassword] = useState('');
    // const [password2, setPassword2] = useState('')

    const [errors, setErrors] = useState([]);
    const [messages, setMessages] = useState([]);
    let history = useHistory();


    return (
        <div>Projects go here.</div>
    )
};

export default EditUser;
