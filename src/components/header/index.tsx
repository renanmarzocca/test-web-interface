import { useState, useEffect } from "react";
import { Layout, Menu, Avatar, Drawer } from "antd";
import { MenuOutlined, HomeOutlined, UserOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { Logo, UserContainer, UserName } from "./styles";

const { Header } = Layout;

const AppHeader = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <Header style={{ height: "100px", backgroundColor: "#FFFFFF", padding: "0 16px", boxShadow: "0 4px 4px -2px rgba(0, 0, 0, 0.2)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <MenuOutlined
            style={{ fontSize: "24px", color: "black", cursor: "pointer" }}
            onClick={toggleSidebar}
          />
          <Logo src={logo} alt="Logo" />
        </div>

        <Menu theme="light" mode="horizontal" style={{ flexGrow: 1, justifyContent: "center", borderBottom: "transparent" }}>
          <Menu.Item key="1">
            <Link to="/customers">Clientes</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/customers/selected">Clientes Selecionados</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/companies">Empresas</Link>
          </Menu.Item>
          <Menu.Item key="4" onClick={handleLogout}>
            Sair
          </Menu.Item>
        </Menu>

        <UserContainer>
          <Avatar style={{ backgroundColor: "#EB6625" }}>
            {userName ? userName.charAt(0) : "U"}
          </Avatar>
          <UserName>Olá, {userName || "User"}!</UserName>
        </UserContainer>
      </div>

      <Drawer
      title={<img src={logo} alt="Logo" style={{ width: "150px", height: "auto" }} />}
      placement="left"
        closable={false}
        onClose={() => setIsSidebarVisible(false)}
        visible={isSidebarVisible}
        width={250}
      >
        <Menu mode="inline" onClick={() => setIsSidebarVisible(false)}>
          <Menu.Item disabled key="1" icon={<HomeOutlined />}>
            <Link to="/menu">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/customers">Clientes</Link>
          </Menu.Item>
          <Menu.Item disabled key="3" icon={<AppstoreAddOutlined />}>
            <Link to="/products">Produtos</Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </Header>
  );
};

export default AppHeader;
