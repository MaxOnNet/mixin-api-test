import React, {Component} from "react";

class AIMiningPool extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,

            aiMiningPoolId: NaN,
            aiMiningPool: {},
            aiMiningPoolData: null,

            aiMiningAWait: 0
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        });

        this.state.aiMiningPoolId = this.props.id;
        this.state.aiMiningPool = this.props.data;

        this.componentGetData();
        this.timer = setInterval(this.componentGetData.bind(this), 15000);
        this.timer_tick = setInterval(this.componentTickAwait.bind(this), 3000);
    }

    componentTickAwait() {
        if (this.state.aiMiningPoolData && ! this.state.loading) {
            this.setState({
                aiMiningAWait: this.state.aiMiningAWait + 1,
            })
        };
    }

    componentGetData() {
        fetch('https://api.mixin.lindon-pool.win/api/pool/get_mining_pool_data/by-id/' + this.state.aiMiningPoolId)
            .then(response => response.json())
            .then(json =>
                this.setState({
                    aiMiningPoolData: json.data[0],
                    loading: false,

                    aiMiningAWait: json.data[0].date_await,
                })
            );
    }

    componentWillUnmount() {
        clearInterval(this.timer_tick);
        clearInterval(this.timer);
    }

    render() {
        if (this.state.aiMiningPoolData && ! this.state.loading) {
            return (
                <tr className="clsBodyRow">
                    <td className="clsBodyRowId">{this.state.aiMiningPool.pool_id}</td>
                    <td className="clsBodyRowPoolName"><a href={this.state.aiMiningPool.pool_web_url} target="_new">{this.state.aiMiningPool.pool_label}</a></td>
                    <td className="clsBodyRowPoolCurrency">{this.state.aiMiningPool.pool_currency}</td>
                    <td className="clsBodyRowPoolFee">{this.state.aiMiningPoolData.pool_fee} %</td>
                    <td className="clsBodyRowNetworkReward">{this.state.aiMiningPoolData.network_reward_str}</td>

                    <td className="clsBodyRowNetworkDifficulty">{this.state.aiMiningPoolData.network_difficulty}</td>
                    <td className="clsBodyRowNetworkHashRate">{this.state.aiMiningPoolData.network_hashrate_str}</td>

                    <td className="clsBodyRowPoolHashrate">{this.state.aiMiningPoolData.pool_hashrate_str}</td>
                    <td className="clsBodyRowPoolMiners">{this.state.aiMiningPoolData.pool_miners}</td>
                    <td className="clsBodyRowPoolCurrblockEffort">{this.state.aiMiningPoolData.pool_currblock_effort} %</td>
                    <td className="clsBodyRowAWait">{this.state.aiMiningAWait}</td>
                </tr>
                );
        } else {
            if (this.state.loading) {
                return (
                    <tr className="clsBodyRow">
                        <td className="clsBodyRowId">{this.state.aiMiningPool.pool_id}</td>
                        <td className="clsBodyRowPoolName"><a href={this.state.aiMiningPool.pool_web_url} target="_new">{this.state.aiMiningPool.pool_label}</a></td>
                        <td className="clsBodyRowPoolCurrency">{this.state.aiMiningPool.pool_currency}</td>
                        <td colSpan="8" className="clsBodyRowWaitMessadge">Загрузка данных с пула...</td>
                    </tr>
                );
            } else {
                return (
                    <tr className="clsBodyRow">
                        <td className="clsBodyRowId">{this.state.aiMiningPool.pool_id}</td>
                        <td className="clsBodyRowPoolName"><a href={this.state.aiMiningPool.pool_web_url} target="_new">{this.state.aiMiningPool.pool_label}</a></td>
                        <td className="clsBodyRowPoolCurrency">{this.state.aiMiningPool.pool_currency}</td>
                        <td colSpan="8" className="clsBodyRowErrorMessadge">Нет данных о пуле.</td>
                    </tr>
                );
            }
        }
    }
}

export default AIMiningPool;