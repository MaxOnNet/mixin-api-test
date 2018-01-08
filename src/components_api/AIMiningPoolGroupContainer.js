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
        let aiMiningPoolGroups = (<p>Загрузка данных...</p>);

        if (!this.state.loading) {
            if (this.state.aiMiningPoolGroups.length) {
                aiMiningPoolGroups = this.state.aiMiningPoolGroups.map(function (aiMiningPoolGroup) {
                    return (<AIMiningPoolGroup id={aiMiningPoolGroup.group_id} label={aiMiningPoolGroup.group_label}/>);
                });
            } else {
                aiMiningPoolGroups = (<p>No Data!</p>);
            }
        } else {
            aiMiningPoolGroups = (<p>Loading Data...</p>);
        }
        return (
            <p>
                <h1>Доступные пулы:</h1>
                {aiMiningPoolGroups}
            </p>
        );
    }
}

export default AIMiningPoolGroupContainer;