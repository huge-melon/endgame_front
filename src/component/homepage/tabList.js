
import React from "react"
import { Tabs } from 'antd';
import "antd/dist/antd.css";
import TableMetaData from "./tablemetadata";
import TableData from "./tabledata";

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

class MyTab extends React.Component{
    render(){
        return(
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="元数据" key="1">
                    <TableMetaData metadata={this.props.metadata} />
                </TabPane>
                <TabPane tab="数据" key="2">
                    <TableData data={this.props.data} />
                </TabPane>
            </Tabs>
        )
    }
}

export default MyTab;