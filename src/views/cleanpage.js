import React, { Component } from 'react';
import "antd/dist/antd.css";
import "./style.css"
import {
    Layout, Menu, Breadcrumb, Icon, Button,
} from 'antd';
import { Route,NavLink } from 'react-router-dom';
import DelDuplicated from "../component/cleanpage/delduplicated";
import DeleteByNull from "../component/cleanpage/deletebynull";
import DeleteByCondition from "../component/cleanpage/deletebycondition";
import DeleteTableColumn from "../component/cleanpage/deletetablecolumn";
import CompletFiled from "../component/cleanpage/completfiled";

const { SubMenu } = Menu;
const { Header, Content, Sider ,Table} = Layout;



class CleanPage extends React.Component{
    render(){
        return(
            <div className="CleanPage">
                <Layout>
                    <Sider width={200} style={{ background: "#fff" }}>
                        <Menu
                            mode="inline"
                           // defaultSelectedKeys={["1"]}
                            //defaultOpenKeys={["sub1"]}
                            style={{ height: "100%", borderRight: 0 }}
                        >
                            <Menu.Item key="delduplicated">
                                <NavLink to="/dataclean/delduplicated">
                                <Icon type="filter" />
                                    去除重复记录
                                </NavLink>
                            </Menu.Item>

                            <SubMenu key="sub1" title={<span><Icon type="close-square" />删除记录</span>}>
                                <Menu.Item key="deleteByCondition"><NavLink to="/dataclean/deleteByCondition">按条件删除</NavLink></Menu.Item>
                                <Menu.Item key="deleteByNull"><NavLink to="/dataclean/deleteByNull">按缺失项删除</NavLink></Menu.Item>
                                <Menu.Item key="deleteTableColumn"><NavLink to="/dataclean/deleteTableColumn">删除指定列</NavLink></Menu.Item>
                            </SubMenu>
                        {/*    <SubMenu key="sub2" title={<span><Icon type="form" />字段修改</span>}>
                                <Menu.Item key="5">日期</Menu.Item>
                                <Menu.Item key="6">前后缀</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="completFiled">
                                <Icon type="plus-square" />
                                <span><NavLink to="/dataclean/completFiled">字段补全</NavLink></span>
                            </Menu.Item>*/}
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: "0 24px 24px" }}>
                        <Content
                            style={{
                                background: "#fff",
                                padding: 24,
                                margin: 0,
                                minHeight: 280
                            }}
                        >
                            <main>
                                <Route path="/dataclean/delduplicated"  component={DelDuplicated} />
                                <Route path="/dataclean/deleteByNull" component={DeleteByNull}/>
                                <Route path="/dataclean/deleteByCondition" component={DeleteByCondition}/>
                                <Route path="/dataclean/deleteTableColumn" component={DeleteTableColumn}/>

                                <Route path="/dataclean/completFiled" component={CompletFiled}/>

                            </main>

                        </Content>
                    </Layout>
                </Layout >
            </div>
        );
    }
}

export default CleanPage;