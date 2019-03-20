import {
    Table, Input, Button, Icon,
} from 'antd';
import Highlighter from 'react-highlight-words';
import React from "react";
import "antd/dist/antd.css";

// 传值
class TableMetaData extends React.Component {
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

        const columns = [{
            title: '列名',
            dataIndex: 'COLUMN_NAME',
            key: 'COLUMN_NAME',
            width: '19%',
            ...this.getColumnSearchProps('COLUMN_NAME'),
        }, {
            title: '类型',
            dataIndex: 'COLUMN_TYPE',
            key: 'COLUMN_TYPE',
            width: '17%',
            ...this.getColumnSearchProps('COLUMN_TYPE'),
        }, {
            title: '可为NULL',
            dataIndex: 'IS_NULLABLE',
            key: 'IS_NULLABLE',
            width: '17%',
            ...this.getColumnSearchProps('IS_NULLABLE'),
        }, {
            title: '主键',
            dataIndex: 'COLUMN_KEY',
            key: 'COLUMN_KEY',
            width: '17%',
            ...this.getColumnSearchProps('COLUMN_KEY'),
        }, {
            title: '注释',
            dataIndex: 'COLUMN_COMMENT',
            key: 'COLUMN_COMMENT',
            ...this.getColumnSearchProps('COLUMN_COMMENT'),
        }];
        return <Table columns={columns} dataSource={data} />;
    }
}

export default TableMetaData;