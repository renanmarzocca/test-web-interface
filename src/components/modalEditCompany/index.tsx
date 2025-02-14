// Core
import React, { useState, useEffect } from "react";

//Libraries
import { Modal, Form, Input, Button, InputNumber, Select } from "antd";

// Services
import { updateCompany } from "../../services/modules/companies";
import { getAllCustomers } from "../../services/modules/customers"; // Import the function

export interface Company {
  id: string;
  name_company: string;
  cnpj: string;
  salary: number;
  customerId?: string;
}

export interface Customer {
  id: string;
  name: string;
}

interface ModalEditCompanyProps {
  isVisible: boolean;
  company: Company | null;
  onClose: () => void;
  onUpdate: () => void;
}

const ModalEditCompany: React.FC<ModalEditCompanyProps> = ({
  isVisible,
  company,
  onClose,
  onUpdate,
}) => {

  // STATES
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    if (isVisible) {
      const fetchCustomers = async () => {
        try {
          const customersList = await getAllCustomers();
          setCustomers(customersList);
        } catch (error) {
          console.error("Error fetching customers:", error);
        }
      };
      fetchCustomers();
    }
  }, [isVisible]);

  useEffect(() => {
    if (company) {
      form.setFieldsValue({
        name_company: company.name_company,
        cnpj: company.cnpj,
        salary: company.salary,
        customerId: company.customerId || undefined,
      });
    }
  }, [company, form]);

  const handleEditCompany = async (values: any) => {
    if (!company) return;

    setLoading(true);
    try {
      await updateCompany(company.id, {
        name_company: values.name_company,
        salary: values.salary,
        customerId: values.customerId || undefined,
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating company:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Editar empresa"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleEditCompany}
        initialValues={{
          salary: 0,
        }}
      >
        <Form.Item
          label="Nome da empresa"
          name="name_company"
          rules={[{ required: true, message: "Por favor coloque o nome da empresa!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="CNPJ"
          name="cnpj"
          rules={[{ required: true, message: "Por favor coloque o CNPJ!" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Salário"
          name="salary"
          rules={[{ required: true, message: "Por favor coloque o salário da empresa!" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item label="Cliente" name="customerId">
          <Select allowClear placeholder="Selecione um cliente">
            {customers.map((customer) => (
              <Select.Option key={customer.id} value={customer.id}>
                {customer.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ backgroundColor: "#EB6625", width: "100%" }}
          >
            Atualizar Empresa
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditCompany;
