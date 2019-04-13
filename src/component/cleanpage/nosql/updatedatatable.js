import React from "react";

import "antd/dist/antd.css";
import "./style/editTable.css";


import {Table, Input, Button, Popconfirm, Form, Modal, message} from "antd";

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };


    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {form => {
                            this.form = form;
                            return editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {form.getFieldDecorator(dataIndex, {
                                        rules: [
                                            {
                                                required: true,
                                                message: `${title} is required.`
                                            }
                                        ],
                                        initialValue: record[dataIndex]
                                    })(
                                        <Input
                                            ref={node => (this.input = node)}
                                            onPressEnter={this.save}
                                            onBlur={this.save}
                                        />
                                    )}
                                </FormItem>
                            ) : (
                                <div
                                    className="editable-cell-value-wrap"
                                    style={{ paddingRight: 24 }}
                                    onClick={this.toggleEdit}
                                >
                                    {restProps.children}
                                </div>
                            );
                        }}
                    </EditableContext.Consumer>
                ) : (
                    restProps.children
                )}
            </td>
        );
    }
}

class UpdateDataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dataSource:[],
            //对话框
            visible: false,
        }
        this.columns = [
            {
                title: "id",
                dataIndex: "id",
                width: "30%",
                key : "id",
            },
            {
                title: "输入字段",
                dataIndex: "sourcedata",
                key : "sourcedata",
            },
            {
                title: "输出字段",
                dataIndex: "targetdata",
                key : "targetdata",
                editable: true
            },
        ];
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            dataSource: nextProps.data,
            visible: nextProps.isShowModal,
        })
    }


    modifyShow=()=>{
        this.props.configShow()
    }


    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        console.log("1");
        console.log(
            newData.splice(index, 1, {
                ...item,
                ...row
            })
        );
        newData.splice(index, 1, {
            ...item,
            ...row
        });
        this.setState({ dataSource: newData });
        console.log("2");
        console.log(newData);
    };

    //对话框


    //点击交，调用方法，将数据DataSource传回后台，更新
    handleOk = () => {
        this.setState({
            visible: false,
        });
        //post 方法

        let targetUrl = "http://localhost:8080/test/saveUpdateDate";
        let connMess= this.props.connectMess;
        connMess.data=this.state.dataSource;

        console.log("saveUpdate: ");
        console.log(connMess);
        console.log(JSON.stringify(connMess));
        fetch(targetUrl,
            {
                method:"POST",
                body:JSON.stringify(connMess),
                headers: {
                    'content-type': 'application/json'
                },
            }).then(res=>res.text())
            .then(body=>{
                console.log("saveUpdate: ");
                console.log(JSON.stringify(connMess));
                console.log(body)
                if(body == "true"){
                    message.success('修改成功');
                }
                else{
                    message.error('出现未知错误');
                }

            });
        this.modifyShow();


    }

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
        this.modifyShow();
    }



    render() {

        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell
            }
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave
                })
            };
        });
        return (
            <div>
                <Modal
                    title="修改数据"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                <Table
                    components={components}
                    rowClassName={() => "editable-row"}
                    bordered
                    dataSource={this.state.dataSource}
                    columns={columns}
                    size="small"
                />
                </Modal>
            </div>
        );
    }
}
export default UpdateDataTable;