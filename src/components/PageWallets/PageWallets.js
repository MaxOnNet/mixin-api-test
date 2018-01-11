import React, { Component } from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import { FormGroup, InputGroup, FormControl, Button, ControlLabel, HelpBlock } from 'react-bootstrap';
import AIMiningWalletContainer from './AIMiningWalletContainer';

class PageWallets extends Component {
    render() {
        return (
            <div>
                <PageHeader>Информация о криптовалютных кошельках</PageHeader>
                <form>
                    <FormGroup>
                        <ControlLabel>Введите интересуемый криптовалютный кошелек, XMR, ETN или SUMO.</ControlLabel>
                        <InputGroup>
                            <FormControl type="text" />
                            <InputGroup.Button>
                                <Button>Отслеживать</Button>
                            </InputGroup.Button>

                        </InputGroup>
                        <HelpBlock>Если сбор информации ранее не производился, то информация отразится сразу же после первого прохода сборщика данных, примерно через 90 секунд.</HelpBlock>
                    </FormGroup>
                </form>
                <AIMiningWalletContainer wallets={[
                    "45YW94hFNeeiCdLYnEkzxxceeeooej4ypX8zjeWdgsKsSyoi3gZRWRVfRJAbUpTNpdPwURUDARjaK569fTPKHnbcKyRSnEu",
                    "41wDjSgoD4LDbquFTr7hi4iGewRqmgzufP9qq2n8wn67EGRH1TgqhTd49xE27YgfRFRdqfVhbcviwTwAA556z6Wb5Jw39fF",

                    "Sumoo2SeKjvBH8GsjixxSx9HghG6iqht4YqMYTy6qKwaDwPivoCQ5gYdYPBamdrvdGPYUEDpALTTVak9xSi6aS7k4E8sSinQsGi",
                    "Sumoo6rpczjKFBj6ppiv4iiita5jQn6a7GwqB4Y5vY99Zkty7Fgtj1zT4tdEDonjjrjkAHAEbgwpDSZUHSEqdxirSGyFWskuFbu",

                    "etnjxN1SYpx9fenXGifLvEjJLAMYkiMgKMJ4qn2ta2SbWvjqAertzDGXHESJFWpYLNF4XbJZ85HvmhAETc4VXitL26NyScANak",
                    "etnk7PcfLJsJYRv8cDC5wpattBvUHKohVgsXgcPJpL5cZ9gHNnE5RP2CWc34ZFcEC2U3R4DLCZDEy1M8F7MAyNZd6VJgvkn1YC"]}/>
            </div>
        );
    }
}

export default PageWallets;
