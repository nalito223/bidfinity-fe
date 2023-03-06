import { createContext } from 'react';

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
  handleLogin: (matchingAccount: Account) => void;
  handleLogout: () => void;
  openModal: (selectedForm: string) => void;
  closeModal: () => void;
  handleOpenModal: () => void;
  handleCreateAccount: (email: string, password: string, userType: string) => void;
  accountsData: Account[];
  projectsData: {
    id: number;
    project_title: string;
    created_date: string;
    location: string;
    project_summary: string;
    status: string;
    contact_information: string;
    upload_id: number;
  }[];
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
  projectsData: [],
});

export default AppContext;
