// Core
import styled from "styled-components";

// Components
import { Card } from "antd";

export const PageContainer = styled.div`
  flex-wrap: wrap;
  gap: 20px;
  padding: 40px;
  justify-content: center;
  background-color: #f5f5f5;
  min-height: 87vh;
`;

export const CustomCard = styled(Card)`
  width: 600px;
  height: 200px;
  background-color: rgba(243, 243, 243, 0.94);
  text-align: center;
  border-radius: 12px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border: none;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }

  .ant-card-head {
    border-bottom: 1px solid black;
    display: flex;
    align-items: center;
  }

  .ant-card-body {
    background-color: rgba(243, 243, 243, 0.94);
    color: #333;
    text-align: center;
    padding: 0 20px;
  }

  .star-icon {
    cursor: pointer;
    font-size: 30px;
    padding-top: 10px;
    width: 31px;
    height: 30px;
    display: flex;
    position: absolute;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding-bottom: 20px;
`;

export const TitleCount = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  padding: 0;
  color: #333;
`;

export const IconAdd = styled.button`
  display: flex;
  align-items: center;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  margin-left: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

export const Name = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

export const Salary = styled.p`
  font-size: 16px;
  color: green;
  font-weight: bold;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

export const IconButton = styled.button<{ iconType?: string }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 26px;
  padding-top: 15px;
  padding-right: 20px;
  color: ${({ iconType }) => 
    iconType === 'view' ? '#555' :
    iconType === 'edit' ? '#555' : 
    iconType === 'delete' ? '#555' : '#555'};

  &:hover {
    color: ${({ iconType }) => 
      iconType === 'view' ? '#0056b3' : 
      iconType === 'edit' ? '#eb6625' : 
      iconType === 'delete' ? '#c82333' : '#000'};
  }
`;