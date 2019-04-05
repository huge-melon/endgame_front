
import React from "react";
import { Tabs } from 'antd';
import "antd/dist/antd.css";
import TableMetaData from "./tablemetadata";
import TableData from "./tabledata";
import MongoMetaData from "./mongometadata";
import ShowAsList from "./showAsList";
const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

class MyTab extends React.Component{
    render(){
        return(
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="元数据" key="1">
                    {!this.props.showType&&<TableMetaData metadata={this.props.metadata} />}
                    {this.props.showType&&<MongoMetaData metadata={this.props.metadata} />}
                </TabPane>
                <TabPane tab="数据" key="2">
                    {!this.props.showType&&<TableData data={this.props.data}/>}
                    {this.props.showType&&<ShowAsList data={this.props.data}/>}
                </TabPane>
            </Tabs>
        )
    }
}

export default MyTab;