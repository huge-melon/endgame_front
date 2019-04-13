import React from "react";
import "antd/dist/antd.css";
import {Button, Cascader, Icon, Input, message, Select,Radio} from "antd";
import UpdateDataTable from "./updatedatatable";
const Option = Select.Option;
const RadioGroup=Radio.Group;

//const transLetter = {"+" : "%2B","/" : "%2F","?" : "%3F","%" : "%25","#" : "%23","&" : "%26","\\":"%5C"};

class ReplaceString_nosql extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tableName: [], // 级联选择中显示的内容
            selectTable:[], //级联选择中选中的表名
            columnName: [], //表中的列名
            selectColumn:"",//Select选中的列名
            sourceType:"",
            typeMap:{},
            data:[], //传给子组件的数值
            connectMess:{},
            isShow:false,
        }
    }

    componentWillMount(){
        let temp = JSON.parse(localStorage.getItem("tableName"));
        let table = [];
        if(temp){
            for(let first in temp){
                if(temp[first].title != "MongoDB"){
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
                        col.value = body[key]._id;
                        col.label = body[key]._id;
                        columns= [...columns,col];
                        type[body[key]._id]=body[key].value.type;
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

    handleCilckButton(){
        let path = this.state.selectTable;
        let columnName = this.state.selectColumn;
        let regularExpress = this.regularExpress.state.value;
        let priKey="_id";

        /*  let newRegular="";
          for(let i=0;i<regularExpress.length;i++){
              if(transLetter[regularExpress[i]]){
                  newRegular+=transLetter[regularExpress[i]];
              }
              else {
                  newRegular+=regularExpress[i];
              }
          }
          console.log("Old RE:"+ regularExpress);
          console.log("New RE:"+ newRegular);*/
        // let targetUrl = `http://localhost:8080/test/dataVerify?dbType=${path[0]}&dbName=${path[1]}&tableName=${path[2]}&columnName=${columnName}&priKey=${priKey}&regularExpress=${newRegular}`;

        let targetUrl = "http://localhost:8080/test/replaceString";
        let requestBody ={};
        requestBody.dbType=path[0];
        requestBody.dbName=path[1];
        requestBody.tableName=path[2];
        requestBody.columnName=columnName;
        requestBody.priKey="_id";
        requestBody.targetString=this.targetString.state.value;

        this.setState({
            connectMess: requestBody,
        })
        requestBody.regularExpress=regularExpress;
        console.log(targetUrl);
        fetch(targetUrl,{
            method:"POST",
            body:JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
            },
        }).then(res=>res.json())
            .then(body=>{
                console.log("正则表达式验证：");
                console.log(body);
                let temp=[];
                for(let i=0;i<body.length;i++){
                    let node={};
                    node.id=body[i][priKey];
                    if(!body[i][columnName]){
                        node.sourcedata = "null"
                    }
                    else{
                        node.sourcedata = body[i][columnName];
                        node.targetdata = body[i]["afterReplace"];
                    }
                    node.key = node.id;
                    temp.push(node);
                }
                console.log("temp:");
                console.log(temp);
                this.setState({
                    data:temp,
                    isShow:true,
                })
            });
    }

    configShow(){
        this.setState({
            isShow:false,
        })
    }

    render(){
        return(
            <div>
                输入集合：
                <Cascader  options={this.state.tableName} onChange={this.CascaderonChange.bind(this)} placeholder="Please select" />
                <br/> <br/>
                输入字段：
                <Select style={{ width: '20%' }} onChange={this.handleSelectChange.bind(this)}>
                    {this.state.columnName.map((item,index)=>{
                        return <Option key={index} value={item.value}>{item.label}</Option>
                    })}
                </Select>
                <br/> <br/>
                已选字段类型：
                <Input style={{ width: '20%' }} value={this.state.sourceType}  disabled={true}/>
                <br/> <br/>
                替换规则：
                <Input ref={e => this.regularExpress = e} style={{ width: '20%' }} />
                <br/> <br/>
                替换的字符串：
                <Input ref={e => this.targetString = e} style={{ width: '20%' }} />
                <br/> <br/>
                <Button type="primary" onClick={this.handleCilckButton.bind(this)}>
                    <Icon type="file-sync" /> 执行操作
                </Button>
                <UpdateDataTable data={this.state.data} configShow={this.configShow.bind(this)} isShowModal={this.state.isShow} connectMess={this.state.connectMess}/>
            </div>
        );
    }
}

export default ReplaceString_nosql;
