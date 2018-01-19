import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Formatting from '../../../utils/Formatting';

class MiningWalletContainer extends Component {
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
        
        dispatch: PropTypes.func.isRequired
    };
    
    static defaultProps = {
        miningPoolGroupIsFetching: true,
        miningPoolGroupItems: [],
        
        miningPoolIsFetching: true,
        miningPoolItems: [],
        
        miningPoolDataIsFetching: true,
        miningPoolDataItems: []
    };
    
    constructor() {
        super();
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
                    <td className='clsBodyRowNetworkDifficulty'>
                        {Formatting.numberFormat(poolData.network_difficulty, 0, ',', ' ')}
                    </td>
                    <td className='clsBodyRowNetworkHashrate'>{poolData.network_hashrate_str}</td>
                    
                    <td className='clsBodyRowPoolHashrate'>{poolData.pool_hashrate_str}</td>
                    <td className='clsBodyRowPoolMiners'>
                        {Formatting.numberFormat(poolData.pool_miners, 0, ',', ' ')}
                    </td>
                    <td className='clsBodyRowMeHashrate'>1</td>
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
                    <td colSpan='10' className='clsBodyRowWaitMessadge'>Загрузка данных...</td>
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
                <td colSpan='10' className='clsBodyRowErrorMessadge'>Нет данных.</td>
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
                        <td colSpan='14' className='clsBodyRowPoolGroupLabel'>{groupLabel} : Нет данных о группе пулов.</td>
                    </tr>
                );
            }
        } else {
            return (
                <tr className='clsBodyRowPoolGroup'>
                    <td className='clsBodyRowId'>-/-</td>
                    <td colSpan='14' className='clsBodyRowPoolGroupLabel'>{groupLabel} : Загрузка данных...</td>
                </tr>
            );
        }
        return (
            <Fragment>
                <tr className='clsBodyRowPoolGroup'>
                    <td className='clsBodyRowId'>-/-</td>
                    <td colSpan='12' className='clsBodyRowPoolGroupLabel'>{groupLabel}</td>
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
            
            return (<tr><td colSpan='13'>Нет данных</td></tr>);
        }
        
        return (<tr><td colSpan='13' className='clsBodyRowPoolGroupWait'>Загрузка данных</td></tr>);
    }
    
    render() {
        const aiMiningPoolGroups = this.renderMiningPoolGroups();
    
        return (
            <table className='clsTableParent' cellPadding='0' cellSpacing='1'>
                <tbody>
                    <tr>
                        <td className='clsTableParentBody'>
                            <table className='clsTable' cellPadding='0' cellSpacing='1'>
                                <tbody>
                                    {aiMiningPoolGroups}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

function mapStateToProps({ miningPoolGroup, miningPool, miningPoolData }) {
    const miningPoolGroupIsFetching = miningPoolGroup.isFetching;
    const miningPoolGroupItems = miningPoolGroup.items;
    
    const miningPoolIsFetching = miningPool.isFetching;
    const miningPoolItems = miningPool.items;
    
    const miningPoolDataIsFetching = miningPoolData.isFetching;
    const miningPoolDataItems = miningPoolData.items;
    
    return {
        miningPoolGroupIsFetching,
        miningPoolGroupItems,
        
        miningPoolIsFetching,
        miningPoolItems,
        
        miningPoolDataIsFetching,
        miningPoolDataItems
    };
}

export default connect(mapStateToProps)(MiningWalletContainer);

