import { useState, useRef } from "react";

import {
  Select,
  Space,
  Divider,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from "antd";
import { useCrypto } from "../../context/cryprto-context";
import CoinInfo from "./CoinInfo";

const validateMessages = {
  required: " '${label}' is required",
  types: { number: "${label} is not valid number" },
  number: { range: "${label} must be between ${min} and ${max}" },
};

export default function AddAssetForm() {
  const [coin, SetCoin] = useState(null);
  const { crypto, addAsset } = useCrypto();
  const [form] = Form.useForm();
  const [modals, setModals] = useState(false);
  const assetRef = useRef();

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        placeholder="Choose coin"
        onSelect={(v) => SetCoin(crypto.find((c) => c.id === v))} // прри нажатии на выбранную монету выполняется данная функция, передающая в value, функции монеты
        options={crypto.map((coin) => ({
          // опции выпадающих монет их value название и рисунок которые мы берем с crypt и передаем в виде обьекта
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon} // тут мы рендериим рисунок монеты
              alt={option.data.label}
            />
            {option.data.label}
          </Space> //рендер названия монеты
        )}
      />
    );
  }

  if (modals) {
    return (
      <>
        <Result
          status="success"
          title={`Successfully Purchased ${assetRef.current.amount} ${
            assetRef.current.id
          } worth ${
            parseFloat(assetRef.current.amount) *
            parseFloat(assetRef.current.price)
          } `}
          subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => setModals(false)}
            >
              Close
            </Button>,
            <Button key="buy">Buy Again</Button>,
          ]}
        />
      </>
    );
  }

  function onFinish(values) {
    console.log("finish", values);
    setModals(true);
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.datе?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    addAsset(newAsset);
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(value * amount).toFixed(2),
    });
  }
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />
      <Divider />
      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="enter coin amount "
          onChange={handleAmountChange}
        />
      </Form.Item>
      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Date & time" name="date">
        <DatePicker showTime />
      </Form.Item>
      <Form.Item label="Total" name="total">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Assert
        </Button>
      </Form.Item>
    </Form>
  );
}
