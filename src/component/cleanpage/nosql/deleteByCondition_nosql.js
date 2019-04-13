
import React from "react"
import {Button, Cascader, Icon, message} from "antd";
import Condition_nosql from "./conditions_nosql"

class DeleteByCondition_nosql extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tableName: [], // 列表显示的内容
            selectTable:[], //级联选择中选中的表名
            columnName: [], //条件框里要显示列名
            /*conditionColumn: [], //条件的列名
            conditionValue: [] //条件值*/
            conditions: [],
        }
    }

    componentWillMount(){
        let temp = JSON.parse(localStorage.getItem("tableName"));
        let table = [];
        if(temp){
            for(let first in temp){
                if(temp[first].title!="MongoDB"){
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
                        col.value = body[key]._id;
                        col.label = body[key]._id+": "+body[key].value.type;
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


    //从子组件接收传递的值   数值类型和字符串类型要分开，。将数据类型也传递过来？
    receiveMap(mapTable){
        /* let columnList= [];
         let operatorList= [];
         let conditionList= [];*/
        let conditions=[];
        for(let k in mapTable.keys){
            let str="";
            str = mapTable["column"+mapTable.keys[k]] + mapTable["operator"+mapTable.keys[k]] + mapTable["value"+mapTable.keys[k]];
            conditions.push(str);
            /*columnList.push(mapTable["column"+mapTable.keys[k]]);
            operatorList.push(mapTable["operator"+mapTable.keys[k]])
            conditionList.push(mapTable["condition"+mapTable.keys[k]]);*/
        }
        this.setState({
            /* conditionColumn:columnList,
             conditionValue:conditionList,*/
            conditions:conditions
        })
        console.log("deletebyconditions");
        /* console.log(columnList);
         console.log(conditionList);*/
        console.log(conditions)
    }



    // 提交按钮  将提交按钮放进子组件中，可省略一个
    handleCilckButton(){
        let tablePath = this.state.selectTable ; //级联选择中选中的表名
        /* let dbType = tablePath[0];
         let dbName = tablePath[1];
         let tableName = tablePath[2];
         let columnName= this.state.conditionColumn;
         let conditionValue = this.state.conditionValue;*/
        let conditionTable = {};
        conditionTable.dbType = tablePath[0];
        conditionTable.dbName = tablePath[1];
        conditionTable.tableName = tablePath[2];
        conditionTable.conditions = this.state.conditions;
        /* conditions.headMap = columnName;
         conditions.endMap = conditionValue;*/
        console.log("conditions")
        console.log(conditionTable)
        console.log(JSON.stringify(conditionTable));

        if( tablePath == [] ) {
            message.error("请重新选择操作类型");
            this.setState({
                tableName: [], // 列表显示的内容
                columnName: [],
                selectTable:[], //级联选择中选中的表名
            })
        }
        else{
            //通过Post方法
            let targetUrl="http://localhost:8080/test/deleteByCondition";
            console.log(targetUrl);

              fetch(targetUrl,{
                  method:"POST",
                  body:JSON.stringify(conditionTable),
                  headers: {
                      'content-type': 'application/json'
                  },
              }).then(res=>res.text())
                  .then(body=>{
                      if(body == "true"){
                          message.success('删除成功');
                      }else {
                          message.error("删除失败");
                      }
                  });
        }
    }



    render(){
        return (
            <div>
                选择输入集合：
                <Cascader options={this.state.tableName} onChange={this.SourceChange.bind(this)} placeholder="Please select" />
                <br /><br />
                添加条件：
                <Condition_nosql columnNameList={this.state.columnName} receiveFromSon={this.receiveMap.bind(this)}/>
                <br /><br />
                <Button type="primary" onClick={this.handleCilckButton.bind(this)}>
                    <Icon type="file-sync" /> 执行操作
                </Button>
            </div>
        )
    }
}

export default DeleteByCondition_nosql;
