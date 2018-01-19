import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FormGroup, InputGroup, FormControl, Button, ControlLabel, HelpBlock } from 'react-bootstrap';

class MiningWalletFormAdd extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };
    
    static defaultProps = {

    };
    
    constructor() {
        super();
    }
    
    render() {
        return (
            <form>
                <FormGroup>
                    <ControlLabel>Введите интересуемый криптовалютный кошелек, XMR, ETN или SUMO.</ControlLabel>
                    <InputGroup>
                        <FormControl type='text' />
                        <InputGroup.Button>
                            <Button >Отслеживать</Button>
                        </InputGroup.Button>
                    
                    </InputGroup>
                    <HelpBlock>
                        Если сбор информации ранее не производился, то информация отразится
                        сразу же после первого прохода сборщика данных, примерно через 90 секунд.
                    </HelpBlock>
                </FormGroup>
            </form>
        );
    }
}

function mapStateToProps({ }) {
    return {
    };
}

export default connect(mapStateToProps)(MiningWalletFormAdd);

