import React, {Component} from 'react';
import "./style/addDB.css"

class AddDB extends Component {

    constructor(props){
        super(props)
        this.state={
            dbType:"",
            dbUrl:"",
            dbPort:"",
            dbName:"",
            userName:"",
            userPassword:""
        }
        this.onDBtypeChange=this.onDBtypeChange.bind(this);
        this.onDBurlChange=this.onDBurlChange.bind(this);
        this.onDBportChange=this.onDBportChange.bind(this);
        this.onDBnameChange=this.onDBnameChange.bind(this);
        this.onUsernameChange=this.onUsernameChange.bind(this);
        this.onUserpasswordChange=this.onUserpasswordChange.bind(this);
    }

    addClick() {
        let self = this;
        var targetUrl = "http://localhost:8080/test/adddb?dbType=" + this.state.dbType + "&dbUrl=" + this.state.dbUrl + "&dbPort=" + this.state.dbPort + "&dbName=" + this.state.dbName + "&userName="
         + this.state.userName +"&userPassword=" + this.state.userPassword;
        fetch(targetUrl).then(function (response) {
            return response.text()
        }).then(function (body) {
            console.log(body)
            self.setState({value: body});

        })
        this.setState({id: '' })


    }


    onDBtypeChange(event){
        this.setState({dbType:event.target.value})
    }

    onDBurlChange(event){
        this.setState({dbUrl:event.target.value})
    }
    onDBportChange(event){
        this.setState({dbPort:event.target.value})
    }
    onDBnameChange(event){
        this.setState({dbName:event.target.value})
    }
    onUsernameChange(event){
        this.setState({userName:event.target.value})
    }
    onUserpasswordChange(event){
        this.setState({userPassword:event.target.value})
    }


    render() {
        return (
            <div className="back">
                <div>
                    <h1>Add database!</h1>
                    DBtype:
                    <input type={"text"} value={this.state.dbType} onChange={this.onDBtypeChange}/>    <br />
                    DBurl:
                    <input type={"text"} value={this.state.dbUrl} onChange={this.onDBurlChange}/>   <br />
                    DBPort:
                    <input type={"text"} value={this.state.dbPort} onChange={this.onDBportChange}/>   <br />
                    DBName:
                    <input type={"text"} value={this.state.dbName} onChange={this.onDBnameChange}/>   <br />
                    Username:
                    <input type={"text"} value={this.state.userName} onChange={this.onUsernameChange}/>   <br />
                    Userpassword:
                    <input type={"password"} value={this.state.userPassword} onChange={this.onUserpasswordChange}/>   <br />

                </div>
                <div>
                    {/*onClick指定了 按钮点击后将调用的函数，这里通过匿名函数指定调用addClick*/}
                    <button onClick={() => this.addClick()}>ADD</button>
                </div>


            </div>
        )
    }
}

export default AddDB;