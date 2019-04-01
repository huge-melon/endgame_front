import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { List } from "antd";
import ReactJson from "react-json-view";


class ShowAsList extends React.Component{
/*在顶部添加搜索框，按字段搜索的框，可以动态添加搜索框的数量*/
    /*再美化一下展示
    * 思考如何将_id 转化为原来的格式*/
    render(){

        const listData = this.props.data;
        /*[{_id:XXX ,name:XXX, age:XXX},{_id:XXX,name:xxx,age:xxx}]
        * */
        console.log("showasList");
        console.log(listData);
        let k=0;
        return(
            <List
                itemLayout="vertical"
                size="small"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 10
                }}
                dataSource={listData}

                renderItem={item => (
                    <List.Item
                        key={++k}
                    >
                        {console.log("rederItem:")}
                        {console.log(item)}
                        {console.log(item._id)}
                       {/* <List.Item.Meta
                            title={++k}
                        />*/}
                        <ReactJson src={item}/>

                    </List.Item>
                )}
            />
        )
    }
}

export default ShowAsList;