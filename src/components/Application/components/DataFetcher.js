/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { fetchMiningPoolGroup } from '../../../redux/actions/ActionsMiningPoolGroup';
import { fetchMiningPoolData, updateMiningPoolDataAWait } from '../../../redux/actions/ActionsMiningPoolData';
import { fetchMiningPool } from '../../../redux/actions/ActionsMiningPool';
import { connect } from 'react-redux';


class DataFetcher extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,

        // Используемые в приложении фильтры данных
        filterMiningPoolGroupArray: PropTypes.array.isRequired,
        filterMiningPoolArray: PropTypes.array.isRequired,
        filterMiningWalletArray: PropTypes.array.isRequired,
        timeoutRefreshData: PropTypes.number.isRequired,
        timeoutRefreshAWait: PropTypes.number.isRequired
    };
    
    static defaultProps = {
        filterMiningPoolGroupArray: [],
        filterMiningPoolArray: [],
        filterMiningWalletArray: [],
        
        timeoutRefreshData: 10000,
        timeoutRefreshAWait: 3000
    };
    
    componentDidMount() {
        const { dispatch, filterMiningPoolGroupArray, filterMiningPoolArray } = this.props;
        const { timeoutRefreshData, timeoutRefreshAWait } = this.props;
        
        // Загружаем данные
        dispatch(fetchMiningPoolGroup(filterMiningPoolGroupArray));
        dispatch(fetchMiningPool(filterMiningPoolArray, filterMiningPoolGroupArray));
        dispatch(fetchMiningPoolData(filterMiningPoolArray, filterMiningPoolGroupArray));
        
        // Запускаем таймеры автообновления
        this.timerRefreshData = setInterval(this.reduxRefreshData.bind(this), timeoutRefreshData);
        this.timerRefreshAWait = setInterval(this.reduxRefreshAWait.bind(this), timeoutRefreshAWait);
    }
    
    componentWillUnmount() {
        // Отключаем автообновление
        clearInterval(this.timerRefreshData);
        clearInterval(this.timerRefreshAWait);
    }
    
    reduxRefreshData() {
        const { dispatch, filterMiningPoolArray, filterMiningPoolGroupArray } = this.props;
        
        dispatch(fetchMiningPoolData(filterMiningPoolArray, filterMiningPoolGroupArray));
    }
    
    reduxRefreshAWait() {
        const { dispatch } = this.props;
        
        dispatch(updateMiningPoolDataAWait());
    }
    
    render() {
        return (
            <br/>
        );
    }
}

function mapStateToProps({ dispatch }) {
    return {
        dispatch
    };
}

export default connect(mapStateToProps)(DataFetcher);
