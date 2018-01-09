import React, {Component} from "react";

import AIMiningPoolContainer from './AIMiningPoolGroupContainer';

class AIMiningPoolGroup extends Component {
    render() {
        return (
            <AIMiningPoolContainer id={this.props.id} label={this.props.label} />);
    }
}

export default AIMiningPoolGroup;