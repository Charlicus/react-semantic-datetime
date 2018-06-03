import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Segment, Table, Grid, Icon, Header, Label} from 'semantic-ui-react';


class DateTimePicker extends React.Component{

    // Initiate functions
    constructor(){
        super();
        this.state = {
            locale: this.getLocale(),
            navigationDate: moment(),
            zoom: 'day',
        }
    }

    componentDidUpdate(prevProps,prevState){
        if(moment().local()._locale._abbr!=prevState.locale.lang){
            this.setState({
                locale: this.getLocale()
            });
        }
    }

    componentDidMount(){
        this.setState({
            navigationDate: this.props.moment
        })
    }
    
    getLocale(){
        return {
            lang: moment().local()._locale._abbr,
            weekDays:moment().local()._locale._weekdaysMin,
            weekStartDay:moment().local()._locale._week.dow,
        }
    }

    // Action functions
    nextYear(){
        this.setState({
            navigationDate: moment(this.state.navigationDate).add(1,'year')
        })
    }

    previousYear(){
        this.setState({
            navigationDate: moment(this.state.navigationDate).add(-1,'year')
        })
    }

    nextMonth(){
        this.setState({
            navigationDate: moment(this.state.navigationDate).add(1,'month')
        })
    }

    previousMonth(){
        this.setState({
            navigationDate: moment(this.state.navigationDate).add(-1,'month')
        })
    }

    selectMonth(month){
        this.setState({
            navigationDate: moment(this.state.navigationDate).set('month',month),
            zoom:'day'
        });
    }

    selectDay(day){
        if(this.props.time){
            this.setState({
                navigationDate: moment(day),
                zoom:'hour'
            });
        }
        else {
            this.setState({
                navigationDate: moment(day)
            });
            this.props.onChange(moment(day));
        }
        
        //this.props.onChange(moment(day));
    }

    selectHour(hour){
        this.setState({
            navigationDate: moment(this.state.navigationDate).set('hour',hour),
            zoom:'minute'
        });
    }

    selectMinute(minute){
        this.setState({
            navigationDate: moment(this.state.navigationDate).set('minute',minute)
        });
        this.props.onChange(moment(this.state.navigationDate).set('minute',minute));
    }

    selectZoom(zoom){
        this.setState({
            zoom
        });
    }

    // Render
    renderMonth(){
        return (
            <React.Fragment>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column textAlign="left">
                            <Icon size="big" color={this.props.color} name="chevron circle left" onClick={()=>this.previousYear()} style={{cursor:'pointer'}}/>
                        </Grid.Column>
                        <Grid.Column textAlign="center" verticalAlign="middle">
                            <Header size="small"> {this.state.navigationDate.format('YYYY')}</Header>
                        </Grid.Column>
                        <Grid.Column textAlign="right">
                            <Icon size="big" color={this.props.color} name="chevron circle right" onClick={()=>this.nextYear()} style={{cursor:'pointer'}}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Table columns="4" textAlign="center" unstackable>
                    <Table.Body>
                        {this.renderMonthRow()}
                    </Table.Body>
                </Table>
            </React.Fragment>
        );
    }

    renderMonthRow(){
        let rows=[1,2,3];
        let columns=[1,2,3,4];
        let baseMonth = moment(this.state.navigationDate).startOf('year');
        return (
            rows.map((row)=>{
                return (
                    <Table.Row key={row}>
                        {columns.map((col)=>{
                            let monthDelta = (row-1)*4+(col-1);
                            return (
                                <Table.Cell 
                                    key={col}
                                    style={{
                                        cursor:'pointer',
                                        color:this.state.navigationDate.month()==moment(baseMonth).add(monthDelta,'month').month()?this.props.color:null,
                                        fontWeight:this.state.navigationDate.month()==moment(baseMonth).add(monthDelta,'month').month()?'bold':null
                                    }}
                                    onClick={()=>{this.selectMonth(moment(baseMonth).add(monthDelta,'month').month())}}
                                >
                                    {moment(baseMonth).add(monthDelta,'month').format('MMMM')}
                                </Table.Cell>
                            );
                        })}
                    </Table.Row>
                );
            })
        );
    }


    // Render Date Section
    renderDay(){
        return (
            <React.Fragment>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column textAlign="left">
                            <Icon size="big" color={this.props.color} name="chevron circle left" onClick={()=>this.previousMonth()} style={{cursor:'pointer'}}/>
                        </Grid.Column>
                        <Grid.Column textAlign="center" verticalAlign="middle" onClick={()=>this.selectZoom('month')}>
                            <Header size="small"> {this.state.navigationDate.format('MMMM YYYY')}</Header>
                        </Grid.Column>
                        <Grid.Column textAlign="right">
                            <Icon size="big" color={this.props.color} name="chevron circle right" onClick={()=>this.nextMonth()} style={{cursor:'pointer'}}/>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
                <Table columns={7} textAlign="center" unstackable>
                    <Table.Header>
                        {this.renderDayCalendarWeekDays()}
                    </Table.Header>
                    <Table.Body>
                        {this.renderDayCalendarRow()}
                    </Table.Body>
                </Table>
            </React.Fragment>
        )
    }

    renderDayCalendarWeekDays(){
        let right = [...this.state.locale.weekDays];
        let left = right.splice(this.state.locale.weekStartDay);
        return (
            <Table.Row>
                {[...left,...right].map((weekDay)=>{
                    return <Table.HeaderCell key={weekDay}> {weekDay} </Table.HeaderCell>;
                })}
            </Table.Row>
        )
    }

