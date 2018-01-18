import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import { fetchMiningPoolGroupIfNeeded } from '../../redux/actions/ActionsMiningPoolGroup';
import { fetchMiningPoolDataIfNeeded, fetchMiningPoolData } from '../../redux/actions/ActionsMiningPoolData';
import { fetchMiningPoolIfNeeded } from '../../redux/actions/ActionsMiningPool';

import Formatting from '../../utils/Formatting';

//  Загрузка стилей
import './PageMiningPools.css';

class PageMiningPools extends Component {
    static propTypes = {
        miningPoolGroupIsFetching: PropTypes.bool.isRequired,
        miningPoolGroupItems: PropTypes.array.isRequired,
        miningPoolGroupLastUpdated: PropTypes.number,

        miningPoolIsFetching: PropTypes.bool.isRequired,
        miningPoolItems: PropTypes.array.isRequired,
        miningPoolLastUpdated: PropTypes.number,

        miningPoolDataIsFetching: PropTypes.bool.isRequired,
        miningPoolDataItems: PropTypes.array.isRequired,
        miningPoolDataLastUpdated: PropTypes.number,

        dispatch: PropTypes.func.isRequired,
        filterId: PropTypes.number
    };

    static defaultProps = {
        miningPoolGroupIsFetching: true,
        miningPoolGroupItems: [],

        miningPoolIsFetching: true,
        miningPoolItems: [],

        miningPoolDataIsFetching: true,
        miningPoolDataItems: [],

        filterId: null
    };

    constructor() {
        super();

        this.state = {
            isLoaded: false
        };
    }

    componentDidMount() {
        const { dispatch, filterId } = this.props;

        dispatch(fetchMiningPoolGroupIfNeeded());
        dispatch(fetchMiningPoolIfNeeded(null, filterId));
        dispatch(fetchMiningPoolDataIfNeeded(null, filterId));

        this.timerRefreshData = setInterval(this.componentRefresh.bind(this), 10000);
        this.timerRefreshAWait = setInterval(this.componentRefreshAWait.bind(this), 1000);
    }

    shouldComponentUpdate() {
        const { miningPoolDataItems, miningPoolDataIsFetching } = this.props;

        if (miningPoolDataItems.length && !miningPoolDataIsFetching) {
            return false;
        }
        return true;
    }

    componentWillUnmount() {
        clearInterval(this.timerRefreshData);
        clearInterval(this.timerRefreshAWait);
    }

    componentRefresh() {
        const { dispatch, filterId } = this.props;

        dispatch(fetchMiningPoolData(null, filterId));
    }

    componentRefreshAWait() {
        const { dispatch, filterId } = this.props;

       // dispatch(updateMiningPoolData(null, filterId));
    }

    findMiningPoolData(poolId) {
        const { miningPoolDataIsFetching, miningPoolDataItems } = this.props;

        if (miningPoolDataItems && !miningPoolDataIsFetching) {
            for (let poolIndex = 0; poolIndex < miningPoolDataItems.length; poolIndex++) {
                if (miningPoolDataItems[poolIndex].pool_id === poolId) {
                    return miningPoolDataItems[poolIndex];
                }
            }
        }
        return null;
    }

    renderMiningPool(pool) {
        const { miningPoolDataIsFetching, miningPoolDataItems, filterId } = this.props;

        const poolData = this.findMiningPoolData(pool.pool_id);

        if (filterId) {
            if (pool.group_id !== filterId) {
                return (<Fragment/>);
            }
        }

        if (miningPoolDataItems && !miningPoolDataIsFetching && poolData) {
            return (
                <tr className='clsBodyRow'>
                    <td className='clsBodyRowId'>{pool.pool_id}</td>
                    <td className='clsBodyRowPoolName'>
                        <a href={pool.pool_web_url} target='_new'>{pool.pool_label}</a>
                    </td>
                    <td className='clsBodyRowPoolCurrency'>{pool.pool_currency}</td>
                    <td className='clsBodyRowPoolFee'>{poolData.pool_fee} %</td>
                    <td className='clsBodyRowNetworkReward'>
                        {Formatting.number_format(poolData.network_reward, 4, ',', ' ')}
                    </td>
                    <td className='clsBodyRowNetworkDifficulty'>
                        {Formatting.number_format(poolData.network_difficulty, 0, ',', ' ')}
                    </td>
                    <td className='clsBodyRowNetworkHashRate'>{poolData.network_hashrate_str}</td>

                    <td className='clsBodyRowPoolHashrate'>{poolData.pool_hashrate_str}</td>
                    <td className='clsBodyRowPoolMiners'>{poolData.pool_miners}</td>
                    <td className='clsBodyRowPoolCurrblockEffort'>{poolData.pool_currblock_effort} %</td>
                    <td className='clsBodyRowAWait'>{poolData.date_await}</td>
                </tr>
            );
        }

        if (miningPoolDataIsFetching) {
            return (
                <tr className='clsBodyRow'>
                    <td className='clsBodyRowId'>{pool.pool_id}</td>
                    <td className='clsBodyRowPoolName'>
                        <a href={pool.pool_web_url} target='_new'>{pool.pool_label}</a>
                    </td>
                    <td className='clsBodyRowPoolCurrency'>{pool.pool_currency}</td>
                    <td colSpan='8' className='clsBodyRowWaitMessadge'>Загрузка данных о пула...</td>
                </tr>
            );
        }

        return (
            <tr className='clsBodyRow'>
                <td className='clsBodyRowId'>{pool.pool_id}</td>
                <td className='clsBodyRowPoolName'>
                    <a href={pool.pool_web_url} target='_new'>{pool.pool_label}</a>
                </td>
                <td className='clsBodyRowPoolCurrency'>{pool.pool_currency}</td>
                <td colSpan='8' className='clsBodyRowErrorMessadge'>Нет данных о пуле.</td>
            </tr>
        );
    }

