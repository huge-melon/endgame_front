import React from 'react';
import 'antd/dist/antd.css';
import './style/conditions.css';
import {
    Form, Icon, Button, Select,Col, Row, Input
} from 'antd';

const InputGroup = Input.Group;
const Option = Select.Option;

let id = 0;

class Condition extends React.Component {

    constructor(props){
        super(props);
        this.state={
            ColumnName: [],

        }
    }



    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        this.setState({
            ColumnName: this.props.columnNameList,
        })
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    sendTable(){
        let mapTable = this.props.form.getFieldsValue();
        console.log("sendTable");
        console.log(mapTable);
        this.setState({
            tableMapName: mapTable
        })
        this.props.receiveFromSon(mapTable);

    }

    handleSelectChange(){
        let mapTable = this.props.form.getFieldsValue();
        /* console.log("mapTable");
         console.log(mapTable);*/
        /* this.setState({
             tableMapName: mapTable
         })*/
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (




            <Row key={k} gutter={0}>
                <Col span={9}>
                    <Form.Item {...formItemLayoutWithOutLabel}
                               required={true}
                               key={k}>
                        {getFieldDecorator('source'+k)(
                            <InputGroup compact>
                                <Select style={{ width: '50%' }}  onChange={this.handleSelectChange.bind(this)}>
                                    {this.state.ColumnName.map((item,index)=>{
                                        return <Option key={index} value={item.value}>{item.label}</Option>
                                    })}
                                </Select>
                                <Input style={{ width: '50%' }} defaultValue="请输入条件" />
                            </InputGroup>
                        )}
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                </Col>
            </Row>
        ));
        return (
            <div>
                <Form>
                    {formItems}
                    <Row key="button" gutter={0}>
                        <Col span={5}>
                            <Form.Item {...formItemLayoutWithOutLabel}>
                                <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
                                    <Icon type="plus" /> Add field
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item {...formItemLayoutWithOutLabel}>
                                <Button type="dashed" onClick={this.sendTable.bind(this)} style={{ width: '30%' }}>
                                    提交
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const Conditions = Form.create({ name: 'dynamic_condition_item' })(Condition);
export  default Conditions;