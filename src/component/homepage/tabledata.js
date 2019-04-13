import React from "react"

import {
    Table, Input, Button, Icon,
} from 'antd';
import Highlighter from 'react-highlight-words';
import "antd/dist/antd.css";

class TableData extends React.Component {
    state = {
        searchText: '',
    };
    /*
    一开始所有的框都选中，传递给数据库查询的是所有的字段名，比如 name，age，address
    之后点击多选框，修改多选框中的值，
    对应的sql语句中返回的表也发生变化，比如 name，age 取消address的选项
    * */
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
                             setSelectedKeys, selectedKeys, confirm, clearFilters,
                         }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => { this.searchInput = node; }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    搜索
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    重置
                </Button>
            </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) => {
                return (
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[this.state.searchText]}
                        autoEscape
                        textToHighlight={text?text.toString():"NULL"}
                    />
                )
        },
    })

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    }
    render() {
        const data = this.props.data;;
        let columns =[];
        if(data.length > 0){
            console.log("keys:")
            console.log(Object.keys(data[0]));
            let metadata = Object.keys(data[0]);
            for(let key in metadata){
                let node={};
                node.title = metadata[key];
                node.dataIndex = metadata[key];
                node.key = metadata[key];
                node = Object.assign({},node,{...this.getColumnSearchProps(metadata[key])})
                columns.push(node);
            }
        }
        return <Table columns={columns} dataSource={data} />;
    }
}
export default TableData;