import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import "./style.css"
import {
    Layout, Menu, Breadcrumb, Icon, Button,
} from 'antd';

import AddDBtable from "../component/addDBtable";
import TableData from "../component/tabledata";
import SearchCom from "../component/search"

import TableMetaData from "../component/tablemetadata"

const { SubMenu } = Menu;
const { Header, Content, Sider ,Table} = Layout;

/*重新设计addTablelist的结构，
而且不能只是简单的复制，要保留之前的信息

数据库类型
  - 数据库名
     - 表名

添加点击事件，点击后返回，从顶级菜单算起的完整的名称

应该后端按照[添加数据库名，和数据库类型]
，*/


class HomePage extends React.Component{


    constructor(props){
        super(props);
        this.state={
            mytext: [],
            tableName: [], // 列表显示的内容
            data: [],
            metadata: [],
        }
    }

    handleSubmit=()=>{
        var targetUrl = "http://localhost:8080/test/showtabledata?dbType=MySQL&dbName=mybatis&tableName=user";
        fetch(targetUrl)
            .then(function(response) {
                return response.json();
            })
            .then(myJson=> {
              //  console.log("myjsonL")
               // console.log(myJson);
                this.setState({
                    mytext: myJson
                })
            });

    }

/*
    handleTypeName=(name,index)=>{
        console.log("index:"+index);
        console.log(index);
/!*
        this.setState(prevState => {
            return {typeName: prevState.typeName+name}
        });*!/

        this.setState({
            typeName: index
        })
        console.log("TypaName:");
        console.log(name)
    }
*/


    // 点击标签返回，路径信息
    handleClick=(e)=>{
        if(e.keyPath.length == 3){
            let targetUrl = "http://localhost:8080/test/gettablemetadata?dbType=" + e.keyPath[2] + "&dbName=" + e.keyPath[1] + "&tableName="
                + e.keyPath[0];
            fetch(targetUrl).then(res=>res.json())
                .then(body=>{
                    console.log("targetUrl: ");
                    console.log(targetUrl);
                    console.log(body);
                    this.setState({metadata: body})
                });

            let targetUrl2 = "http://localhost:8080/test/gettabledata?dbType=" + e.keyPath[2] + "&dbName=" + e.keyPath[1] + "&tableName="
                + e.keyPath[0];
            fetch(targetUrl2).then(res=>res.json())
                .then(body=>{
                    console.log("targetUrl2: ");
                    console.log(targetUrl2);
                    console.log(body);
                    this.setState({data: body})
                });
        }
    }


    /* 控制树状列表显示的内容*/
    addTableList(tableNameList){
        let hasThisType = false;
        let temp = this.state.tableName;
        //同一个数据库的放在同一个父标签下边
        for(let key in temp){
            if(temp[key].title == tableNameList.title){
                temp[key].children = [...temp[key].children,tableNameList.children]
                hasThisType=true;
            }
        }
        if(!hasThisType){
            let newDB = {title:"",children:[]};
            newDB.title= tableNameList.title
            newDB.children = [...newDB.children,tableNameList.children];//改成里边的值
            temp = [...temp,newDB];
        }
        this.setState({ tableName: temp })
    }

    mySubMenu=(data)=>{
          return data.map((menu,index)=>{
                if(menu.children){
                    return (
                        <SubMenu key={menu.title} title={<span> <Icon type="database" /> {menu.title} </span>} onClick={this.handleClick.bind(this)} >{/*onClick={this.handleTypeName.bind(this,menu.title)}*/}
                            {this.mySubMenu(menu.children)}
                            </SubMenu>
                    )}
                else {
                  /*拆开写， dbname和dbtype放在一起，字符串，直接查，*/
                    return <Menu.Item key={menu.TABLE_NAME} > {menu.TABLE_NAME} </Menu.Item> /*onClick={this.handleClick.bind(this)}*/
                }
            })
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
                                {this.mySubMenu(this.state.tableName)}

                                {/*添加数据库的按钮，将父组件中的addTableList方法传递给它
                                    如果不bind() this 的话，addTableList中的this将会指向<AddDBtable>*/}
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
                                表数据|元数据

                                <TableMetaData metadata={this.state.metadata} />
                                <TableData data={this.state.data} />//直接解析 data，获得表头数据


                                {/*
                                <SearchCom />
                                <Button onClick={this.handleSubmit.bind(this)} type="primary">
                                    提交
                                </Button>

                                {console.log(this.state.mytext)}
                               {this.state.mytext.id}
                               {this.state.mytext.username}*/}

                            </Content>
                        </Layout>
                    </Layout>
                </Layout >
            </div>
        );

    }
}

export default HomePage;