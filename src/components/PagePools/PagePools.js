import React, { Component } from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';

import AIMiningPoolGroupContainer from './AIMiningPoolGroupContainer';


class PagePools extends Component {
    render() {
        return (
            <div>
                <PageHeader>Информация о криптовалютных пулах</PageHeader>
                <AIMiningPoolGroupContainer />
            </div>
        );
    }
}

export default PagePools;
