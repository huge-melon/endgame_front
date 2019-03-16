import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import "./style.css"
import {
    Layout, Menu, Breadcrumb, Icon, Button,
} from 'antd';

import AddDBtable from "../component/addDBtable";
import SearchCom from "../component/search"

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;




class HomePage extends React.Component{


    constructor(props){
        super(props);
        this.state={
            mytext: "",

            tableName: ""

        }
    }

    handleSubmit=()=>{
        var targetUrl = "http://localhost:8080/test/showtabledata?dbType=MySQL&dbName=mybatis&tableName=user";
        fetch(targetUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                console.log(myJson);

            });
    }

    addTableList=(tableNameList)=>{
        this.setState({tableName:tableNameList})
        console.log(this.state.tableName)
    }


    render(){
        return(
            <div className="HomePage">
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={["2"]}
                            style={{ lineHeight: "64px" }}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{ background: "#fff" }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={["1"]}
                                defaultOpenKeys={["sub1"]}
                                style={{ height: "100%", borderRight: 0 }}
                            >




                                <SubMenu
                                    key="sub1"
                                    title={
                                        <span>
               <Icon type="database" />
                  subnav 1
                    </span>
                                    }
                                >
                                    <Menu.Item key="1">option1</Menu.Item>
                                    <Menu.Item key="2">option2</Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub2"
                                    title={
                                        <span>
                  <Icon type="database" />
                  subnav 2
                    </span>
                                    }
                                >
                                    <Menu.Item key="5">option5</Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub3"
                                    title={
                                        <span>
                  <Icon type="database" />
                  subnav 3
                    </span>
                                    }
                                >
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                                {/*添加数据库的按钮，将父组件中的addTableList方法传递给它*/}
                                <AddDBtable  addTableList={this.addTableList.bind(this)} />
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: "0 24px 24px" }}>
                            <Breadcrumb style={{ margin: "16px 0" }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                style={{
                                    background: "#fff",
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280
                                }}
                            >

                                <SearchCom />
                                Content

                                <Button onClick={this.handleSubmit} type="primary">
                                    提交
                                </Button>
                                <div>{this.state.mytext.id}</div>
                                <diV>{this.state.mytext.username}</diV>

                            </Content>
                        </Layout>
                    </Layout>
                </Layout >
            </div>
        );

    }
}

export default HomePage;