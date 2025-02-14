// Core
import { useState, useEffect } from "react";

// Libraries
import { Modal, Input, Button } from "antd";

// Services
import { updateCustomer } from "../../services/modules/customers";

interface ModalEditCustomerProps {
  visible: boolean;
  customer: { id: string; name: string; salary: number } | null;
  onClose: () => void;
  onUpdateSuccess: () => void;
}

const ModalEditCustomer: React.FC<ModalEditCustomerProps> = ({
  visible,
  customer,
  onClose,
  onUpdateSuccess,
}) => {
  const [name, setName] = useState(customer?.name || "");
  const [salary, setSalary] = useState<number | null>(customer?.salary || null);

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setSalary(customer.salary);
    }
  }, [customer]);
  

  const handleUpdateCustomer = async () => {
    if (customer) {
      try {
        await updateCustomer(customer.id, name, salary || 0);
        onUpdateSuccess();
        onClose();
      } catch (error) {
        console.error("Error updating customer:", error);
      }
    }
  };

  return (
    <Modal
      title="Editar cliente"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdateCustomer} style={{ backgroundColor: "#EB6625" }}>
          Atualizar
        </Button>,
      ]}
    >
      <Input
        placeholder="Nome do cliente"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Input
        placeholder="Salário"
        type="number"
        value={salary !== null ? salary : ""}
        onChange={(e) => setSalary(Number(e.target.value))}
      />
    </Modal>
  );
};

export default ModalEditCustomer;
