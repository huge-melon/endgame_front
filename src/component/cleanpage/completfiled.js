import React from "react"
import {Input} from "antd"

class CompletFiled extends React.Component{

    change(){
        console.log("111")
        console.log(this.refs.myinput.value)

    }

    render(){
        console.log(this.refs.myinput)
        return(
            <Input ref="myinput" onChange={this.change}/>
        )
    }

    // 在输入框里边有两个相连的选择框
    //晚上回来添加了条件部分的选择框
    //ref属性也许可以用来传值，调研其用法  https://blog.csdn.net/saharalili/article/details/84786373
    //受控组件与非受控组件


}
export default CompletFiled;