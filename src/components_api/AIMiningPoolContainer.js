/*
    Класс описывающий контейнер с группами пулов
 */
import React, {Component} from "react";

import AIMiningPool from './AIMiningPool';

class AIMiningPoolContainer extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            aiMiningPoolGroupId: NaN,
            aiMiningPools: [{group_id: 0, group_label: "Test", group_code: "test"}]
        }
    }
    componentDidMount() {
        this.setState({
            loading: true
        });

        this.state.aiMiningPoolGroupId = this.props.id;

        fetch('https://api.mixin.lindon-pool.win/api/pool/get_mining_pool/by-group-id/' + this.state.aiMiningPoolGroupId)
            .then(response => response.json())
            .then(json  =>
                this.setState({
                    aiMiningPools: json.data,
                    loading: false
                })
            )
    }
    render() {
        let aiMiningPoolGroups = (<p>Загрузка данных...</p>);

        if (!this.state.loading) {
            if (this.state.aiMiningPools.length) {
                aiMiningPoolGroups = this.state.aiMiningPools.map(function (aiMiningPool) {
                    return (<AIMiningPool id={aiMiningPool.pool_id} data={aiMiningPool}/>);
                });
            } else {
                return (
                    <tr className="clsBodyRowPoolGroup">
                        <td className="clsBodyRowId">-/-</td>
                        <td colSpan="10" className="clsBodyRowPoolGroupLabel">{this.props.label} : Нет данных о группе пулов.</td>
                    </tr>
                );
            }
        } else {
            return (
                <tr className="clsBodyRowPoolGroup">
                    <td className="clsBodyRowId">-/-</td>
                    <td colSpan="10" className="clsBodyRowPoolGroupLabel">{this.props.label} : Загрузка данных...</td>
                </tr>
            );
        }
        return (<tbody><tr className="clsBodyRowPoolGroup">
            <td className="clsBodyRowId">-/-</td>
            <td colSpan="10" className="clsBodyRowPoolGroupLabel">{this.props.label}</td>
        </tr>{aiMiningPoolGroups}</tbody>);
        //aiMiningPoolGroups+=aiMiningPoolGroupsHeader;



    }
}

export default AIMiningPoolContainer;