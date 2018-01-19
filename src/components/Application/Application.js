import React, { Component, Fragment } from 'react';

import PageNavbar from './components/PageNavbar';
import PageSwitch from './components/PageSwitch';
import PageFooter from './components/PageFooter';
import DataFetcher from './components/DataFetcher';

//  Загрузка стилей
import './Application.css';
import './Application.theme.css';

class Application extends Component {
    render() {
        return (
            <Fragment>
                <PageNavbar/>
                <PageSwitch/>
                <br/>
                <DataFetcher/>
                <PageFooter/>
            </Fragment>
        );
    }
}

export default Application;
