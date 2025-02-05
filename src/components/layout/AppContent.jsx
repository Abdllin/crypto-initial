import { Layout } from "antd";
import React from "react";
import { useCrypto } from "../../context/cryprto-context";
import PortfolioChart from "./PortfoliChart";
import AssetsTable from "./AssetsTable";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  // backgroundColor: "#001529",
  backgroundColor: "#001529",
  witdh: '60%',
};

export default function AppContent() {
  const { crypto, assets } = useCrypto();
  console.log("content assets", assets);

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});
  console.log("cryptoPrice", cryptoPriceMap);
  return (
    <Layout.Content style={contentStyle}>
      netWorthAssets:
      {assets
        .map((asset) => asset.totalAmount)
        .reduce((acc, v) => acc + v, 0)
        .toFixed(2)}
      $
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}
