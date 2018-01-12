import React, { Component } from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import { Grid, Alert, Glyphicon } from 'react-bootstrap';

class PageHome extends Component {
    render() {
        return (
            <div>
                <PageHeader>Лаболатория AI Trade</PageHeader>
                <Grid>
                    <Alert bsStyle='danger'>
                        <p>
                            <Glyphicon glyph='warning-sign' /> The project is under active
                            development, and APIs will change.{' '}
                        </p>
                    </Alert>
                </Grid>
            </div>
        );
    }
}

export default PageHome;
