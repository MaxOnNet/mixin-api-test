import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { connect } from 'react-redux';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Formatting from '../../utils/Formatting';

//  Загрузка стилей
import './PageMiningPools.css';


class PageMiningPools extends Component {
    static propTypes = {
        miningPoolGroupIsFetching: PropTypes.bool.isRequired,
        miningPoolGroupItems: PropTypes.array.isRequired,

        miningPoolIsFetching: PropTypes.bool.isRequired,
        miningPoolItems: PropTypes.array.isRequired,

        miningPoolDataIsFetching: PropTypes.bool.isRequired,
        miningPoolDataItems: PropTypes.array.isRequired,
        
        MUILanguage: PropTypes.string.isRequired,
        
        dispatch: PropTypes.func.isRequired
    };

    static defaultProps = {
        miningPoolGroupIsFetching: true,
        miningPoolGroupItems: [],

        miningPoolIsFetching: true,
        miningPoolItems: [],

        miningPoolDataIsFetching: true,
        miningPoolDataItems: [],
    
        MUILanguage: 'ru'
    };

    constructor() {
        super();
    }
    
    componentWillMount() {
        this.componentLoadLanguage();
    }
    
    shouldComponentUpdate() {
        const { miningPoolDataIsFetching } = this.props;
        
        if (miningPoolDataIsFetching) {
            return false;
        }
        
        return true;
    }
    
    componentWillUpdate() {
        this.componentLoadLanguage();
    }
    
    componentLoadLanguage() {
        const { MUILanguage } = this.props;
    
        i18next.init({
            lng: MUILanguage,
            resources: require(`./PageMiningPools.mui.${MUILanguage}.json`)
        });
    }
    
    findMiningPoolData(poolId) {
        const { miningPoolDataItems } = this.props;

        if (miningPoolDataItems.length) {
            for (let poolIndex = 0; poolIndex < miningPoolDataItems.length; poolIndex++) {
                if (miningPoolDataItems[poolIndex].pool_id === poolId) {
                    return miningPoolDataItems[poolIndex];
                }
            }
        }

        return null;
    }

