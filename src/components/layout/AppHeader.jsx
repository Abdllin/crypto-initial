import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/cryprto-context";
import { useEffect, useState } from "react";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "./AddAssetForm";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function AppHeader() {
  const [select, setSelect] = useState(false); // отвечает за вывод селекта
  const [coin, setCoin] = useState(null); // id моенты которую выводим в modale
  const [modal, setModal] = useState(false); // отвечает за вывод модального окна
  const { crypto } = useCrypto(); // иформация за крипту которая находится в виде обьекта
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    //при нажатии на / select меняется на true тем самым открывая окно выбора монет
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress); // считываем нажатие кнопок на клавишу
    return () => document.removeEventListener("keypress", keypress); //обнуляет счетчик нажатий
  }, []);

  // при нажатии на выбранную монету выполняется данная функция, передающая в value, функции монеты
  function selectChange(value) {
    setCoin(crypto.find((c) => c.id === value)); // меняем значение coin  на ту монету,  в которую тыкнули
    setModal(true); // при выборе монеты также открывается наш modal
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        open={select} // открытие select которая идет по нажатию keypress
        style={{ width: 250 }}
        onClick={() => setSelect((prev) => !prev)} // создаем функцию которая меняет select
        value="press / to open"
        onSelect={selectChange} // прри нажатии на выбранную монету выполняется данная функция, передающая в value, функции монеты
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
      <Modal
        title="Basic Modal"
        open={modal} // при нажатии на моенту modal меняется на true, в modal передаются value монеты которые мы и выводим
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
      >
        <CoinInfoModal coin={coin} />
      </Modal>
      <Button type="primary" onClick={() => setDrawer(true)}>
        Primary Button
      </Button>
      <Drawer
        destroyOnClose
        width={600}
        title="Add asset"
        onClose={() => setDrawer(false)}
        open={drawer}
      >
        <AddAssetForm />
      </Drawer>
    </Layout.Header>
  );
}
