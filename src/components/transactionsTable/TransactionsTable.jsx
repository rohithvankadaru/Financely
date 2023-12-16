import { Input, Radio, Select, Table } from 'antd';
import './transactionsTable.css';
import { useState } from 'react';
import searchImage from '/searchImg.svg';

const TransactionsTable = ({ transactions }) => {

  const [searchFilter, setSearchFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortKey, setSortKey] = useState('');

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  const filterTransactions = transactions.filter(
    transaction => transaction.name.toLowerCase().includes(searchFilter.toLowerCase()) && transaction.type.includes(typeFilter)
  );

  const sortedTransactions = [...filterTransactions].sort((t, o) => {
    if (sortKey === 'amount') {
      return t.amount - o.amount;
    }
    else if (sortKey === 'date') {
      return new Date(t.date) - new Date(o.date);
    }
    return 0;

  })

  return (
    <div
      style={{
        width: '96%',
        padding: '0 1.5rem',
      }}>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '1rem',
        alignItems: 'center',
        marginBottom: '1rem',
      }}>
        <div className='search-input'>
          <img src={searchImage} />
          <input type="text" placeholder='search by name' onChange={e => setSearchFilter(e.target.value)} />
        </div>
        <Select
          className='select-input'
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder='Filter'
          allowClear
        >
          <Select.Option value=''>All</Select.Option>
          <Select.Option value='income'>Income</Select.Option>
          <Select.Option value='expense'>Expense</Select.Option>
        </Select>

      </div>

      <div style={{
        boxShadow: 'var(--shadow)',
        padding: '0 1rem',
        borderRadius: '0.5rem'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}>
            <h2>My Transactions</h2>
            <Radio.Group
              className='input-radio'
              value={sortKey}
              onChange={e => setSortKey(e.target.value)}
            >
              <Radio.Button value=''>No Sort</Radio.Button>
              <Radio.Button value='date'>Sort by Date</Radio.Button>
              <Radio.Button value='amount'>Sort by Amount</Radio.Button>
            </Radio.Group>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            width: '400px',
            alignSelf: 'flex-end'
          }}>
            <button className='btn'>
              Export to CSV
            </button>
            <label className='btn btn-blue'>
              Import from CSV
            </label>
            <input
              type="file"
              accept='.csv'
              required
              style={{ display: 'none' }}
            />
          </div>
        </div>

        <Table dataSource={sortedTransactions} columns={columns} />
      </div>

    </div>
  )
}

export default TransactionsTable