import { createContext, Dispatch, SetStateAction } from 'react';

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

interface Project {
  id: number;
  project_title: string;
  created_date: string;
  location: { lat: number; lng: number };
  project_summary: string;
  status: string;
  contact_information: string;
  upload_id: number;
}

interface AppContextType {
  user: Account | null;
  handleLogin: (matchingAccount: Account) => void;
  handleLogout: () => void;
  openModal: (selectedForm: string) => void;
  closeModal: () => void;
  setSelectedProject: Dispatch<SetStateAction<Project | null>>;
  handleOpenModal: () => void;
  handleCreateAccount: (email: string, password: string, userType: string) => void;
  accountsData: Account[];
  selectedProject?: Project | null;
  projectsData: Project[];
}

export const AppContext = createContext<AppContextType>({
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
  openModal: () => {},
  closeModal: () => {},
  handleOpenModal: () => {},
  handleCreateAccount: () => {},
  setSelectedProject: () => {},
  selectedProject: null,
  accountsData: [],
  projectsData: [],
});

export default AppContext;
