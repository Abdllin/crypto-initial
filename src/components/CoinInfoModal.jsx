import { Tag, Typography, Divider } from "antd";
import CoinInfo from "./layout/CoinInfo";
export default function CoinInfoModal({ coin }) {
  return (
    <>
      <CoinInfo coin={coin} withSymbol />
      <Divider />
      <Typography.Paragraph>
        <Typography.Text> 1 Hour</Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
          {coin.priceChange1h}%
        </Tag>

        <Typography.Text> 1 Day</Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>
          {coin.priceChange1d}%
        </Tag>

        <Typography.Text> 1 Week</Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? "green" : "red"}>
          {coin.priceChange1w}%
        </Tag>
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text> Price: </Typography.Text>
        {coin.price.toFixed(2)}
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text> Price BTC: </Typography.Text>
        {coin.priceBtc.toFixed(2)}
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text> Market Cap: </Typography.Text>
        {coin.marketCap}
      </Typography.Paragraph>

      {coin.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text> Contract adress: </Typography.Text>
          {coin.contractAddress}
        </Typography.Paragraph>
      )}
    </>
  );
}
// {coin.priceChange1h}%
