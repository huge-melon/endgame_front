import {Input, Form, Select, Button, Row, Col} from 'antd';
import React from 'react';
import "antd/dist/antd.css";
const {Option} = Select;
class SearchCom extends React.Component{

    handleSubmit=( )=>{
        let dbInfo = this.props.form.getFieldsValue();
        console.log("**********")
        console.log(dbInfo);
    }

    render(){
        const { getFieldDecorator } = this.props.form;
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
                                <Option value=" = "> = </Option>
                                <Option value=" > "> &gt; </Option>
                                <Option value=" < "> &lt; </Option>
                                <Option value=" >= "> &gt;= </Option>
                                <Option value=" <= "> &lt;= </Option>
                                <Option value=" LIKE "> LIKE </Option>
                                <Option value=" NOT LIKE "> NOT LIKE </Option>
                                <Option value=" IN "> IN </Option>
                                <Option value=" NOT IN "> NOT IN </Option>
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

        </div>);
    }
}
const SearchBar = Form.create()(SearchCom);

export default SearchBar;