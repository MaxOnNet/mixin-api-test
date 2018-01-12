import React, { Component, Fragment } from 'react';

import { Grid, Nav, Navbar, NavItem, NavbarBrand, NavDropdown, MenuItem, Panel, ListGroupItem, ListGroup, Alert} from 'react-bootstrap';
import { Route, Switch, NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

//  Загрузка стилей
import './Application.css';
import './Application.theme.css';

import { PageHome, PagePools, PageWallets } from '../Pages';
import { PageExchangeCurrencys, PageExchangeWithdrawToWallet, PageExchangeWithdrawToExchange } from '../Pages';
import { PageSystemInfo } from '../Pages';

class Application extends Component {
    templateNavbar = (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <LinkContainer to='/'>
                        <img src='/assets/images/logo.png' height='50' width='90' className='d-inline-block align-top' alt='MIXIN' />
                    </LinkContainer>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem eventKey={0} href='#/'>Home</NavItem>
                <NavItem eventKey={1} href='#/wallets'>Кошельки</NavItem>
                <NavItem eventKey={2} href='#/pools'>Пулы</NavItem>

                <NavDropdown eventKey={3} title='Биржа' >
                    <MenuItem eventKey={3.1} href='#/exchangeCurrencys' >Курсы валют</MenuItem>
                    <MenuItem eventKey={3.2} href='#/exchangeWithdrawToWallet' >Вывод средств с биржи на кошелек</MenuItem>
                    <MenuItem eventKey={3.3} href='#/exchangeWithdrawToExchange' >Вывод средств с биржи на биржу</MenuItem>
                </NavDropdown>

                <NavDropdown eventKey={4} title='Система'>
                    <MenuItem eventKey={4.1} href='#/systemInfo'>Состояние</MenuItem>
                </NavDropdown>
            </Nav>
            <Nav pullRight>
                <NavItem eventKey={9} href=''>RU</NavItem>
                <NavItem eventKey={10} href=''>EN</NavItem>
            </Nav>
        </Navbar>
    );

    templateSwitch = (
        <Grid>
            <Switch>
                <Route exact component={PageHome} path='/' />
                <Route component={PagePools} path='/pools' />
                <Route component={PageWallets} path='/wallets' />
                <Route component={PageExchangeCurrencys} path='/exchangeCurrencys' />
                <Route component={PageExchangeWithdrawToWallet} path='/exchangeWithdrawToWallet' />
                <Route component={PageExchangeWithdrawToExchange} path='/exchangeWithdrawToExchange' />
                <Route component={PageSystemInfo} path='/systemInfo' />
            </Switch>
        </Grid>
    );

    templateFooter = (
        <Alert bsStyle='info'>
            <strong>Поддержка проекта</strong> <br/>Если у Вас есть желание поддержать проект, запросить новую фишку в ускоренном порядке,
            то ниже представлениы кошельки для перевода:
            <ul>
                <li>41wDjSgoD4LDbquFTr7hi4iGewRqmgzufP9qq2n8wn67EGRH1TgqhTd49xE27YgfRFRdqfVhbcviwTwAA556z6Wb5Jw39fF</li>
                <li>Sumoo6rpczjKFBj6ppiv4iiita5jQn6a7GwqB4Y5vY99Zkty7Fgtj1zT4tdEDonjjrjkAHAEbgwpDSZUHSEqdxirSGyFWskuFbu</li>
                <li>etnk7PcfLJsJYRv8cDC5wpattBvUHKohVgsXgcPJpL5cZ9gHNnE5RP2CWc34ZFcEC2U3R4DLCZDEy1M8F7MAyNZd6VJgvkn1YC</li>
            </ul>
            По всем вопросам обращаться к Татарникову Виктору [ viktor@tatarnikov.org ]
        </Alert>
    );

    render() {
        return (
            <Fragment>
                {this.templateNavbar}
                {this.templateSwitch}
                <br/>
                {this.templateFooter}
            </Fragment>
        );
    }
}


export default Application;
