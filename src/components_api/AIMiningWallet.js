import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import Formatting from "../utils/Formatting";

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
            aiMiningWalletData: null,

            aiMiningAWait: 0
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

            aiMiningAWait: 0
        });

        // Загрузка данны кошелька
        this.componentGetWalletData();
        this.timer_wallet = setInterval(this.componentGetWalletData.bind(this), 15000);
        this.timer_tick = setInterval(this.componentTickAwait.bind(this), 3000);
    }

    componentTickAwait() {
        if (this.state.aiMiningWalletData && ! this.state.loading_wallet && this.state.aiMiningWalletData.wallet_lastshare > 0) {
            this.setState({
                aiMiningAWait: this.state.aiMiningAWait + 1,
            })
        };
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
                loading_wallet: false,

                aiMiningAWait: json.data[0].date_await,
            });


        } else {
            clearInterval(this.timer_tick);
            clearInterval(this.timer_wallet);
        //    clearInterval(this.timer_balance);
        //    clearInterval(this.timer_payout);
        //    clearInterval(this.timer_hashrate);
        }


    }
    componentWillUnmount() {
        clearInterval(this.timer_tick);
        clearInterval(this.timer_wallet);
        //    clearInterval(this.timer_balance);
        //    clearInterval(this.timer_payout);
        //    clearInterval(this.timer_hashrate);
    }
    zeroPad(num, numZeros) {
        var n = Math.abs(num);
        var zeros = Math.max(0, numZeros - Math.floor(n).toString().length );
        var zeroString = Math.pow(10,zeros).toString().substr(1);
        if( num < 0 ) {
            zeroString = '-' + zeroString;
        }

        return zeroString+n;
    }
    timeConverter(UNIX_timestamp) {
        if (UNIX_timestamp === 0) {
            return "";
        }
        let a = new Date(UNIX_timestamp * 1000),
            months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            year = a.getFullYear(),
            month = months[a.getMonth()],
            date = this.zeroPad(a.getDate(),2),
            hour = this.zeroPad(a.getHours(),2),
            min = this.zeroPad(a.getMinutes(),2),
            sec = this.zeroPad(a.getSeconds(),2),
            time = date + '.' + month + '.' + year + ', ' + hour + ':' + min + ':' + sec;
        return time;
    }
    render() {
        if (this.state.aiMiningWalletData && ! this.state.loading_wallet && this.state.aiMiningWalletData.wallet_lastshare > 0) {
            return (
                <Fragment>
                    <tr className="clsBodyRow">
                        <td rowSpan="2" className="clsBodyRowId">{this.state.aiMiningWalletData.wallet_id}</td>
                        <td rowSpan="2" colSpan="3" className="clsBodyRowWallet">{Formatting.wallet_format(this.state.aiMiningWalletData.wallet)}</td>
                        <td colSpan="2" className="clsBodyRowWalletHashRate">{this.state.aiMiningWalletData.wallet_hashrate_str}</td>
                        <td className="clsBodyRowWalletLastShare">{this.timeConverter(this.state.aiMiningWalletData.wallet_lastshare)}</td>
                        <td rowSpan="2" className="clsBodyRowAWait">{this.state.aiMiningAWait}</td>
                    </tr>
                    <tr className="clsBodyRow">
                        <td className="clsBodyRowWalletBalance">{Formatting.number_format(this.state.aiMiningWalletData.wallet_balance, 4, ',', ' ')}</td>
                        <td className="clsBodyRowWalletPaid">{Formatting.number_format(this.state.aiMiningWalletData.wallet_paid, 4, ',', ' ')}</td>
                        <td className="clsBodyRowWalletLastPaid">{this.timeConverter(this.state.aiMiningWalletData.wallet_lastpaid)}</td>
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