import { Input } from 'antd';
import React from 'react';
import "antd/dist/antd.css";

const Search = Input.Search;

class SearchCom extends React.Component{

    render(){
        return(<div>
            <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={value => console.log(value)}
            />
        </div>);
    }
}

export default SearchCom;