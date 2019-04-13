import React, { Component } from 'react';
import "antd/dist/antd.css";
import "./style.css";
import {
    Layout, Menu, Breadcrumb, Icon, Button,
} from 'antd';
import { Route,NavLink } from 'react-router-dom';
import DelDuplicated from "../component/cleanpage/sql/delduplicated";
import DeleteByNull from "../component/cleanpage/sql/deletebynull";
import DeleteByCondition from "../component/cleanpage/sql/deletebycondition";
import DeleteTableColumn from "../component/cleanpage/sql/deletetablecolumn";
import CompletFiled from "../component/cleanpage/sql/completfiled";
import UpdateColumnType from "../component/cleanpage/sql/updatecolumntype";
import UpdateColumnValue from "../component/cleanpage/sql/updatecolumnvalue";
import CutString from "../component/cleanpage/sql/cutstring";
import ReplaceString from "../component/cleanpage/sql/replaceString";
import DataVerify from "../component/cleanpage/sql/dataverify";
import Delduplicated_nosql from "../component/cleanpage/nosql/delduplicated_nosql";
import Deletebynull_nosql from "../component/cleanpage/nosql/deletebynull_nosql";
import DeleteColKey from "../component/cleanpage/nosql/deleteColKey_nosql";
import DeleteByCondition_nosql from "../component/cleanpage/nosql/deleteByCondition_nosql";
import ReplaceString_nosql from "../component/cleanpage/nosql/replaceString_nosql";
import CutString_nosql from "../component/cleanpage/nosql/cutstring_nosql";
import Dataverify_nosql from "../component/cleanpage/nosql/dataverify_nosql";
import CompletFiled_nosql from "../component/cleanpage/nosql/completfiled_nosql";


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

                            <SubMenu key = "SQL" title={<span>关系型数据库</span>}>

                            <Menu.Item key="delduplicated">
                                <NavLink to="/dataclean/delduplicated">
                                <Icon type="filter" />
                                    去除重复记录
                                </NavLink>
                            </Menu.Item>

                            <SubMenu key="deleteData" title={<span><Icon type="close-square" />删除记录</span>}>
                                <Menu.Item key="deleteByCondition"><NavLink to="/dataclean/deleteByCondition">按条件删除</NavLink></Menu.Item>
                                <Menu.Item key="deleteByNull"><NavLink to="/dataclean/deleteByNull">按缺失项删除</NavLink></Menu.Item>
                                <Menu.Item key="deleteTableColumn"><NavLink to="/dataclean/deleteTableColumn">删除指定列</NavLink></Menu.Item>
                            </SubMenu>

                            <SubMenu key="updateData" title={<span><Icon type="form" />修改字段</span>}>
                                {/*<Menu.Item key="updateValue"><NavLink to="/dataclean/updateValue">日期格式转换</NavLink></Menu.Item>*/}
                                <Menu.Item key="updateType"><NavLink to="/dataclean/updateType">类型修改</NavLink></Menu.Item>
                                {/*<Menu.Item key="updateType"><NavLink to="/dataclean/updateType">字段名修改</NavLink></Menu.Item>*/}
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
                            </SubMenu>

                            <SubMenu key = "NOSQL" title={<span>NoSQL数据库</span>}>
                                <Menu.Item key="delduplicated_nosql">
                                    <NavLink to="/dataclean/delduplicated_nosql">
                                        <Icon type="filter" />
                                        去除重复记录
                                    </NavLink>
                                </Menu.Item>
                                <SubMenu key="deleteData_nosql" title={<span><Icon type="close-square" />删除文档</span>}>
                                    <Menu.Item key="deleteByCondition_nosql"><NavLink to="/dataclean/deleteByCondition_nosql">按条件删除</NavLink></Menu.Item>
                                    <Menu.Item key="deleteByNull_nosql"><NavLink to="/dataclean/deleteByNull_nosql">按缺失项删除</NavLink></Menu.Item>
                                    <Menu.Item key="deleteColKey_nosql"><NavLink to="/dataclean/deleteColKey_nosql">删除指定键</NavLink></Menu.Item>
                                </SubMenu>
                                <SubMenu key="updateData_nosql" title={<span><Icon type="form" />修改字段</span>}>
                                    {/*<Menu.Item key="updateValue_nosql"><NavLink to="/dataclean/updateValue">日期格式转换</NavLink></Menu.Item>*/}
                                    {/*<Menu.Item key="updateType_nosql"><NavLink to="/dataclean/updateType">字段名修改</NavLink></Menu.Item>*/}
                                    <Menu.Item key="cutString_nosql"><NavLink to="/dataclean/cutString_nosql">字符串剪切</NavLink></Menu.Item>
                                    <Menu.Item key="replaceString_nosql"><NavLink to="/dataclean/replaceString_nosql">字符串替换</NavLink></Menu.Item>
                                    <Menu.Item key="dataVerify_nosql"><NavLink to="/dataclean/dataVerify_nosql">数据验证</NavLink></Menu.Item>
                                </SubMenu>

                                <Menu.Item key="completFiled_nosql">
                                    <NavLink to="/dataclean/completFiled_nosql">
                                        <Icon type="plus-square" />
                                        <span>键值补全</span>
                                    </NavLink>
                                </Menu.Item>
                            </SubMenu>
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
                                <Route path="/dataclean/delduplicated_nosql"  component={Delduplicated_nosql} />
                                <Route path="/dataclean/deleteByNull" component={DeleteByNull}/>
                                <Route path="/dataclean/deleteByNull_nosql" component={Deletebynull_nosql}/>
                                <Route path="/dataclean/deleteByCondition" component={DeleteByCondition}/>
                                <Route path="/dataclean/deleteByCondition_nosql" component={DeleteByCondition_nosql}/>
                                <Route path="/dataclean/deleteTableColumn" component={DeleteTableColumn}/>
                                <Route path="/dataclean/deleteColKey_nosql" component={DeleteColKey}/>
                                <Route path="/dataclean/completFiled" component={CompletFiled}/>
                                <Route path="/dataclean/completFiled_nosql" component={CompletFiled_nosql}/>
                                <Route path="/dataclean/cutString" component={CutString}/>
                                <Route path="/dataclean/cutString_nosql" component={CutString_nosql}/>
                                <Route path="/dataclean/replaceString" component={ReplaceString}/>
                                <Route path="/dataclean/replaceString_nosql" component={ReplaceString_nosql}/>
                                <Route path="/dataclean/dataVerify" component={DataVerify}/>
                                <Route path="/dataclean/dataVerify_nosql" component={Dataverify_nosql}/>


                                <Route path="/dataclean/updateValue" component={UpdateColumnValue}/>
                                <Route path="/dataclean/updateType" component={UpdateColumnType}/>
                            </main>
                        </Content>
                    </Layout>
                </Layout >
            </div>
        );
    }
}

export default CleanPage;