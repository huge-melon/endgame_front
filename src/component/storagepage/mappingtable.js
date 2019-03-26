import React from 'react';
import 'antd/dist/antd.css';
import './style/maptable.css';
import {
    Form, Icon, Button, Select,Col,
    Row
} from 'antd';
const Option = Select.Option;

let id = 0;

class DynamicFieldSet extends React.Component {


    constructor(props){
        super(props);
        this.state={
            sourceColumnName: [],
            targetColumnName: [],
            sourceMap:[],
            targetMap:[],
            tableMapName:[],
        }
    }

    componentWillMount(){
        this.setState({
            sourceColumnName: this.props.sourceList,
            targetColumnName: this.props.targetList
        })
    }


    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // can use data-binding to set

        console.log("keys: ")
        console.log(keys);
        console.log(k);
        console.log(this.state.sourceMap);
        console.log(this.state.targetMap);
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
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
                <Col span={5}>
                    <Form.Item {...formItemLayoutWithOutLabel}
                               required={true}
                               key={k}>
                        {getFieldDecorator('source'+k)(
                            <Select style={{ width: '100%' }} size="small" onChange={this.handleSelectChange.bind(this)}>
                                {this.state.sourceColumnName.map((item,index)=>{
                                    return <Option key={index} value={item.value}>{item.label}</Option>
                                })}
                            </Select>
                        )}
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item {...formItemLayoutWithOutLabel}
                               required={false}
                               key={k} >
                        {getFieldDecorator('target'+k)(
                            <Select style={{ width: '100%' }} size="small" onChange={this.handleSelectChange.bind(this)} >
                                {this.state.targetColumnName.map((item,index)=>{
                                    return <Option key={index} value={item.value}>{item.label}</Option>
                                })}
                            </Select>
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

const MapTable = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);
export  default MapTable;