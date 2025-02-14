// Core
import React, { useState } from 'react';

// Libraries
import { Modal, Button } from 'antd';

// Services
import { deleteCompany } from '../../services/modules/companies';

interface ModalDeleteCompanyProps {
  visible: boolean;
  onClose: () => void;
  selectedCompanyId: string;
  onDeleteSuccess: () => void;
}

const ModalDeleteCompany: React.FC<ModalDeleteCompanyProps> = ({ visible, onClose, selectedCompanyId, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteCompany(selectedCompanyId);
      onDeleteSuccess();
      onClose();
    } catch (error) {
      console.error('Error deleting company:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Deletar empresa"
      visible={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <p>Você tem certeza que deseja deletar esta empresa?</p>
      <Button onClick={onClose} style={{ marginRight: 8 }}>
        Cancelar
      </Button>
      <Button
        type="primary"
        danger
        loading={loading}
        onClick={handleDelete}
      >
        Deletar
      </Button>
    </Modal>
  );
};

export default ModalDeleteCompany;
