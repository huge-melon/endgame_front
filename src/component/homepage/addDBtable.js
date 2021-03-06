import React from "react";
import {
    Drawer,
    Form,
    Button,
    Col,
    Row,
    Input,
    Select,
    DatePicker,
    Icon,
    message,
} from "antd";
import "antd/dist/antd.css";

const { Option } = Select;

class AddTable extends React.Component {


    state = {
        visible: false,
    };

    sendTableName=(tableName)=>{
        this.props.addTableList(tableName)
    }


    handleSubmit=()=>{
        let dbInfo = this.props.form.getFieldsValue();
        let targetUrl = "http://localhost:8080/test/adddb";
        fetch(targetUrl,
            {
                method:"POST",
                body:JSON.stringify(dbInfo),
                headers: {
                    'content-type': 'application/json'
                },
            }).then(res=>res.json())
            .then(body=>{
                console.log("addDB: ");
                console.log(JSON.stringify(dbInfo));
                console.log(body)
                if(body.error){
                    console.log("Connect error")
                    message.error(body.error);
                }
                else{
                    message.success("连接成功");
                    this.sendTableName(body);
                }
            });
      //  var targetUrl2="http://localhost:8080/test/adddb?dbType=${dbInfo.dbType}";
        dbInfo.dbType="";
        dbInfo.dbUrl="";
        dbInfo.dbPort="";
        dbInfo.dbName="";
        dbInfo.userName="";
        dbInfo.userPassword="";
        this.props.form.setFieldsValue(dbInfo);

        this.setState({
            visible: false
        });

    }

    showDrawer = () => {
        this.setState({
            visible: true
        });
    };

    onClose = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Button type="primary" onClick={this.showDrawer}>
                    <Icon type="plus" /> 添加数据库
                </Button>
                <Drawer
                    title="新建数据库连接"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    style={{
                        overflow: "auto",
                        height: "calc(100% - 108px)",
                        paddingBottom: "108px"
                    }}
                >
                    <Form layout="vertical" hideRequiredMark>

                        <Row gutter={12}>
                            <Col span={14} offset={7}>
                                <Form.Item label="数据库类型">
                                    {getFieldDecorator("dbType", {
                                        rules: [
                                            { required: true, message: "Please select database type" }
                                        ]
                                    })(
                                        <Select placeholder="Please select database type">
                                            <Option value="MySQL">MySQL</Option>
                                            <Option value="Oracle">Oracle</Option>
                                            <Option value="PostgreSQL">PostgreSQL</Option>
                                            <Option value="MongoDB">MongoDB</Option>
                                            {/*<Option value="Neo4j">Neo4j</Option>
                                            <Option value="JanusGraph">JanusGraph</Option>*/}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>


                        <Row gutter={12}>
                            <Col span={14} offset={7}>
                                <Form.Item label="主机">
                                    {getFieldDecorator("dbUrl", {
                                        rules: [{ required: true, message: "Please enter dbUrl" }]
                                    })(
                                        <Input
                                            style={{ width: "100%" }}
                                            addonBefore="http://"
                                            placeholder="Please enter dbUrl"
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>


                        <Row gutter={12}>
                            <Col span={14} offset={7}>
                                <Form.Item label="端口">
                                    {getFieldDecorator("dbPort", {
                                        rules: [
                                            { required: true, message: "Please enter port" }
                                        ]
                                    })(<Input placeholder="Please enter user port" />)}
                                </Form.Item>
                            </Col>

                        </Row>

                        <Row gutter={12}>
                            <Col span={14} offset={7}>
                                <Form.Item label="数据库名称">
                                    {getFieldDecorator("dbName", {
                                        rules: [
                                            { required: true, message: "Please enter database name" }
                                        ]
                                    })(<Input placeholder="Please enter database name" />)}
                                </Form.Item>
                            </Col>

                        </Row>

                        <Row gutter={12}>
                            <Col span={14} offset={7}>
                                <Form.Item label="用户名">
                                    {getFieldDecorator("userName", {
                                        rules: [
                                            { required: true, message: "Please enter userName" }
                                        ]
                                    })(<Input placeholder="Please enter user port" />)}
                                </Form.Item>
                            </Col>

                        </Row>

                        <Row gutter={12}>
                            <Col span={14} offset={7}>
                                <Form.Item label="密码">
                                    {getFieldDecorator("userPassword", {
                                        rules: [
                                            { required: true, message: "Please enter Password" }
                                        ]
                                    })(<Input type="password" placeholder="Please enter Password" />)}
                                </Form.Item>
                            </Col>

                        </Row>



                    </Form>
                    <div
                        style={{
                            position: "absolute",
                            left: 0,
                            bottom: 0,
                            width: "100%",
                            borderTop: "1px solid #e9e9e9",
                            padding: "10px 16px",
                            background: "#fff",
                            textAlign: "right"
                        }}
                    >
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                            测试
                        </Button>
                        <Button onClick={this.handleSubmit} type="primary">
                            提交
                        </Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}

const AddDBtable = Form.create()(AddTable);

export default AddDBtable;
