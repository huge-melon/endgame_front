import React from "react"
import {Button, Cascader, Checkbox, Icon, message, Radio} from "antd";
import MapTable from "./mappingtable";

const CheckboxGroup = Checkbox.Group;

class Rdb2Mongo extends React.Component{

    constructor(props){
        super(props);
        this.state={
            sqlTableName: [], // 列表显示的内容
            nosqlTableName:[], // 列表显示的内容
            sourceSelectTable:[], //级联选择中选中的表名
            sourceColumnName: [], //多选框显示的列名
            targetSelectTable:[], //级联选择中选中的表名
        }
    }

    componentWillMount(){
        let temp = JSON.parse(localStorage.getItem("tableName"));
        let sqlTable = [];
        let nosqlTable=[];
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
                if(grandfather.label == "MongoDB"){
                    nosqlTable = [...nosqlTable,grandfather];
                }
                else {
                    sqlTable = [...sqlTable,grandfather];
                }
            }
            this.setState({
                sqlTableName : sqlTable,
                nosqlTableName : nosqlTable
            })
        }
    };



    //根据级联选择框的内容从数据库中提取元数据
    SourceChange(value) {
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
                        sourceColumnName: columns,
                        sourceSelectTable: value
                    })
                });
        }
        else {
            this.setState({
                sourceColumnName: [],
                sourceSelectTable: []
            })
        }
    }


    TargetChange(value) {
        console.log(value);
        if(value.length > 0 ){
            this.setState({
                targetSelectTable: value
            })
        }
        else {
            this.setState({
                targetSelectTable: []
            })
        }
    }

    // 执行导出工作
    handleCilckButton(){
        //传递 源表名，目标表名，标志，Sourcemap， Targetmap
        let sourcePath = this.state.sourceSelectTable ; //级联选择中选中的表名
        let targetPath = this.state.targetSelectTable;  //级联选择中选中的表名
        let chooseColumns = this.exportColumn.state.value;

        console.log("sourcePath")
        console.log(sourcePath)
        console.log("targetPath")
        console.log(targetPath)
        console.log("chooseColumns")
        console.log(chooseColumns)

        if( sourcePath == [] ||  targetPath == [] || chooseColumns == []) {
            message.error("请重新选择操作类型");
            this.setState({
                sourceColumnName: [],
                sourceSelectTable:[], //级联选择中选中的表名
                targetSelectTable:[], //级联选择中选中的表名
                targetName:[],
            })
        }
        else{
            //通过Post方法
            let targetUrl="http://localhost:8080/test/rdbToMongo";
            let requestBody={};
            requestBody.sourceDbType=sourcePath[0];
            requestBody.sourceDbName=sourcePath[1];
            requestBody.sourceTableName=sourcePath[2];
            requestBody.sourceColumnList = chooseColumns;

            requestBody.targetDbType=targetPath[0];
            requestBody.targetDbName=targetPath[1];
            requestBody.targetCollectionName=targetPath[2];

            console.log("requestBody")
            console.log(requestBody)

            console.log(targetUrl);
            fetch(targetUrl,{
                method:"POST",
                body:JSON.stringify(requestBody),
                headers: {
                    'content-type': 'application/json'
                },
            }).then(res=>res.text())
                .then(body=>{
                    if(body == "true"){
                        message.success('导出成功');
                    }else {
                        message.error("导出失败");
                    }
                });
        }
    }



    render(){
        return (
            <div>
                源数据库表：
                <Cascader style={{width:"20%"}} options={this.state.sqlTableName} onChange={this.SourceChange.bind(this)} placeholder="Please select" />
                <br /><br />
                目标数据库表：
                <Cascader style={{width:"20%"}} options={this.state.nosqlTableName} onChange={this.TargetChange.bind(this)} placeholder="Please select" />
                <br /><br />
                选择导出的列：
                <br /><br />
                <CheckboxGroup ref={e => this.exportColumn = e} options={this.state.sourceColumnName}/>
                <br /><br />

                <Button type="primary" onClick={this.handleCilckButton.bind(this)}>
                    <Icon type="file-sync" /> 执行操作
                </Button>
            </div>
        )
    }
}
export default Rdb2Mongo;