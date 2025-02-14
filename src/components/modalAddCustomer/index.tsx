// Libraries
import { Modal, Input, Form, Button, notification } from 'antd';

// Services
import { createCustomer } from '../../services/modules/customers';

interface ModalAddCustomerProps {
  isVisible: boolean;
  onClose: () => void;
  onAdd: () => void;
}

const ModalAddCustomer = ({ isVisible, onClose, onAdd }: ModalAddCustomerProps) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = form.getFieldsValue();
      const { name, salary } = values;

      if (!name || !salary) {
        return notification.error({
          message: 'Validation Error',
          description: 'Nome e salário são requeridos.',
        });
      }

      await createCustomer(name, salary, false);
      onAdd();
      
      notification.success({
        message: 'Cliente Criado',
        description: 'O cliente foi criado com sucesso!',
      });

      onClose();
      form.resetFields();
    } catch (error) {
      console.error('Error creating customer:', error);
      notification.error({
        message: 'Falha na criação',
        description: 'Falha ao criar o cliente. Por favor tente novamente.',
      });
    }
  };

  return (
    <Modal
      title="Adicionar novo cliente"
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit} style={{ backgroundColor: "#EB6625" }}>
          Adicionar Cliente
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nome do cliente"
          name="name"
          rules={[{ required: true, message: 'Por favor entre com o nome do cliente!' }]}
        >
          <Input placeholder="Nome do cliente" />
        </Form.Item>

        <Form.Item
          label="Salário"
          name="salary"
          rules={[{ required: true, message: 'Por favor entre com o valor do salário!' }]}
        >
          <Input placeholder="Salário" type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddCustomer;
