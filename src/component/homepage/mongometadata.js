import {
    Table, Input, Button, Icon,
} from 'antd';
import Highlighter from 'react-highlight-words';
import React from "react";
import "antd/dist/antd.css";

// 传值
class MongoMetaData extends React.Component {
    state = {
        searchText: '',
    };

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
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
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
        render: (text) =>{
            return (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            )},
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
        const data = this.props.metadata;

        console.log("mongometadata:");
        console.log(data);
        const columns = [{
            title: '键名',
            dataIndex: '_id',
            key: '_id',
            width: '19%',
            ...this.getColumnSearchProps('_id'),
        }, {
            title: '类型',
            dataIndex: 'value.type',
            key: 'value.type',
            width: '17%',
            ...this.getColumnSearchProps('value.type'),
        }, {
            title: '数量',
            dataIndex: 'value.count',
            key: 'value.count',
            width: '17%',
            ...this.getColumnSearchProps('value.count'),
        }];
        return <Table columns={columns} dataSource={data} />;
    }
}

export default MongoMetaData;