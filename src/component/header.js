import { Menu, Icon } from 'antd';
import React from "react";
import "antd/dist/antd.css";
import { NavLink } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class MyHeader extends React.Component {
    state = {
        current: 'mail',
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                <Menu.Item key="datasource">
                    <NavLink to="/">
                    <Icon type="database" />配置数据源</NavLink>
                </Menu.Item>
                <Menu.Item key="dataclean" >
                    <NavLink to="/dataclean">
                        <Icon type="edit" />数据处理</NavLink>
                </Menu.Item>

                <Menu.Item key="dataexport">
                    <NavLink to="/dataexport"><Icon type="export" />数据导出</NavLink>
                </Menu.Item>
            </Menu>
        );
    }
}

export default MyHeader;