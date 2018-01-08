import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*
    Класс описывающий контейнер с группами пулов
 */
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

class AIMiningPoolGroup extends Component {
    render() {
        return (<AIMiningPoolContainer id={this.props.id} label={this.props.label} />);
    }
}

/*
    Класс описывающий контейнер с группами пулов
 */
class AIMiningPoolContainer extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            aiMiningPoolGroupId: this.props.id,
            aiMiningPools: [{group_id: 0, group_label: "Test", group_code: "test"}]
        }
    }
    componentDidMount() {
        this.setState({
            loading: true
        });
        fetch('https://api.mixin.lindon-pool.win/api/pool/get_mining_pool/by-group/' + this.state.aiMiningPoolGroupId)
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

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, evfvfvfdit <code>src/App.js</code> and save to reload.
        </p>
          <AIMiningPoolGroupContainer/>
      </div>
    );
  }
}

export default App;
