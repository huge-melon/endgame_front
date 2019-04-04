import React from "react"
import {Cascader, Icon, Layout, Radio,Menu} from "antd";
import { Route,NavLink } from 'react-router-dom';
import Rdb2Rdb from "../component/storagepage/rdb2rdb";

const { SubMenu } = Menu;
const { Header, Content, Sider ,Table} = Layout;



class StoragePage extends React.Component {
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
                            <Menu.Item key="rdb2rdb">
                                <NavLink to="/dataexport/rdb2rdb">
                                    <Icon type="filter" />
                                    关系型到关系型
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="rdb2nodb">
                                <Icon type="plus-square" />
                                <span>关系型到非关系型</span>
                            </Menu.Item>
                         {/*   <Menu.Item key="nodb2nodb">
                                <Icon type="plus-square" />
                                <span>非关系型到非关系型</span>
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
                                <Route path="/dataexport/rdb2rdb"  component={Rdb2Rdb} />
                            </main>

                        </Content>
                    </Layout>
                </Layout >
            </div>
        );
    }


}

export default StoragePage;