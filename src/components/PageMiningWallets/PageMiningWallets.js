import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import AIMiningWalletContainer from './AIMiningWalletContainer';

import MiningWalletFormAdd from './components/MiningWalletFormAdd';
import MiningWalletContainer from './components/MiningWalletContainer';

class PageMiningWallets extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };
    
    static defaultProps = {
    };
    
    constructor() {
        super();
    }
    
    render() {
        return (
            <Fragment>
                <PageHeader>Информация о криптовалютных кошельках</PageHeader>
                <MiningWalletContainer />
                <MiningWalletFormAdd />
                
            </Fragment>
        );
    }
}

function mapStateToProps({ }) {
    return {
    };
}

export default connect(mapStateToProps)(PageMiningWallets);

