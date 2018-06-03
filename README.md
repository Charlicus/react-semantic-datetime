# react-semantic-datetime

Implementation of a datetime picker for react using pure semantic components and momentjs locals capabilities
* Pure react-semantic-ui components (no css)
* Use momentjs for localization (no translation needed)

![Alt Text](https://github.com/Charlicus/react-semantic-datetime/blob/master/demo/movie.gif)

## Dependencies
* momentjs
* react
* semantic-ui (css)
* react-semantic-ui

This module is intented to be use only for react-semantic-ui projects

## Utilization

You can also see in the demo file for the code behind the GIF

```javascript

import moment from 'moment';
import DatetimePicker from 'react-semantic-datetime';

moment.locale('en'); // Important for calendar localization including translation

class MyComponent extends React.Component{
    constructor(){
        super();
        this.state({
            myDate:moment()
        })
    }
    render(){
        return (
            <DatetimePicker
                color="teal" // optional (default:teal)
                onChange={(value)=>{this.setState({myDate:value})}} // Mandatory
                value={moment(this.state.myDate)} // Mandatory
                time='true' // optional to show time selection, just a date picket if false (default:true)
            />
        )
    }
}

```