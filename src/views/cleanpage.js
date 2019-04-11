import React, { Component } from 'react';
import "antd/dist/antd.css";
import "./style.css";
import {
    Layout, Menu, Breadcrumb, Icon, Button,
} from 'antd';
import { Route,NavLink } from 'react-router-dom';
import DelDuplicated from "../component/cleanpage/delduplicated";
import DeleteByNull from "../component/cleanpage/deletebynull";
import DeleteByCondition from "../component/cleanpage/deletebycondition";
import DeleteTableColumn from "../component/cleanpage/deletetablecolumn";
import CompletFiled from "../component/cleanpage/completfiled";
import UpdateColumnType from "../component/cleanpage/updatecolumntype";
import UpdateColumnValue from "../component/cleanpage/updatecolumnvalue";
import CutString from "../component/cleanpage/cutstring";
import ReplaceString from "../component/cleanpage/replaceString";
import DataVerify from "../component/cleanpage/dataverify";

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

                            <SubMenu key="sub2" title={<span><Icon type="form" />修改字段</span>}>
{/*
                                <Menu.Item key="updateValue"><NavLink to="/dataclean/updateValue">日期格式转换</NavLink></Menu.Item>
*/}
                                <Menu.Item key="updateType"><NavLink to="/dataclean/updateType">类型修改</NavLink></Menu.Item>
                                <Menu.Item key="cutString"><NavLink to="/dataclean/cutString">字符串剪切</NavLink></Menu.Item>
                                <Menu.Item key="replaceString"><NavLink to="/dataclean/replaceString">字符串替换</NavLink></Menu.Item>
                                <Menu.Item key="dataVerify"><NavLink to="/dataclean/dataVerify">数据验证</NavLink></Menu.Item>
                            </SubMenu>

                            <Menu.Item key="completFiled">
                                <NavLink to="/dataclean/completFiled">
                                <Icon type="plus-square" />
                                <span>字段补全</span>
                                </NavLink>
                            </Menu.Item>

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
                                <Route path="/dataclean/updateType" component={UpdateColumnType}/>
                                <Route path="/dataclean/updateValue" component={UpdateColumnValue}/>
                                <Route path="/dataclean/cutString" component={CutString}/>
                                <Route path="/dataclean/replaceString" component={ReplaceString}/>
                                <Route path="/dataclean/dataVerify" component={DataVerify}/>
                            </main>

                        </Content>
                    </Layout>
                </Layout >
            </div>
        );
    }
}

export default CleanPage;