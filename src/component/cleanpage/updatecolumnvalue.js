import React from "react";
import "antd/dist/antd.css";
import {Cascader, Input, Select} from "antd";
const Option = Select.Option;

class UpdateColumnValue extends React.Component{

    constructor(props){
        super(props);
        this.state={
            tableName: [], // 级联选择中显示的内容
            selectTable:[], //级联选择中选中的表名
            columnName: [], //表中的列名
            selectColumn:"",//Select选中的列名
            sourceType:"",
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
            </div>
        );
    }
}

export default UpdateColumnValue;