    renderDayCalendarRow(){
        let rows = [];
        let day = moment(this.state.navigationDate).startOf('month').startOf('week').add(-1,'day');

        while(moment(day).add(1,'day').month() != moment(this.state.navigationDate).add(1,'month').month()){
            rows.push(
                <Table.Row key={day.format('YYMMDD')}>
                    {[...Array(7).keys()].map((key)=>{
                        day.add(1,'day');
                        return this.renderDayCalendarCell(day);
                    })}
                </Table.Row>
            )
        }
        return rows;
    }

    renderDayCalendarCell(day){
        let cellDay = moment(day);
        let isSelected = cellDay.format('YYMMDD')==this.state.navigationDate.format('YYMMDD');
        let isToday = cellDay.format('YYMMDD')==moment().format('YYMMDD');
        let isCurrentMonth = cellDay.month() != this.state.navigationDate.month();
        return (
            <Table.Cell 
                key={cellDay.format('YYMMDD')}
                disabled={isCurrentMonth}
                onClick={()=>this.selectDay(cellDay.format())}
                style={{
                    textDecoration:isToday?'underline':null,
                    fontWeight:isToday?'bold':null,
                    cursor:'pointer',
                    backgroundColor:isSelected?this.props.color:null,
                    color:isSelected?'white':null
                }}
            >
                {cellDay.format('D')}
            </Table.Cell>
        )
    }

    // Render Hour Selection
    renderHour(){
        return (
            <React.Fragment>
                <Grid columns={1}>
                    <Grid.Row>
                        <Grid.Column textAlign="center" verticalAlign="middle" onClick={()=>this.selectZoom('day')}>
                            <Header size="small"> {this.state.navigationDate.format('LL')}</Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Table columns="4" textAlign="center" unstackable>
                    <Table.Body>
                        {this.renderHourRow()}
                    </Table.Body>
                </Table>
            </React.Fragment>
        );
    }

    renderHourRow(){
        let rows=[1,2,3,4,5,6];
        let columns=[1,2,3,4];
        let baseHour = moment(this.state.navigationDate).startOf('day');
        return (
            rows.map((row)=>{
                return (
                    <Table.Row key={row}>
                        {columns.map((col)=>{
                            let hourDelta = (row-1)*4+(col-1);
                            return (
                                <Table.Cell 
                                    key={col}
                                    style={{
                                        cursor:'pointer',
                                        color:this.state.navigationDate.hour()==moment(baseHour).add(hourDelta,'hour').hour()?this.props.color:null,
                                        fontWeight:this.state.navigationDate.hour()==moment(baseHour).add(hourDelta,'hour').hour()?'bold':null
                                    }}
                                    onClick={()=>{this.selectHour(moment(baseHour).add(hourDelta,'hour').hour())}}
                                >
                                    {moment(baseHour).add(hourDelta,'hour').format('LT')}
                                </Table.Cell>
                            );
                        })}
                    </Table.Row>
                );
            })
        );
    }

    // Render Minute Selection
    renderMinute(){
        return (
            <React.Fragment>
                <Grid columns={1}>
                    <Grid.Row>
                        <Grid.Column textAlign="center" verticalAlign="middle" onClick={()=>this.selectZoom('hour')}>
                            <Header size="small"> {this.state.navigationDate.format('LLL')}</Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Table columns="4" textAlign="center" unstackable>
                    <Table.Body>
                        {this.renderMinuteRow()}
                    </Table.Body>
                </Table>
            </React.Fragment>
        );
    }

    renderMinuteRow(){
        let rows=[1,2,3];
        let columns=[1,2,3,4];
        let baseMinute = moment(this.state.navigationDate).startOf('hour');
        return (
            rows.map((row)=>{
                return (
                    <Table.Row key={row}>
                        {columns.map((col)=>{
                            let minuteDelta = (row-1)*20+(col-1)*5;
                            return (
                                <Table.Cell 
                                    key={col}
                                    style={{
                                        cursor:'pointer',
                                        color:this.state.navigationDate.minute()==moment(baseMinute).add(minuteDelta,'minute').minute()?this.props.color:null,
                                        fontWeight:this.state.navigationDate.minute()==moment(baseMinute).add(minuteDelta,'minute').minute()?'bold':null
                                    }}
                                    onClick={()=>{this.selectMinute(moment(baseMinute).add(minuteDelta,'minute').minute())}}
                                >
                                    {moment(baseMinute).add(minuteDelta,'minute').format('LT')}
                                </Table.Cell>
                            );
                        })}
                    </Table.Row>
                );
            })
        );
    }


    // Final render
    render(){
        return (
            <Segment color={this.props.color}>
                {this.state.zoom=='month' && this.renderMonth()}
                {this.state.zoom=='day' && this.renderDay()}
                {this.state.zoom=='hour' && this.renderHour()}
                {this.state.zoom=='minute' && this.renderMinute()}
            </Segment>
        )
    }
}

DateTimePicker.defaultProps = {
    color:'teal',
    time:true
}

DateTimePicker.propTypes = {
    time:PropTypes.bool,
    color:PropTypes.string,
    moment:PropTypes.object.isRequired,
    onChange:PropTypes.func.isRequired
}

export default DateTimePicker;