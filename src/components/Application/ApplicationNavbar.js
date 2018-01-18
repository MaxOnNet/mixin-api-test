/* eslint-disable max-len */
import React, { Component } from 'react';

import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class ApplicationNavbar extends Component {
    render() {
        return (
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
                    <NavItem eventKey={1} href='#/miningWallets'>Кошельки</NavItem>
                    <NavItem eventKey={2} href='#/miningPools'>Пулы</NavItem>
            
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
    }
}

export default ApplicationNavbar;
