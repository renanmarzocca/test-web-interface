// Core
import { useEffect, useState } from "react";

// Libraries
import { Layout, Table } from "antd";

// Components
import AppHeader from "../../components/header";
import ModalAddCompany from "../../components/modalAddCompany";
import ModalEditCompany from "../../components/modalEditCompany";
import ModalDeleteCompany from "../../components/modalDeleteCompany";

// Services
import { getAllCompanies } from "../../services/modules/companies";

// Styles
import { 
  PageContainer,
  IconContainer,
  IconButton,
  TitleCount,
  IconAdd,
  TitleContainer
} from "./styles";
import { FaPencilAlt, FaTrash, FaPlus } from 'react-icons/fa';

// Utils
import { formatTimestamp } from "../../utils/convertTimestamp";


const { Content } = Layout;
const CompaniesPage = () => {

  // STATES
  const [companies, setCompanies] = useState<any[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [columns, setColumns] = useState<any[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // GET ALL COMPANIES
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getAllCompanies();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  // ADD MODAL
  const showModal = () => setIsAddModalVisible(true);
  const hideModal = () => setIsAddModalVisible(false);

  const handleAddSuccess = async () => {
    setIsAddModalVisible(false);
    const data = await getAllCompanies();
    setCompanies(data);
  };

  // EDIT MODAL
  const handleEditCompany = (company: any) => {
    setSelectedCompany(company);
    setIsEditModalVisible(true);
  };
  
  const handleCloseModal = () => {
    setIsEditModalVisible(false);
  };

  const handleUpdateSuccess = async () => {
    setIsEditModalVisible(false);
    const data = await getAllCompanies();
    setCompanies(data);
  };

  // DELETE MODAL
  const handleDeleteClick = (companyId: string) => {
    setSelectedCompany(companyId);
    setDeleteModalVisible(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalVisible(false);
    setSelectedCompany(null);
  };

  const handleDeleteSuccess = () => {
    setCompanies(companies.filter((company) => company.id !== selectedCompany));
  };

  // TABLE
  const allColumns = [
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
      render: (value: number | string | null | undefined) => {
        const salary = Number(value);
        return isNaN(salary) ? "R$ 0,00" : `R$ ${salary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
      },
    },
    {
      title: "Data de criação",
      dataIndex: "date_created",
      key: "date_created",
      render: (timestamp: number | string) => formatTimestamp(timestamp),
    },
    {
      title: "Ações",
      key: "actions",
      render: ( record: any) => (
        <IconContainer>
          <IconButton iconType="edit" onClick={() => handleEditCompany(record)}>
            <FaPencilAlt />
          </IconButton>
          <IconButton iconType="delete" onClick={() => handleDeleteClick(record.id)}>
            <FaTrash />
          </IconButton>
        </IconContainer>
      ),
    },
  ];

   // Update columns based on window size
   useEffect(() => {
    if (windowWidth <= 768) {
      setColumns(allColumns.filter((column) => column.key !== 'date_created' && column.key !== 'cnpj'));
    } else {
      setColumns(allColumns);
    }

    // Listen for window resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: "10px" }}>
        <PageContainer>
          <TitleContainer>
            <TitleCount>Empresas encontradas: {companies.length}</TitleCount>
            <IconAdd onClick={showModal}>
              <FaPlus style={{ marginRight: '8px' }} /> Add
            </IconAdd>
          </TitleContainer>
          <Table columns={columns} dataSource={companies} rowKey="id" />
        </PageContainer>
      </Content>

      <ModalAddCompany
        isVisible={isAddModalVisible}
        onClose={hideModal}
        onAdd={handleAddSuccess}
      />
      <ModalEditCompany
        isVisible={isEditModalVisible}
        company={selectedCompany}
        onClose={handleCloseModal}
        onUpdate={handleUpdateSuccess}
      />
      {selectedCompany && (
        <ModalDeleteCompany
          visible={deleteModalVisible}
          onClose={handleDeleteModalClose}
          selectedCompanyId={selectedCompany}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </Layout>
  );
};

export default CompaniesPage;
