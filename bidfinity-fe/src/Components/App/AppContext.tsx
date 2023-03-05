// AppContext.tsx
import { getDefaultNormalizer } from '@testing-library/react';
import { createContext } from 'react';
// const { accountsData, uploadsData, projectsData } = require('../fakeData/data');


type Account = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  account_type: 'buyer' | 'supplier';
  hosted_projects: number[];
  bookmarked_projects: number[];
  country: string;
  business_name?: string;
  image?: string;
};

type AppContextType = {
  user: Account | null;
  handleLogin: (newUser: Account) => void;
  handleLogout: () => void;
  openModal: (selectedForm: string) => void;
  closeModal: () => void;
  handleOpenModal: () => void;
  handleCreateAccount: (accountInfo: { email: string, password: string, userType: string }) => void;
  accountsData: Account[]
};

export const AppContext = createContext<AppContextType>({
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
  openModal: () => { },
  closeModal: () => { },
  handleOpenModal: () => { },
  handleCreateAccount: () => { },
  accountsData: []
});


export default AppContext;
