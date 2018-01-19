import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import { Grid } from 'react-bootstrap';

// Router
import { PageHome, PageMiningPools, PageMiningWallets } from '../../Pages';
import { PageExchangeCurrencys, PageExchangeWithdrawToWallet, PageExchangeWithdrawToExchange } from '../../Pages';
import { PageSystemInfo } from '../../Pages';

class PageSwitch extends Component {
    render() {
        return (
            <Grid>
                <Switch>
                    <Route exact component={PageHome} path='/' />
                    <Route component={PageMiningPools} path='/miningPools' />
                    <Route component={PageMiningWallets} path='/miningWallets' />
                    <Route component={PageExchangeCurrencys} path='/exchangeCurrencys' />
                    <Route component={PageExchangeWithdrawToWallet} path='/exchangeWithdrawToWallet' />
                    <Route component={PageExchangeWithdrawToExchange} path='/exchangeWithdrawToExchange' />
                    <Route component={PageSystemInfo} path='/systemInfo' />
                </Switch>
            </Grid>
        );
    }
}

export default PageSwitch;
