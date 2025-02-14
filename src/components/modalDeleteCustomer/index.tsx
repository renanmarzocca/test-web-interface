// Core
import React from "react";

// Libraries
import { Modal, Button } from "antd";

// Services
import { deleteCustomer } from "../../services/modules/customers";

interface ModalDeleteCustomerProps {
  visible: boolean;
  onClose: () => void;
  customerId: string;
  onDeleteSuccess: () => void;
}

const ModalDeleteCustomer: React.FC<ModalDeleteCustomerProps> = ({
  visible,
  onClose,
  customerId,
  onDeleteSuccess,
}) => {
  const handleDelete = async () => {
    try {
      await deleteCustomer(customerId);
      onDeleteSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
  };

  return (
    <Modal
      title="Deletar cliente"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="delete" type="primary" danger onClick={handleDelete}>
          Deletar
        </Button>,
      ]}
    >
      <p>Você tem certeza que deseja deletar este cliente?</p>
    </Modal>
  );
};

export default ModalDeleteCustomer;
