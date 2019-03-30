import React from "react"
import {Input} from "antd"

class CompletFiled extends React.Component{
    constructor(props){
        super(props);
    }



/*onChange={this.change.bind(this)}*/
    change(e){
        console.log("111")
        console.log(e.target.value);
        console.log("222")
        console.log(this.amounta.state.value)
    }
    handlesubmit(){
        console.log("333")
        console.log(this.amounta.state.value)
        console.log(this.aaa.state.value)
        console.log(this.bbb.state.value)
        console.log(this.ccc.state.value)

    }

    render(){
       // console.log(this.refs.myinput)
        let a=1;
        let b=2;
        let c=3;
        return(
            <div>
            <Input ref={a => this.amounta = a}  />
                <Input ref={a => this.aaa = a}  />
                <Input ref={a => this.bbb = a}  />
                <Input ref={a => this.ccc = a}  />
                <input type="submit" onClick={this.handlesubmit.bind(this)} />
            </div>
        )
    }

    // 在输入框里边有两个相连的选择框
    //晚上回来添加了条件部分的选择框 不能动态添加。。。
    //ref属性也许可以用来传值，调研其用法  https://blog.csdn.net/saharalili/article/details/84786373
    //受控组件与非受控组件


}
export default CompletFiled;