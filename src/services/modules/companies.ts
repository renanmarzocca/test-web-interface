// Core
import api from '../api';

// Utils
import { getAuthHeader } from '../../utils/apiUtils';

export interface Company {
  id: string;
  cnpj: string;
  name_company: string;
  salary: number;
  customer_id: string;
  date_created?: string;
}

// Fetch all companies
export const getAllCompanies = async (): Promise<Company[]> => {
  const response = await api.get('/companies', { headers: getAuthHeader() });
  return response.data;
};

// Fetch companies filtered by customer ID
export const getCompaniesByCustomerId = async (customerId: string): Promise<Company[]> => {
  const response = await api.get(`/companies/custid/${customerId}`, { headers: getAuthHeader() });
  return response.data;
};

// Fetch a single company by ID
export const getCompanyById = async (id: string): Promise<Company> => {
  const response = await api.get(`/companies/${id}`, { headers: getAuthHeader() });
  return response.data;
};

// Create a new company
export const createCompany = async (companyData: {
  cnpj: string;
  name_company: string;
  salary: number;
  customerId?: string;
}): Promise<Company> => {
  const response = await api.post('/companies', companyData, { headers: getAuthHeader() });
  return response.data;
};

// Update a company by ID
export const updateCompany = async (
  id: string,
  updateData: { name_company?: string; salary?: number; customerId?: string }
): Promise<Company> => {
  const response = await api.patch(`/companies/${id}`, updateData, { headers: getAuthHeader() });
  return response.data;
};

// Delete a company by ID
export const deleteCompany = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/companies/${id}`, { headers: getAuthHeader() });
  return response.data;
};
