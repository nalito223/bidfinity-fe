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
  account_type: string;
  hosted_projects: number[];
  bookmarked_projects: number[];
  country: string;
  business_name?: string;
  image?: string;
};

interface AppContextType {
  user: Account | null;
  // currentUser: Account | null;
  // setCurrentUser: React.Dispatch<React.SetStateAction<Account | null>>;
  handleLogin: (matchingAccount: Account) => void;
  handleLogout: () => void;
  openModal: (selectedForm: string) => void;
  closeModal: () => void;
  handleOpenModal: () => void;
  handleCreateAccount: (email: string, password: string, userType: string) => void;
  accountsData: Account[];
}



export const AppContext = createContext<AppContextType>({
  user: null,
  handleLogin: () => { },
  handleLogout: () => { },
  openModal: () => { },
  closeModal: () => { },
  handleOpenModal: () => { },
  handleCreateAccount: () => { },
  accountsData: [],
  // currentUser: null,
  // setCurrentUser: () => {}
});



export default AppContext;
