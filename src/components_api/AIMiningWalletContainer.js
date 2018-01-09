/*
    Класс описывающий контейнер с группами пулов
 */
import React, {Component, Fragment} from "react";
import PropTypes from 'prop-types';

import AIMiningWallet from './AIMiningWallet';

class AIMiningWalletContainer extends Component {
    static propTypes = {
        title: PropTypes.array.isRequired,
        pool_group_id: PropTypes.number,
    };

    static defaultProps = {
        wallets: [
            "45YW94hFNeeiCdLYnEkzxxceeeooej4ypX8zjeWdgsKsSyoi3gZRWRVfRJAbUpTNpdPwURUDARjaK569fTPKHnbcKyRSnEu",
            "41wDjSgoD4LDbquFTr7hi4iGewRqmgzufP9qq2n8wn67EGRH1TgqhTd49xE27YgfRFRdqfVhbcviwTwAA556z6Wb5Jw39fF",

            "Sumoo2SeKjvBH8GsjixxSx9HghG6iqht4YqMYTy6qKwaDwPivoCQ5gYdYPBamdrvdGPYUEDpALTTVak9xSi6aS7k4E8sSinQsGi",
            "Sumoo6rpczjKFBj6ppiv4iiita5jQn6a7GwqB4Y5vY99Zkty7Fgtj1zT4tdEDonjjrjkAHAEbgwpDSZUHSEqdxirSGyFWskuFbu",

            "etnjxN1SYpx9fenXGifLvEjJLAMYkiMgKMJ4qn2ta2SbWvjqAertzDGXHESJFWpYLNF4XbJZ85HvmhAETc4VXitL26NyScANak",
            "etnk7PcfLJsJYRv8cDC5wpattBvUHKohVgsXgcPJpL5cZ9gHNnE5RP2CWc34ZFcEC2U3R4DLCZDEy1M8F7MAyNZd6VJgvkn1YC"],
        pool_group_id: NaN,
    };

    constructor() {
        super();

        this.state = {
            loading_pool_group: true,
            loading_pool: true,

            aiMiningWallets: [],
            aiMiningPoolGroupId: NaN,
            aiMiningPoolGroups: [],
            aiMiningPools: []
        }
    }
    componentDidMount() {
        this.setState({
            loading_pool_group: true,
            loading_pool: true,

            aiMiningWallets: this.props.wallets,
            aiMiningPoolGroupId: this.props.pool_id
        });

        this.componentGetDataPoolGroup();
        this.componentGetDataPool();
    }

    componentGetDataPoolGroup() {
        let apiEndPoint = "https://api.mixin.lindon-pool.win/api/pool/get_mining_group";

        if (!isNaN(this.state.aiMiningPoolGroupId)) {
            apiEndPoint += "/by-id/" + this.state.aiMiningPoolGroupId;
        }

        fetch(apiEndPoint)
            .then(response => response.json())
            .then(json  => this.componentParseDataPoolGroup(json.data))
    }

    componentParseDataPoolGroup(data) {
        this.setState({
            loading_pool_group: false,
            aiMiningPoolGroups: data
        })
    }

    componentGetDataPool() {
        let apiEndPoint = "https://api.mixin.lindon-pool.win/api/pool/get_mining_pool";

        if (!isNaN(this.state.aiMiningPoolGroupId)) {
            apiEndPoint += "/by-group-id/" + this.state.aiMiningPoolGroupId;
        }

        fetch(apiEndPoint)
            .then(response => response.json())
            .then(json  => this.componentParseDataPool(json.data))
    }

    componentParseDataPool(data) {
        this.setState({
            loading_pool: false,
            aiMiningPools: data
        })
    }


    render() {
        let aiMiningPoolGroups = (<p>-</p>);

        if (! this.state.loading_pool_group && ! this.state.loading_pool) {
            if (this.state.aiMiningPoolGroups.length && this.state.aiMiningPools.length ) {
                aiMiningPoolGroups = this.state.aiMiningPoolGroups.map(function (aiMiningPoolGroup) {
                    let aiMiningPoolArr = [];
                    let aiMiningPool;

                    for (aiMiningPool in this.state.aiMiningPools){
                        if (this.state.aiMiningPools[aiMiningPool].group_id === aiMiningPoolGroup.group_id) {
                            aiMiningPoolArr.push(this.state.aiMiningPools[aiMiningPool])
                        }
                    }
                    return (<AIMiningWalletPoolGroup id={aiMiningPoolGroup.group_id} label={aiMiningPoolGroup.group_label} pools={aiMiningPoolArr} wallets={this.state.aiMiningWallets}/>);
                }.bind(this));
            } else {
                aiMiningPoolGroups = (<tr><td colSpan="11">Нет данных</td></tr>);
            }
        } else {
            aiMiningPoolGroups = (<tr><td colSpan="11" className="clsBodyRowPoolGroupWait">Загрузка данных</td></tr>);
        }

        return (
            <table cellpadding="0" cellspacing="1" border="0" className="clsTableParent" >
                <tr>
                    <td className="clsTableParentBody">
                        <table cellpadding="0" cellspacing="1" className="clsTable">
                            {aiMiningPoolGroups}
                        </table>
                    </td>
                </tr>
            </table>
        );
    }
}

class AIMiningWalletPoolGroup extends Component {
    render() {
        let aiMiningWalletPools = this.props.pools.map(function (aiMiningPool) {
            return (<AIMiningWalletPool pool_id={aiMiningPool.pool_id} data={aiMiningPool} wallets={this.props.wallets}/>);
        }.bind(this));
        return (
            <Fragment>
                <tr className="clsBodyRowPoolGroup">
                    <td className="clsBodyRowId">-/-</td>
                    <td className="clsBodyRowPoolGroupLabel" colSpan="7">{this.props.label}</td>
                </tr>
                {aiMiningWalletPools}
            </Fragment>
        );

    }
}

class AIMiningWalletPool extends Component {
    render(){
        let aiMiningWallets = this.props.wallets.map(function (aiMiningWallet) {
            return (<AIMiningWallet pool_id={this.props.pool_id} wallet={aiMiningWallet}/>);
        }.bind(this));

        return (
            <Fragment>
            <tr className="clsBodyRow">
                <td className="clsBodyRowId">{this.props.pool_id}</td>
                <td colSpan="6" className="clsBodyRowPoolName"><a href={this.props.data.pool_web_url} target="_new">{this.props.data.pool_label}</a></td>
                <td className="clsBodyRowPoolClean">
                <td className="clsBodyRowPoolCurrency">{this.props.data.pool_currency}</td>
                </td>
            </tr>
            {aiMiningWallets}
            </Fragment>

        );

    }
}

export default AIMiningWalletContainer;