import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";

class AIMiningWallet extends Component {
    static propTypes = {
        wallet: PropTypes.string.isRequired,
        pool_id: PropTypes.number.isRequired,
    };

    static defaultProps = {
        wallet: "45YW94hFNeeiCdLYnEkzxxceeeooej4ypX8zjeWdgsKsSyoi3gZRWRVfRJAbUpTNpdPwURUDARjaK569fTPKHnbcKyRSnEu",
        pool_id: 666,
    };

    constructor() {
        super();

        this.state = {
            // Состояние загрузки
            loading_wallet: true,
            loading_balance: true,
            loading_payout: true,
            loading_hashrate: true,

            // Параметры запроса
            aiMiningWalletId: NaN,
            aiMiningPoolId: NaN,

            // Хранилище данных
            aiMiningWalletBalance: null,
            aiMiningWalletPayout: null,
            aiMiningWalletHashrate: null,
            aiMiningWalletData: null
        }
    }

    componentDidMount() {
        this.setState({
            loading_wallet: true,
            loading_balance: true,
            loading_payout: true,
            loading_hashrate: true,

            aiMiningWalletId: this.props.wallet,
            aiMiningPoolId: this.props.pool_id,
        });

        // Загрузка данны кошелька
        this.componentGetWalletData();
        this.timer_wallet = setInterval(this.componentGetWalletData.bind(this), 10000)
    }

    componentGetWalletData() {
        fetch('https://api.mixin.lindon-pool.win/api/pool/get_mining_wallet/' + this.state.aiMiningWalletId + '/by-pool/' + this.state.aiMiningPoolId)
            .then(response => response.json())
            .then(json => this.componentParseWalletData(json));
    }
    componentParseWalletData(json) {
        if (json.succes) {
            this.setState({
                aiMiningWalletData: json.data[0],
                loading_wallet: false
            })
        } else {
            clearInterval(this.timer_wallet);
        //    clearInterval(this.timer_balance);
        //    clearInterval(this.timer_payout);
        //    clearInterval(this.timer_hashrate);
        }


    }
    componentWillUnmount() {
        clearInterval(this.timer_wallet);
        //    clearInterval(this.timer_balance);
        //    clearInterval(this.timer_payout);
        //    clearInterval(this.timer_hashrate);
    }

    render() {
        if (this.state.aiMiningWalletData && ! this.state.loading_wallet && this.state.aiMiningWalletData.wallet_lastshare > 0) {
            return (
                <Fragment>
                    <tr className="clsBodyRow">
                        <td rowSpan="2" className="clsBodyRowId">{this.state.aiMiningWalletData.wallet_id}</td>
                        <td rowSpan="2" colSpan="3" className="clsBodyRowWallet">...{this.state.aiMiningWalletData.wallet.substring((this.state.aiMiningWalletData.wallet.length-16))}</td>
                        <td colSpan="2" className="clsBodyRowWalletHashRate">{this.state.aiMiningWalletData.wallet_hashrate_str}</td>
                        <td className="clsBodyRowWalletLastShare">{this.state.aiMiningWalletData.wallet_lastshare}</td>
                        <td rowSpan="2" className="clsBodyRowAWait">{this.state.aiMiningWalletData.date_await}</td>
                    </tr>
                    <tr className="clsBodyRow">
                        <td className="clsBodyRowWalletBalance">{this.state.aiMiningWalletData.wallet_balance}</td>
                        <td className="clsBodyRowWalletPaid">{this.state.aiMiningWalletData.wallet_paid}</td>
                        <td className="clsBodyRowWalletLastPaid">{this.state.aiMiningWalletData.wallet_lastpaid}</td>
                    </tr>
                </Fragment>
            );
        } else {
            if (this.state.loading_wallet) {
                return (null);
            } else {
                return (null);
            }
        }
    }
}

export default AIMiningWallet;