    renderMiningPool(pool) {
        const { miningPoolDataIsFetching, miningPoolDataItems } = this.props;

        const poolData = this.findMiningPoolData(pool.pool_id);

        if (miningPoolDataItems && poolData) {
            return (
                <tr className='clsBodyRow'>
                    <td className='clsBodyRowId'>{pool.pool_id}</td>
                    <td className='clsBodyRowPoolName'>
                        <a href={pool.pool_web_url} target='_new'>{pool.pool_label}</a>
                    </td>
                    <td className='clsBodyRowPoolCurrency'>{pool.pool_currency}</td>
                    <td className='clsBodyRowPoolFee'>{poolData.pool_fee} %</td>
                    <td className='clsBodyRowNetworkReward'>
                        {Formatting.numberFormat(poolData.network_reward, 4, ',', ' ')}
                    </td>
                    <td className='clsBodyRowNetworkHeight'>
                        {Formatting.numberFormat(poolData.network_height, 0, ',', ' ')}
                    </td>
                    <td className='clsBodyRowNetworkDifficulty'>
                        {Formatting.numberFormat(poolData.network_difficulty, 0, ',', ' ')}
                    </td>
                    <td className='clsBodyRowNetworkHashrate'>{poolData.network_hashrate_str}</td>

                    <td className='clsBodyRowPoolHashrate'>{poolData.pool_hashrate_str}</td>
                    <td className='clsBodyRowPoolMiners'>
                        {Formatting.numberFormat(poolData.pool_miners, 0, ',', ' ')}
                    </td>
                    <td className='clsBodyRowMeHashrate'>n/a</td>
                    <td className='clsBodyRowPoolCurrblockDuration'>
                        {Formatting.durationFormat(poolData.pool_lastblock_time)}
                    </td>
                    <td className='clsBodyRowPoolCurrblockEffort'>
                        {Formatting.numberFormat(poolData.pool_currblock_effort, 2, ',', ' ')} %
                    </td>
                    <td className='clsBodyRowAWait'>
                        {Formatting.numberFormat(poolData.date_await, 0, ',', ' ')}
                    </td>
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
                    <td colSpan='11' className='clsBodyRowWaitMessadge'>Загрузка данных...</td>
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
                <td colSpan='11' className='clsBodyRowErrorMessadge'>Нет данных.</td>
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
                        <td colSpan='15' className='clsBodyRowPoolGroupLabel'>{groupLabel} : Нет данных о группе пулов.</td>
                    </tr>
                );
            }
        } else {
            return (
                <tr className='clsBodyRowPoolGroup'>
                    <td className='clsBodyRowId'>-/-</td>
                    <td colSpan='15' className='clsBodyRowPoolGroupLabel'>{groupLabel} : Загрузка данных...</td>
                </tr>
            );
        }
        return (
            <Fragment>
                <tr className='clsBodyRowPoolGroup'>
                    <td className='clsBodyRowId'>-/-</td>
                    <td colSpan='13' className='clsBodyRowPoolGroupLabel'>{groupLabel}</td>
                </tr>
                {aiMiningPools}
            </Fragment>
        );
    }

    renderMiningPoolGroups() {
        const { miningPoolGroupIsFetching, miningPoolGroupItems } = this.props;

        if (!miningPoolGroupIsFetching) {
            if (miningPoolGroupItems.length) {
                return miningPoolGroupItems.map((aiMiningPoolGroup) => {
                    return (this.renderMiningPools(aiMiningPoolGroup.group_id, aiMiningPoolGroup.group_label));
                });
            }

            return (<tr><td colSpan='14'>Нет данных</td></tr>);
        }

        return (<tr><td colSpan='14' className='clsBodyRowPoolGroupWait'>Загрузка данных</td></tr>);
    }
    
    render() {
        const aiMiningPoolGroups = this.renderMiningPoolGroups();

        return (
            <Fragment>
                <PageHeader>{i18next.t('pageTitle')}</PageHeader>
                <table className='clsTableParent' cellPadding='0' cellSpacing='1'>
                    <tbody>
                        <tr>
                            <td className='clsTableParentBody' >
                                <table className='clsTable' cellPadding='0' cellSpacing='1'>
                                    <thead>
                                        <tr className='clsHeader'>
                                            <td colSpan='4'>Pool</td>
                                            <td colSpan='4'>Network</td>
                                            <td colSpan='2'>Pool</td>
                                            <td rowSpan='2' className='clsBodyRowMeHashrate'>My hashrate</td>
                                            <td colSpan='2'>Current block</td>
        
                                            <td rowSpan='2' className='clsBodyRowAWait'>AW</td>
                                        </tr>
                                        <tr className='clsHeader'>
                                            <td className='clsBodyRowId'>ID</td>
                                            <td className='clsBodyRowPoolName'>Name</td>
                                            <td className='clsBodyRowPoolCurrency'>Currency</td>
                                            <td className='clsBodyRowPoolFee'>Fee</td>
                                            
                                            <td className='clsBodyRowNetworkReward'>Reward</td>
                                            <td className='clsBodyRowNetworkHeight'>Height</td>
                                            <td className='clsBodyRowNetworkDifficulty'>Difficulty</td>
                                            <td className='clsBodyRowNetworkHashrate'>Hashrate</td>
                                            <td className='clsBodyRowPoolHashrate'>Hashrate</td>
                                            <td className='clsBodyRowPoolMiners'>Miners</td>
                                            
                                            <td className='clsBodyRowPoolCurrblockDuration'>Duration</td>
                                            <td className='clsBodyRowPoolCurrblockEffort'>Effort</td>
                                        </tr>

                                    </thead>
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

function mapStateToProps({ miningPoolGroup, miningPool, miningPoolData, MUI }) {
    const miningPoolGroupIsFetching = miningPoolGroup.isFetching;
    const miningPoolGroupItems = miningPoolGroup.items;

    const miningPoolIsFetching = miningPool.isFetching;
    const miningPoolItems = miningPool.items;

    const miningPoolDataIsFetching = miningPoolData.isFetching;
    const miningPoolDataItems = miningPoolData.items;
    
    const MUILanguage = MUI.language;
    
    return {
        miningPoolGroupIsFetching,
        miningPoolGroupItems,

        miningPoolIsFetching,
        miningPoolItems,

        miningPoolDataIsFetching,
        miningPoolDataItems,
        
        MUILanguage
    };
}

export default connect(mapStateToProps)(PageMiningPools);
