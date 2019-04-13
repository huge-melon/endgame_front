import React from "react"
import {Checkbox, Button, Cascader, Select, Icon , message ,Radio } from 'antd';
import "antd/dist/antd.css";

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;


class DelDuplicated extends React.Component{

    constructor(props){
        super(props);
        this.state={
            selectTable:[], //级联选择中选中的表名
            tableName: [], // 列表显示的内容
            columnName: [],
            checkedValues: [], // 多选框中选中的
            selectID: "",
        }
    }

    componentWillMount(){
        let temp = JSON.parse(localStorage.getItem("tableName"));
        let table = [];
        if(temp){
            for(let first in temp){
                if(temp[first].title == "MongoDB"){
                    continue;
                }
                let grandfather = {value: "",label: "",children: []};
                grandfather.value = temp[first].title;
                grandfather.label = temp[first].title;

                for(let second in temp[first].children){
                    let father = {value: "",label: "",children: []};
                    father.value = temp[first].children[second].title;
                    father.label = temp[first].children[second].title;

                    for(let third in temp[first].children[second].children){
                        let son = {};
                        son.value = temp[first].children[second].children[third].TABLE_NAME;
                        son.label = temp[first].children[second].children[third].TABLE_NAME;
                        father.children = [...father.children,son];

                    }
                    grandfather.children = [...grandfather.children,father];
                }
                table = [...table,grandfather];
            }
            this.setState({
                tableName : table
            })
        }
    };

    //多选框中的内容
    CheckboxonChange(checkedValues) {
        console.log('checked = ', checkedValues);
        this.setState({
            checkedValues: checkedValues
        })
    }

    //根据级联选择框的内容从数据库中提取元数据
    CascaderonChange(value) {
        console.log(value);
        if(value.length > 0 ){
            let targetUrl = "http://localhost:8080/test/gettablemetadata?dbType=" + value[0] + "&dbName=" + value[1] + "&tableName="
                + value[2];
            let columns = [];
            fetch(targetUrl).then(res=>res.json())
                .then(body=>{
                    for(let key in body){
                        let col = {};
                        col.value = body[key].COLUMN_NAME;
                        col.label = body[key].COLUMN_NAME;
                        columns= [...columns,col];
                    }
                    this.setState({
                        columnName: columns,
                        selectTable: value
                    })
                });
        }
        else {
            this.setState({
                columnName: [],
                selectTable: []
            })
        }
    }

    SelecthandleChange(value) {
        console.log(`selected ${value}`);
        this.setState({
            selectID: value
        })
    }

    SelecthandleBlur() {
        console.log('blur');
    }

    SelecthandleFocus() {
        console.log('focus');
    }

    handleCilckButton(){

        let tables = this.state.selectTable;
        let cols = this.state.checkedValues.toString();
        let id = this.state.selectID;

        if( tables == [] ||  cols == "" ||  id == "") {
            message.error("请重新选择操作类型");
            this.setState({
                selectTable:[], //级联选择中选中的表名
                tableName: [], // 列表显示的内容
                columnName: [],
                checkedValues: [], // 多选框中选中的
                selectID: ""
            })
        }
        else{
            let targetUrl = "http://localhost:8080/test/delDuplicatedData?dbType=" + tables[0] + "&dbName="+tables[1]+"&tableName="+tables[2]+"&columnsName="+cols+"&id="+id;
            console.log(targetUrl);
            fetch(targetUrl).then(res=>res.text())
                .then(body=>{
                    if(body == "true"){
                        message.success('删除成功');
                    }
                });
        }
    }

    render(){
        return(
            <div>
                选择进行操作的表名：
                <br /><br />
                <Cascader options={this.state.tableName} onChange={this.CascaderonChange.bind(this)} placeholder="Please select" />
                <br /><br /><br />
                选择要进行对比的列：
                <br /><br />
                <CheckboxGroup options={this.state.columnName}  onChange={this.CheckboxonChange.bind(this)} />{/*选择每列展示的行*/}
                <br /><br /><br />
                选择主键：
                <br /><br />
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a column"
                    optionFilterProp="children"
                    onChange={this.SelecthandleChange.bind(this)}
                    onFocus={this.SelecthandleFocus}
                    onBlur={this.SelecthandleBlur}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {this.state.columnName.map((item,index)=>{
                            return <Option key={index} value={item.value}>{item.label}</Option>
                        })}
                </Select>
                <br /><br /><br />
                是否区分大小写：
                <br /><br />
                <Radio.Group defaultValue="yes" buttonStyle="solid">
                    <Radio.Button value="yes">是</Radio.Button>
                    <Radio.Button value="no">否</Radio.Button>
                </Radio.Group>

                <br /><br /><br />

                <Button type="primary" onClick={this.handleCilckButton.bind(this)}>
                    <Icon type="file-sync" /> 执行操作
                </Button>


            </div>

        )

    }

}
export default DelDuplicated;

