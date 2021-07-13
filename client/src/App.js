import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Projects from './components/Projects';
import Project from './components/Project';


const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Projects} />
            <Route path="/:id" component={Project} />
        </Switch>
    </BrowserRouter>
);

export default App;
