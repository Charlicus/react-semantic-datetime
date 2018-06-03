import React from 'react';
import moment from 'moment';
import ReactSemanticDatetime from 'react-semantic-datetime';
import { Container, Form, Header, Segment } from 'semantic-ui-react';

moment.locale('en');


class Main extends React.Component{
    constructor(){
        super();
        this.state={
            myDate:moment(),
            dateTimeOpen:false
        }
    }
    render(){
        return (
            <Container>
                <Segment style={{marginTop:'30px'}}>
                    <Header>
                        react-semantic-datetime demo
                    </Header>
                    <Form.Input
                        action={{color:"teal",icon:"calendar",onClick:()=>this.setState({dateTimeOpen:true})}}
                        actionPosition="left"
                        value={moment(this.state.myDate).format('LLL')}
                        onClick={()=>this.setState({dateTimeOpen:true})}
                        disabled={this.state.dateTimeOpen}
                    />

                    {this.state.dateTimeOpen && <ReactSemanticDatetime
                        onChange={(value)=>{this.setState({myDate:value,dateTimeOpen:false})}}
                        moment={moment(this.state.myDate)}
                    />}
                </Segment>
            </Container>
        )
    }
}

export default Main;