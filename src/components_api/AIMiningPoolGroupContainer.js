/*
    Класс описывающий контейнер с группами пулов
 */
import React, {Component} from "react";

import AIMiningPoolGroup from './AIMiningPoolContainer';

class AIMiningPoolGroupContainer extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            aiMiningPoolGroupId: NaN,
            aiMiningPoolGroups: [{group_id: 0, group_label: "Test", group_code: "test"}]
        }
    }
    componentDidMount() {
        this.setState({
            loading: true
        });

        let apiEndPoint = "https://api.mixin.lindon-pool.win/api/pool/get_mining_group";

        if (!isNaN(this.state.aiMiningPoolGroupId)) {
            apiEndPoint += "/by-id/" + this.state.aiMiningPoolGroupId;
        }

        fetch(apiEndPoint)
            .then(response => response.json())
            .then(json  =>
                this.setState({
                    aiMiningPoolGroups: json.data,
                    loading: false
                })
            )
    }
    render() {
        let aiMiningPoolGroups = (<p>-</p>);

        if (!this.state.loading) {
            if (this.state.aiMiningPoolGroups.length) {
                aiMiningPoolGroups = this.state.aiMiningPoolGroups.map(function (aiMiningPoolGroup) {
                    return (<AIMiningPoolGroup id={aiMiningPoolGroup.group_id} label={aiMiningPoolGroup.group_label}/>);
                });
            } else {
                aiMiningPoolGroups = (<tr><td colSpan="11">Нет данных</td></tr>);
            }
        } else {
            aiMiningPoolGroups = (<tr><td colSpan="11">Загрузка данных</td></tr>);
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

export default AIMiningPoolGroupContainer;