import React from "react"
import {Button, Cascader, Icon, message, Radio} from "antd";
import MapTable from "./mappingtable";

class Rdb2Rdb extends React.Component{

    constructor(props){
        super(props);
        this.state={
            tableName: [], // 列表显示的内容
            sourceColumnName: [],
            sourceSelectTable:[], //级联选择中选中的表名
            targetColumnName: [],
            targetSelectTable:[], //级联选择中选中的表名
            userDefine: false,
            sourceName:[],
            targetName:[],
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
                        targetColumnName: columns,
                        targetSelectTable: value
                    })
                });
        }
        else {
            this.setState({
                targetColumnName: [],
                targetSelectTable: []
            })
        }
    }

    RadioChange(value){
        let flag =  value.target.value == "yes" ? true : false;
        this.setState({
            userDefine: flag
        })
    }

    // 执行导出工作
    handleCilckButton(){

        //传递 源表名，目标表名，标志，Sourcemap， Targetmap
        let source = this.state.sourceName;
        let target = this.state.targetName;

        let flag = this.state.userDefine;
        let sourcePath = this.state.sourceSelectTable ; //级联选择中选中的表名
        let targetPath = this.state.targetSelectTable;  //级联选择中选中的表名



        if( sourcePath == [] ||  targetPath == "" ||(flag == true && (source == [] ||target == [] ))) {
            message.error("请重新选择操作类型");
            this.setState({
                tableName: [], // 列表显示的内容
                sourceColumnName: [],
                sourceSelectTable:[], //级联选择中选中的表名
                targetColumnName: [],
                targetSelectTable:[], //级联选择中选中的表名
                userDefine: false,
                sourceName:[],
                targetName:[],
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
        let sourceList= [];
        let targetList= [];
        for(let k in mapTable.keys){
            sourceList.push(mapTable["source"+mapTable.keys[k]]);
            targetList.push(mapTable["target"+mapTable.keys[k]]);
        }
        this.setState({
            sourceName:sourceList,
            targetName:targetList,
        })
    }

    render(){
        return (
            <div>
                源数据库表：
                <Cascader options={this.state.tableName} onChange={this.SourceChange.bind(this)} placeholder="Please select" />
                <br /><br />
                目标数据库表：
                <Cascader options={this.state.tableName} onChange={this.TargetChange.bind(this)} placeholder="Please select" />
                <br /><br />
                自定义映射字段：
                <Radio.Group defaultValue="no" buttonStyle="solid" onChange={this.RadioChange.bind(this)}>
                    <Radio.Button value="yes">是</Radio.Button>
                    <Radio.Button value="no">否</Radio.Button>
                </Radio.Group>
                <br /><br />
                {this.state.userDefine&&<MapTable sourceList={this.state.sourceColumnName} targetList={this.state.targetColumnName} receiveFromSon={this.receiveMap}/>}
                <br /><br />
                <Button type="primary" onClick={this.handleCilckButton.bind(this)}>
                    <Icon type="file-sync" /> 执行操作
                </Button>
            </div>
        )
    }
}
export default Rdb2Rdb;