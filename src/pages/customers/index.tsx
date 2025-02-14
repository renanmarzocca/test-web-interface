// Core
import { useEffect, useState } from "react";

// Libraries
import { Col, Row, Layout, Modal, Table } from "antd";

// Components
import AppHeader from "../../components/header";
import ModalAddCustomer from "../../components/modalAddCustomer";
import ModalEditCustomer from "../../components/ModalEditCustomer";
import ModalDeleteCustomer from "../../components/modalDeleteCustomer";

// Services
import { getAllCustomers } from "../../services/modules/customers";
import { getCompaniesByCustomerId } from "../../services/modules/companies";


// Styles
import {
  CustomCard,
  PageContainer,
  IconContainer,
  IconButton,
  TitleCount,
  IconAdd,
  TitleContainer
} from "./styles";
import { FaEye, FaPencilAlt, FaTrash, FaPlus } from 'react-icons/fa';
import { StarOutlined, StarFilled } from '@ant-design/icons';

// Utils
import { getAuthHeader } from "../../utils/apiUtils";

const { Content } = Layout;
const CustomersPage = () => {

  // STATES
  const [customers, setCustomers] = useState<any[]>([]);
  const [starState, setStarState] = useState<{ [key: string]: boolean }>({});
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedCompanies, setSelectedCompanies] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // CUSTOMERS SELECTED
  const toggleStar = async (customerId: string) => {
    const newStarState = !starState[customerId];
    setStarState((prevState) => ({
      ...prevState,
      [customerId]: newStarState,
    }));

    try {
      await fetch(`http://localhost:3000/customers/${customerId}/select`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({ selected: newStarState }),
      });
    } catch (error) {
      console.error('Error updating customer selection:', error);
    }
  };

  // ADD MODAL
  const showModal = () => setIsAddModalVisible(true);
  const hideModal = () => setIsAddModalVisible(false);

  const handleAddSuccess = async () => {
    setIsAddModalVisible(false);
    const data = await getAllCustomers();
    setCustomers(data);
  };

  // EDIT MODAL
  const handleEditCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setIsEditModalVisible(true);
  };
  
  const handleCloseModal = () => {
    setIsEditModalVisible(false);
  };
  
  const handleUpdateSuccess = async () => {
    setIsEditModalVisible(false);
    const data = await getAllCustomers();
    setCustomers(data);
  };

  // DELETE MODAL
  const handleDeleteClick = (customerId: string) => {
    setSelectedCustomer(customerId);
    setDeleteModalVisible(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalVisible(false);
    setSelectedCustomer(null);
  };

  const handleDeleteSuccess = () => {
    setCustomers(customers.filter((customer) => customer.id !== selectedCustomer));
  };

  // GET ALL CUSTOMERS
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getAllCustomers();
        setCustomers(data);
        const initialStarState = data.reduce((acc: any, customer: any) => {
          acc[customer.id] = customer.selected;
          return acc;
        }, {});
        setStarState(initialStarState);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  // MODAL COMPANIES
  const handleViewCompanies = async (customerId: string) => {
    try {
      const companies = await getCompaniesByCustomerId(customerId);
      setSelectedCompanies(companies);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const columns = [
    {
      title: "Nome da Empresa",
      dataIndex: "name_company",
      key: "name_company",
    },
    {
      title: "CNPJ",
      dataIndex: "cnpj",
      key: "cnpj",
    },
    {
      title: "Faturamento da Empresa",
      dataIndex: "salary",
      key: "salary",
    },
  ];

  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: "10px" }}>
        <PageContainer>
          <TitleContainer>
            <TitleCount>Clientes encontrados: {customers.length}</TitleCount>
            <IconAdd onClick={showModal}>
              <FaPlus style={{ marginRight: '8px' }} /> Add
            </IconAdd>
          </TitleContainer>
          <Row gutter={[16, 16]} justify="center">
            {customers.map((customer, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6} style={{ display: "flex", justifyContent: "center" }}>
                <CustomCard title={customer.name}>
                  <div className="star-icon" onClick={() => toggleStar(customer.id)}>
                    {starState[customer.id] ? <StarFilled style={{ color: 'gold' }} /> : <StarOutlined />}
                  </div>
                  <p><strong>Salário: </strong>{`R$ ${customer.salary}`}</p>
                  <IconContainer>
                    <IconButton iconType="view" onClick={() => handleViewCompanies(customer.id)}>
                      <FaEye />
                    </IconButton>
                    <IconButton iconType="edit" onClick={() => handleEditCustomer(customer)}>
                      <FaPencilAlt />
                    </IconButton>
                    <IconButton iconType="delete" onClick={() => handleDeleteClick(customer.id)}>
                      <FaTrash />
                    </IconButton>
                  </IconContainer>
                </CustomCard>
              </Col>
            ))}
          </Row>
        </PageContainer>
      </Content>

      <Modal
        title="Empresas"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Table columns={columns} dataSource={selectedCompanies} rowKey="id" />
      </Modal>
      <ModalAddCustomer
        isVisible={isAddModalVisible}
        onClose={hideModal}
        onAdd={handleAddSuccess}
      />
      <ModalEditCustomer
        visible={isEditModalVisible}
        customer={selectedCustomer}
        onClose={handleCloseModal}
        onUpdateSuccess={handleUpdateSuccess}
      />
      {selectedCustomer && (
        <ModalDeleteCustomer
          visible={deleteModalVisible}
          onClose={handleDeleteModalClose}
          customerId={selectedCustomer}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </Layout>
  );
};

export default CustomersPage;
