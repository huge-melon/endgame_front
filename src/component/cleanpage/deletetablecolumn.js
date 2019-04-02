import React from "react"
import {Button, Cascader, Select, Icon , message  } from 'antd';
import "antd/dist/antd.css";

const Option = Select.Option;


class DeleteTableColumn extends React.Component{

    constructor(props){
        super(props);
        this.state={
            selectTable:[], //级联选择中选中的表名
            tableName: [], // 列表显示的内容
            columnName: [],
            selectColumn: "",
        }
    }

    componentWillMount(){
        let temp = JSON.parse(localStorage.getItem("tableName"));
        let table = [];
        if(temp){
            for(let first in temp){
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
            selectColumn: value
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
        let selectColumn = this.state.selectColumn;

        if( tables == [] ||  selectColumn == "") {
            message.error("请重新选择操作类型");
            this.setState({
                selectTable:[], //级联选择中选中的表名
                tableName: [], // 列表显示的内容
                columnName: [],
                selectColumn: ""
            })
        }
        else{
            let targetUrl = "http://localhost:8080/test/deleteTableColumn?dbType=" + tables[0] + "&dbName="+tables[1]+"&tableName="+tables[2]+"&columnName="+selectColumn;
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
                选择要删除的列：
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

                {/*设计成多选框，后台遍历传递的列名，分别执行*/}
                <br /><br /><br />

                <Button type="primary" onClick={this.handleCilckButton.bind(this)}>
                    <Icon type="file-sync" /> 执行操作
                </Button>


            </div>

        )

    }

}
export default DeleteTableColumn;

