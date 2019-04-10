import React from "react";
import "antd/dist/antd.css";
import {Button, Cascader, Icon, Input, message, Select} from "antd";

const Option = Select.Option;

const options = [{
    value: 'boolean',
    label: 'boolean',
    children: [{
        value: 'BOOLEAN',
        label: 'BOOLEAN',
    }],
}, {
    value: 'character',
    label: 'character',
    children: [{
        value: 'CHAR',
        label: 'CHAR',
    },{
        value: 'VARCHAR',
        label: 'VARCHAR',
    }],
},{
    value: 'bit',
    label: 'bit',
    children: [{
        value: 'BIT',
        label: 'BIT',
    },{
        value: 'BIT VARYING',
        label: 'BIT VARYING',
    }],
},{
    value: 'exact numeric',
    label: 'exact numeric',
    children: [{
        value: 'NUMERIC',
        label: 'NUMERIC',
    },{
        value: 'DECIMAL',
        label: 'DECIMAL',
    },{
        value: 'INTEGER',
        label: 'INTEGER',
    },{
        value: 'SMALLINT',
        label: 'SMALLINT',
    }],
},{
    value: 'approximate numeric',
    label: 'approximate numeric',
    children: [{
        value: 'FLOAT',
        label: 'FLOAT',
    },{
        value: 'REAL',
        label: 'REAL',
    },{
        value: 'DOUBLEPRECISION',
        label: 'DOUBLEPRECISION',
    }],
},{
    value: 'datetime',
    label: 'datetime',
    children: [{
        value: 'DATE',
        label: 'DATE',
    },{
        value: 'TIME',
        label: 'TIME',
    },{
        value: 'TIMESTAMP',
        label: 'TIMESTAMP',
    }],
},{
    value: 'interval',
    label: 'interval',
    children: [{
        value: 'INTERVAL',
        label: 'INTERVAL',
    }],
},{
    value: 'large objects',
    label: 'large objects',
    children: [{
        value: 'CHARACTERLARGE OBJECT',
        label: 'CHARACTERLARGE OBJECT',
    },{
        value: 'BINARY LARGE OBJECT',
        label: 'BINARY LARGE OBJECT',
    }],
}];


class UpdateColumnType extends React.Component {

    constructor(props){
        super(props);
        this.state={
            selectTable:[], //级联选择中选中的表名
            tableName: [], // 列表显示的内容
            columnName: [], //表中的列名
            selectColumn:"",
            sourceType:"",
            targetType:"",
            typeMap:{},

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
            let type={};
            fetch(targetUrl).then(res=>res.json())
                .then(body=>{
                    for(let key in body){
                        let col = {};
                        col.value = body[key].COLUMN_NAME;
                        col.label = body[key].COLUMN_NAME;
                        columns= [...columns,col];
                        type[body[key].COLUMN_NAME]=body[key].COLUMN_TYPE;
                    }
                    this.setState({
                        columnName: columns,
                        selectTable: value,
                        typeMap: type,
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

    handleSelectChange(e){
        let type= this.state.typeMap[e];
        this.setState({
            sourceType:type,
            selectColumn:e
        })
    }

    handleTypeChange(e){
        //console.log(e);
        //修改类型长度的默认值
    }

    handleCilckButton(){
        let path = this.cascaderTableName.state.value;
        let newType=this.newType.state.value[1]+this.typeLength.state.value;
        let targetUrl = `http://localhost:8080/test/updateColumnType?dbType=${path[0]}&dbName=${path[1]}&tableName=${path[2]}&column=${this.state.selectColumn}&oldType=${this.oldType.state.value}&newType=${newType}`;
        fetch(targetUrl).then(res=>res.text())
            .then(body=>{
                if(body == "true"){
                    message.success('修改成功');
                }
                else{
                    message.error('出现未知错误');
                }
            });
    }

    render(){
        return(
            <div>
                输入表：
                <Cascader ref={e => this.cascaderTableName = e} options={this.state.tableName} onChange={this.CascaderonChange.bind(this)} placeholder="Please select" />
                <br/> <br/>
                输入字段：
                <Select style={{ width: '20%' }} onChange={this.handleSelectChange.bind(this)}>
                    {this.state.columnName.map((item,index)=>{
                        return <Option key={index} value={item.value}>{item.label}</Option>
                    })}
                </Select>
                <br/> <br/>
                已选字段类型：
                <Input ref={e => this.oldType = e} style={{ width: '20%' }} value={this.state.sourceType}  disabled={true}/>
                <br/> <br/>

                目标字段类型：
                <Cascader ref={e => this.newType = e} options={options} onChange={this.handleTypeChange.bind(this)} placeholder="Please select" />
                <br/> <br/>
                类型长度：
                <Input ref={e => this.typeLength = e} style={{ width: '10%' }} defaultValue={"(255)"}/>
                <br/> <br/>

                <Button type="primary" onClick={this.handleCilckButton.bind(this)}>
                    <Icon type="file-sync" /> 执行操作
                </Button>
            </div>
        );

    }

}

export default UpdateColumnType;