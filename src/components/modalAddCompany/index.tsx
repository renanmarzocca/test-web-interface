// Core
import React, { useState } from 'react';

// Libraries
import { Modal, Form, Input, Button, InputNumber } from 'antd';

// Services
import { createCompany } from '../../services/modules/companies';

interface ModalAddCompanyProps {
  isVisible: boolean;
  onClose: () => void;
  onAdd: () => void;
}

const ModalAddCompany: React.FC<ModalAddCompanyProps> = ({ isVisible, onClose, onAdd }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleAddCompany = async (values: any) => {
    setLoading(true);
    try {
      await createCompany({
        cnpj: values.cnpj,
        name_company: values.name_company,
        salary: values.salary,
        customerId: values.customerId,
      });
      onAdd();
      form.resetFields();
      onClose();
    } catch (error) {
      console.error('Error creating company:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Criar nova empresa"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddCompany}
        initialValues={{
          salary: 0,
        }}
      >
        <Form.Item
          label="Nome da empresa"
          name="name_company"
          rules={[{ required: true, message: 'Por favor coloque o nome da empresa!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="CNPJ"
          name="cnpj"
          rules={[{ required: true, message: 'Por favor coloque o CNPJ!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Salário"
          name="salary"
          rules={[{ required: true, message: 'Por favor informe o salário!' }]}
        >
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: "#EB6625", width: '100%' }}>
            Adicionar empresa
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddCompany;