    renderMiningPools(groupId, groupLabel) {
        const { miningPoolIsFetching, miningPoolItems } = this.props;

        let aiMiningPools = (<p>Загрузка данных...</p>);

        if (!miningPoolIsFetching) {
            if (miningPoolItems.length) {
                aiMiningPools = miningPoolItems.map((aiMiningPool) => {
                    if (groupId === aiMiningPool.group_id) {
                        return (this.renderMiningPool(aiMiningPool));
                    }

                    return (<Fragment/>);
                });
            } else {
                return (
                    <tr className='clsBodyRowPoolGroup'>
                        <td className='clsBodyRowId'>-/-</td>
                        <td colSpan='10' className='clsBodyRowPoolGroupLabel'>{groupLabel} : Нет данных о группе пулов.</td>
                    </tr>
                );
            }
        } else {
            return (
                <tr className='clsBodyRowPoolGroup'>
                    <td className='clsBodyRowId'>-/-</td>
                    <td colSpan='10' className='clsBodyRowPoolGroupLabel'>{groupLabel} : Загрузка данных...</td>
                </tr>
            );
        }
        return (
            <Fragment>
                <tr className='clsBodyRowPoolGroup'>
                    <td className='clsBodyRowId'>-/-</td>
                    <td colSpan='10' className='clsBodyRowPoolGroupLabel'>{groupLabel}</td>
                </tr>
                {aiMiningPools}
            </Fragment>
        );
    }

    renderMiningPoolGroups() {
        const { miningPoolGroupIsFetching, miningPoolGroupItems, filterId } = this.props;

        if (!miningPoolGroupIsFetching) {
            if (miningPoolGroupItems.length) {
                return miningPoolGroupItems.map((aiMiningPoolGroup) => {
                    if (!filterId || (filterId && aiMiningPoolGroup.group_id !== filterId)) {
                        return (this.renderMiningPools(aiMiningPoolGroup.group_id, aiMiningPoolGroup.group_label));
                    }

                    return (<Fragment/>);
                });
            }

            return (<tr><td colSpan='11'>Нет данных</td></tr>);
        }

        return (<tr><td colSpan='11' className='clsBodyRowPoolGroupWait'>Загрузка данных</td></tr>);
    }

    render() {
        const aiMiningPoolGroups = this.renderMiningPoolGroups();

        return (
            <Fragment>
                <PageHeader>Информация о криптовалютных пулах</PageHeader>
                <table className='clsTableParent' cellPadding='0' cellSpacing='0'>
                    <tbody>
                        <tr>
                            <td className='clsTableParentBody' >
                                <table className='clsTable' cellPadding='0' cellSpacing='1'>
                                    <tbody>
                                        {aiMiningPoolGroups}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

function mapStateToProps({ miningPoolGroup, miningPool, miningPoolData }) {
    const miningPoolGroupIsFetching = miningPoolGroup.isFetching;
    const miningPoolGroupItems = miningPoolGroup.items;
    const miningPoolGroupLastUpdated = miningPoolGroup.lastUpdated;

    const miningPoolIsFetching = miningPool.isFetching;
    const miningPoolItems = miningPool.items;
    const miningPoolLastUpdated = miningPool.lastUpdated;

    const miningPoolDataIsFetching = miningPoolData.isFetching;
    const miningPoolDataItems = miningPoolData.items;
    const miningPoolDataLastUpdated = miningPoolData.lastUpdated;

    return {
        miningPoolGroupIsFetching,
        miningPoolGroupItems,
        miningPoolGroupLastUpdated,

        miningPoolIsFetching,
        miningPoolItems,
        miningPoolLastUpdated,

        miningPoolDataIsFetching,
        miningPoolDataItems,
        miningPoolDataLastUpdated
    };
}

export default connect(mapStateToProps)(PageMiningPools);