import React from 'react';
import moment from 'moment';
import ReactSemanticDatetime from 'react-semantic-datetime';
import { Container } from 'semantic-ui-react';


class Main extends React.Component{
    constructor(){
        super();
        this.state={
            moment:moment()
        }
    }
    render(){
        return (
            <Container>
                <ReactSemanticDatetime
                    onChange={(value)=>{this.setState({moment:value})}}
                    moment={moment(this.state.moment) || moment()}
                />
            </Container>
        )
    }
}

export default Main;