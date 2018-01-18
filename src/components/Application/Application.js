import React, { Component, Fragment } from 'react';

import ApplicationNavbar from './ApplicationNavbar';
import ApplicationSwitch from './ApplicationSwitch';
import ApplicationFooter from './ApplicationFooter';
import ApplicationFetcher from './ApplicationFetcher';

//  Загрузка стилей
import './Application.css';
import './Application.theme.css';

class Application extends Component {
    render() {
        return (
            <Fragment>
                <ApplicationNavbar/>
                <ApplicationSwitch/>
                <br/>
                <ApplicationFetcher/>
                <ApplicationFooter/>
            </Fragment>
        );
    }
}

export default Application;
