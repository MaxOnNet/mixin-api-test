import React, {Component, Fragment} from 'react';

import { Grid, Nav, Navbar, NavItem, NavbarBrand, NavDropdown, MenuItem, Panel, ListGroupItem, ListGroup, Alert} from 'react-bootstrap';
import { Route, Switch, NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

//  Загрузка стилей
import './Application.css';
import './Application.theme.css';

import PagePools from "../PagePools";
import PageWallets from "../PageWallets";
import PageHome from "../PageHome";

class Application extends Component {
    render() {
        return (
            <Fragment>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <LinkContainer to='/'>
                                <img src='/assets/images/logo.png' height='30' width='70' className='d-inline-block align-top' alt='MIXIN' />
                            </LinkContainer>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1} href="#/mining_wallets">Кошельки</NavItem>
                        <NavItem eventKey={2} href="#/mining_pools">Пулы</NavItem>

                        <NavDropdown eventKey={3} title="Биржа" >
                            <MenuItem eventKey={3.1}>Курсы валют</MenuItem>
                            <MenuItem eventKey={3.2}>Вывод средств с биржи на кошелек</MenuItem>
                            <MenuItem eventKey={3.3}>Вывод средств с биржи на биржу</MenuItem>
                        </NavDropdown>

                        <NavDropdown eventKey={4} title="Система">
                            <MenuItem eventKey={4.1}>Состояние</MenuItem>

                        </NavDropdown>
                    </Nav>
                </Navbar>

                <Grid>
                    <Switch>
                        <Route exact component={PageHome} path='/' />
                        <Route component={PagePools} path='/mining_pools' />
                        <Route component={PageWallets} path='/mining_wallets' />
                    </Switch>
                </Grid>

                <br/>

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

            </Fragment>
        );
    }
}


export default Application;
