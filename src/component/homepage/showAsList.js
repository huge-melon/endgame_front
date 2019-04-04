import React from "react";
import "antd/dist/antd.css";
import {List, Divider, Form, Input, Select, Button} from "antd";
import ReactJson from "react-json-view";
const {Option} = Select;
class ShowAsList1 extends React.Component{

    constructor(props){
        super(props);
        this.state={
            listData : []
        }
    }

    handleSubmit=()=>{
        let searchInfo = this.props.form.getFieldsValue();
        searchInfo.dbName=this.props.data.dbName;
        searchInfo.collectionName=this.props.data.collectionName;
        let targetUrl = `http://localhost:8080/test/mongoSearch?dbName=${searchInfo.dbName}&collectionName=${searchInfo.collectionName}&key_field=${searchInfo.key_field}&operation=${searchInfo.operation}&keyWord=${searchInfo.keyWord}`;
        console.log(targetUrl);
        fetch(targetUrl).then(res=>res.json())
            .then(body=>{
                //只有setstate的值变化了，才会重新渲染
                this.setState({
                    listData:body
                });
            });
    }

    render(){
        let listData = [];
        if(!listData){
            listData = this.props.data.datas;
        }
        else{
            listData = this.state.listData;
        }
        const { getFieldDecorator } = this.props.form;
        let k=0;
        return(
            <div>
                <Form layout={"inline"} >
                    <Form.Item label="字段：">
                        {getFieldDecorator("key_field")(
                            <Input placeholder="请输入字段"/>
                        )}
                    </Form.Item>
                    <Form.Item label={"操作类型："}>
                        {getFieldDecorator("operation")(
                            <Select style={{ width: '110px'}}>
                                <Option value="="> = </Option>
                                <Option value=">"> &gt; </Option>
                                <Option value="<"> &lt; </Option>
                                <Option value=">="> &gt;= </Option>
                                <Option value="<="> &lt;= </Option>
                                <Option value="IN"> IN </Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label={"关键字："}>
                        {getFieldDecorator("keyWord")(
                            <Input placeholder="请输入关键字" allowClear />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                            搜索
                        </Button>
                    </Form.Item>
                </Form>

                <Divider />
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
                    <List.Item key={++k}>
                        <ReactJson src={item}/>
                    </List.Item>
                )}
            />
            </div>
        )
    }
}


const ShowAsList = Form.create()(ShowAsList1);

export default ShowAsList;