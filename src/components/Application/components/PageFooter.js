import React, { Component } from 'react';

import { Alert } from 'react-bootstrap';

class PageFooter extends Component {
    render() {
        return (
            <Alert bsStyle='info'>
                <strong>Поддержка проекта</strong>
                <br/>
                Если у Вас есть желание поддержать проект, запросить новую фишку в ускоренном порядке,
                то ниже представлениы кошельки для перевода:
                <ul>
                    <li>41wDjSgoD4LDbquFTr7hi4iGewRqmgzufP9qq2n8wn67EGRH1TgqhTd49xE27YgfRFRdqfVhbcviwTwAA556z6Wb5Jw39fF</li>
                    <li>Sumoo6rpczjKFBj6ppiv4iiita5jQn6a7GwqB4Y5vY99Zkty7Fgtj1zT4tdEDonjjrjkAHAEbgwpDSZUHSEqdxirSGyFWskuFbu</li>
                    <li>etnk7PcfLJsJYRv8cDC5wpattBvUHKohVgsXgcPJpL5cZ9gHNnE5RP2CWc34ZFcEC2U3R4DLCZDEy1M8F7MAyNZd6VJgvkn1YC</li>
                </ul>
                По всем вопросам обращаться к Татарникову Виктору [ viktor@tatarnikov.org ]
            </Alert>
        );
    }
}

export default PageFooter;
