import { Table } from "antd";
export default function AssetsTable() {
  const columns = [
    {
      title: "Value Name",
      dataIndex: "name",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Category 1",
          value: "Category 1",
          children: [
            {
              text: "Yellow",
              value: "Yellow",
            },
            {
              text: "Pink",
              value: "Pink",
            },
          ],
        },
        {
          text: "Category 2",
          value: "Category 2",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],

      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value),
      width: "30%",
    },

    {
      title: "Amount",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Networth",
      dataIndex: "address",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: true,
      width: "40%",
    },
    {
      title: "date",
      dataIndex: "date",
      sorter: (a, b) => a.age - b.age,
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      date: new Date(),
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      date: new Date(),
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      date: new Date(),
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
      date: new Date(),
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={false}
      />
    </div>
  );
}
