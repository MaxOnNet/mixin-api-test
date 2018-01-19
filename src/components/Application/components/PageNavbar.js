/* eslint-disable max-len */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { changeLanguage } from '../../../redux/actions/ActionsMUI';

class PageNavbar extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        
        // MUI
        MUILanguage: PropTypes.string.isRequired
    };
    
    static defaultProps = {
        MUILanguage: 'ru'
    };
    
    componentWillMount() {
        this.setLanguage(this.props.MUILanguage);
    }
    
    setLanguage(language) {
        const { dispatch } = this.props;
        
        i18next.init({
            lng: language,
            resources: require(`./PageNavbar.mui.${language}.json`)
        });
    
        dispatch(changeLanguage(language));
    }
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
                    <NavItem eventKey={0} href='#/'>{i18next.t('pageHome')}</NavItem>
                    <NavItem eventKey={1} href='#/miningWallets'>{i18next.t('pageWallets')}</NavItem>
                    <NavItem eventKey={2} href='#/miningPools'>{i18next.t('pagePools')}</NavItem>
            
                    <NavDropdown eventKey={3} title={i18next.t('pageExchanges')} >
                        <MenuItem eventKey={3.1} href='#/exchangeCurrencys' >{i18next.t('pageExchangesCurrencys')}</MenuItem>
                        <MenuItem eventKey={3.2} href='#/exchangeWithdrawToWallet' >Вывод средств с биржи на кошелек</MenuItem>
                        <MenuItem eventKey={3.3} href='#/exchangeWithdrawToExchange' >Вывод средств с биржи на биржу</MenuItem>
                    </NavDropdown>
            
                    <NavDropdown eventKey={4} title={i18next.t('pageSystem')}>
                        <MenuItem eventKey={4.1} href='#/systemInfo'>{i18next.t('pageSystemCurrentInformation')}</MenuItem>
                    </NavDropdown>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={9} onClick={this.setLanguage.bind(this, 'ru')}>RU</NavItem>
                    <NavItem eventKey={10} onClick={this.setLanguage.bind(this, 'en')}>EN</NavItem>
                </Nav>
            </Navbar>
        );
    }
}

function mapStateToProps({ MUI }) {
    return {
        MUILanguage: MUI.language
    };
}
export default connect(mapStateToProps)(PageNavbar);
