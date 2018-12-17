import React, { Component } from 'react';
import { List, Select } from 'antd';
import API from '../api';

const Option = Select.Option;

class Detail extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            option: 1,
            data: [],
            todayData: [],
            thisWeekData: [],
            thisMonthData: [],
        }
    }

    handleChange = (value) => {
        if (value === 1) {
            this.setState({data: [...this.state.todayData, ...this.state.thisWeekData, ...this.state.thisMonthData]})
        } else if (value === 2) {
            this.setState({data: [...this.state.todayData, ...this.state.thisWeekData]})
        } else if (value === 3) {
            this.setState({data: [...this.state.todayData]})
        }
    };

    toUSD(cents) {
        var dollars = cents / 100;
        return dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
    }

    componentDidMount() {
        API.get('detail/' + this.props.match.params.id)
            .then(res => {
                this.setState({thisMonthData: res.data.this_month});
                this.setState({thisWeekData: res.data.this_week});
                this.setState({todayData: res.data.today});
                this.setState({name: res.data.name});
                this.setState({data: [...this.state.todayData, ...this.state.thisWeekData, ...this.state.thisMonthData]})
                console.log(this.state)
            })
    }

    render() {
        return (
            <React.Fragment>
                <strong>{this.state.name}</strong>
                <Select defaultValue={1} style={{ width: 120, marginLeft: '20px' }} onSelect={this.handleChange}>
                <Option value={1}>This Month</Option>
                <Option value={2}>This Week</Option>
                <Option value={3}>Today</Option>
            </Select>
            <List
                itemLayout="horizontal"
                dataSource={this.state.data}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.product_name}
                            description={this.toUSD(item.fare)}
                        />
                        {item.status} {item.time ? 'at ' + item.time : ''}
                    </List.Item>
                )}
            />
            </React.Fragment>
        );
    }
}

export default Detail;
