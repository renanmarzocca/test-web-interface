// Core
import api from "../api";

// Utils
import { getAuthHeader } from "../../utils/apiUtils";

interface Customer {
  id: string;
  name: string;
  salary: number;
  selected: boolean;
}

// Function to create a new customer
export const createCustomer = async (name: string, salary: number, selected: boolean): Promise<Customer> => {
  try {
    const response = await api.post(
      "/customers",
      { name, salary, selected },
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

// Function to get all customers
export const getAllCustomers = async () => {
  try {
    const response = await api.get("/customers", {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

// Function to get a customer by ID
export const getCustomerById = async (id: string) => {
  try {
    const response = await api.get(`/customers/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    throw error;
  }
};

// Function to update a customer
export const updateCustomer = async (
  id: string,
  name?: string,
  salary?: number,
  selected?: boolean
) => {
  try {
    const response = await api.patch(
      `/customers/${id}`,
      { name, salary, selected },
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

// Function to delete a customer
export const deleteCustomer = async (id: string) => {
  try {
    const response = await api.delete(`/customers/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};

// Function to get selected customers
export const getAllSelectedCustomers = async () => {
  try {
    const response = await fetch("http://localhost:3000/selected", {
      headers: getAuthHeader(),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch selected customers");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching selected customers:", error);
    throw error;
  }
};
