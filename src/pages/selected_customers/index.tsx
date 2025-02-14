// Core
import { useEffect, useState } from "react";

// Libraries
import { Col, Row, Layout } from "antd";

// Components
import AppHeader from "../../components/header";

// Services
import { getAllSelectedCustomers } from "../../services/modules/customers";

// Styles
import { CustomCard, PageContainer, TitleCount, TitleContainer } from "./styles";
import { StarFilled } from '@ant-design/icons';


const { Content } = Layout;
const CustomersSelectedPage = () => {

  // STATES
  const [customers, setCustomers] = useState<any[]>([]);

  // GET ALL SELECTED CUSTOMERS
  useEffect(() => {
    const fetchSelectedCustomers = async () => {
      try {
        const data = await getAllSelectedCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching selected customers:", error);
      }
    };

    fetchSelectedCustomers();
  }, []);

  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: "10px" }}>
        <PageContainer>
          <TitleContainer>
            <TitleCount>Clientes encontrados: {customers.length}</TitleCount>
          </TitleContainer>
          <Row gutter={[16, 16]} justify="center">
            {customers.map((customer, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6} style={{ display: "flex", justifyContent: "center" }}>
                <CustomCard title={customer.name}>
                  <div className="star-icon">
                    <StarFilled style={{ color: 'gold' }} />
                  </div>
                  <p><strong>Salário:</strong> {`R$ ${customer.salary}`}</p>
                </CustomCard>
              </Col>
            ))}
          </Row>
        </PageContainer>
      </Content>
    </Layout>
  );
};

export default CustomersSelectedPage;
