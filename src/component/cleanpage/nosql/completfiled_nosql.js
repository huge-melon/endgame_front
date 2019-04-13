import React from "react"
import {Cascader, Input, Select, Radio, Button, Icon, message} from "antd"
const Option = Select.Option;

class CompletFiled_nosql extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tableName: [], // 级联选择中显示的内容
            selectTable:[], //级联选择中选中的表名
            columnName: [], //表中的列名
            selectColumn:"",//Select选中的列名
            sourceType:"",
            typeMap:{},
            isCustomize:false,
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
    handleRadionChange(e){
        if(e.target.value == 'customize'){
            this.setState({
                isCustomize:true
            })
        }else{
            this.setState({
                isCustomize:false
            })
        }

    }

    handleCilckButton(){
        let targetUrl;
        let path = this.cascaderTableName.state.value;
        if(this.defaultValue){
            if(!this.defaultValue.state.value){
                message.error("默认值不能为空")
                return;
            }else{
                targetUrl = `http://localhost:8080/test/completFiled?dbType=${path[0]}&dbName=${path[1]}&tableName=${path[2]}&columnName=${this.state.selectColumn}&completType=${this.completType.state.value}&defaultValue=${this.defaultValue.state.value}`;
            }
        }
        else {
            targetUrl = `http://localhost:8080/test/completFiled?dbType=${path[0]}&dbName=${path[1]}&tableName=${path[2]}&columnName=${this.state.selectColumn}&completType=${this.completType.state.value}&defaultValue=null`;
        }
        console.log(targetUrl);
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
                输入集合：
                <Cascader ref={e => this.cascaderTableName = e} options={this.state.tableName} onChange={this.CascaderonChange.bind(this)} placeholder="Please select" />
                <br/> <br/>
                填充键名：
                <Select style={{ width: '20%' }} onChange={this.handleSelectChange.bind(this)}>
                    {this.state.columnName.map((item,index)=>{
                        return <Option key={index} value={item.value}>{item.label}</Option>
                    })}
                </Select>
                <br/> <br/>
                已选字段类型：
                <Input  style={{ width: '20%' }} value={this.state.sourceType}  disabled={true}/>
                <br/> <br/>
                填入值:
                <Radio.Group ref={e => this.completType = e} defaultValue="average" buttonStyle="solid" onChange={this.handleRadionChange.bind(this)}>
                    <Radio.Button value="average">平均值</Radio.Button>
                    <Radio.Button value="mode">众数</Radio.Button>
                    <Radio.Button value="median">中位数</Radio.Button>
                    <Radio.Button value="customize">自定义</Radio.Button>
                </Radio.Group>

                {this.state.isCustomize&&<div> <br/> <br/>请输入默认值：<Input ref={e => this.defaultValue = e} size={"small"} style={{ width: '20%' }} /></div>}
                <br/> <br/>
                <Button type="primary" onClick={this.handleCilckButton.bind(this)}>
                    <Icon type="file-sync" /> 执行操作
                </Button>

            </div>
        );
    }
}
export default CompletFiled_nosql;