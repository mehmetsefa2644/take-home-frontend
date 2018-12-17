import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import API from '../api';

class Accounts extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }
    }

    toUSD(cents) {
        var dollars = cents / 100;
        return dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
    }

    componentDidMount() {
        API.get('accounts')
            .then(res => {
                console.log(res)
                this.setState({data: res.data});
            })
    }

    render() {
        return (
            <List
                itemLayout="horizontal"
                dataSource={this.state.data}
                renderItem={(item) => (
                    <List.Item>
                        <Link to={'/detail/' + item.id}>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                title={item.name}
                                description={'Today: ' + this.toUSD(item.today) + ', This Week: ' + this.toUSD(item.this_week) + ', This Month: ' + this.toUSD(item.this_month)}
                            />
                        </Link>
                    </List.Item>
                )}
            />
        );
    }
}

export default Accounts;
