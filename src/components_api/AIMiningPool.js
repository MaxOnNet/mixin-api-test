import React, {Component} from "react";

class AIMiningPool extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,

            aiMiningPoolId: NaN,
            aiMiningPool: {},
            iaMiningPoolData: null
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        });

        this.state.aiMiningPoolId = this.props.id;
        this.state.aiMiningPool = this.props.data;

        this.componentGetData();
    }

    componentGetData() {
        fetch('https://api.mixin.lindon-pool.win/api/pool/get_mining_pool_data/by-id/' + this.state.aiMiningPoolId)
            .then(response => response.json())
            .then(json =>
                this.setState({
                    iaMiningPoolData: json.data[0],
                    loading: false
                })
            );

        this.timer = setInterval(this.componentGetData.bind(this), 10000)
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    render() {
        if (this.state.iaMiningPoolData && ! this.state.loading) {
            return (<p>{this.state.aiMiningPool.pool_label}: AWait: {this.state.iaMiningPoolData.date_await}</p>);
        } else {
            if (this.state.loading) {
                return (<p>{this.state.aiMiningPool.pool_label}: Loading</p>);
            } else {
                return (<p>{this.state.aiMiningPool.pool_label}: No Data</p>);
            }
        }
    }
}

export default AIMiningPool;