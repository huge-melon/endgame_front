
import React from "react"
import {Button, Cascader, Icon, message} from "antd";
import Conditions from "./conditions"

class DeleteByCondition extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tableName: [], // 列表显示的内容
            ColumnName: [],
            SelectTable:[], //级联选择中选中的表名
            conditionTable: [],
            conditionValue: []
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


    //根据级联选择框的内容从数据库中提取元数据 col.value为选中后的值 col.label 为展示的值
    SourceChange(value) {
        console.log(value);
        if(value.length > 0 ){
            let targetUrl = "http://localhost:8080/test/gettablemetadata?dbType=" + value[0] + "&dbName=" + value[1] + "&tableName="
                + value[2];
            let columns = [];
            fetch(targetUrl).then(res=>res.json())
                .then(body=>{
                    console.log("value body");
                    console.log(body);
                    for(let key in body){
                        let col = {};
                        col.value = body[key].COLUMN_NAME;
                        col.label = body[key].COLUMN_NAME+" "+body[key].COLUMN_TYPE;
                        columns= [...columns,col];
                    }
                    this.setState({
                        ColumnName: columns,
                        SelectTable: value
                    })
                });
        }
        else {
            this.setState({
                ColumnName: [],
                SelectTable: []
            })
        }
    }


    handleCilckButton(){

        let tablePath = this.state.SelectTable ; //级联选择中选中的表名



        if( tablePath == [] ) {
            message.error("请重新选择操作类型");
            this.setState({
                tableName: [], // 列表显示的内容
                ColumnName: [],
                SelectTable:[], //级联选择中选中的表名
            })
        }
        else{
            //通过Post方法
            let targetUrl="";
            console.log(targetUrl);
            fetch(targetUrl).then(res=>res.text())
                .then(body=>{
                    if(body == "true"){
                        message.success('导出成功');
                    }else {
                        message.error("导出失败");
                    }
                });
        }
    }
    receiveMap(mapTable){
       /* let table= [];
        let targetList= [];
        for(let k in mapTable.keys){
            sourceList.push(mapTable["source"+mapTable.keys[k]]);
            targetList.push(mapTable["target"+mapTable.keys[k]]);
        }
        this.setState({
            conditionTable: [],
            conditionValue: []
        })*/
    }

    render(){
        return (
            <div>
                选择进行操作的表名：
                <Cascader options={this.state.tableName} onChange={this.SourceChange.bind(this)} placeholder="Please select" />
                <br /><br />
                添加条件：
                <Conditions columnNameList={this.state.ColumnName} receiveFromSon={this.receiveMap}/>
                <br /><br />
                <Button type="primary" onClick={this.handleCilckButton.bind(this)}>
                    <Icon type="file-sync" /> 执行操作
                </Button>
            </div>
        )
    }
}

export default DeleteByCondition;
