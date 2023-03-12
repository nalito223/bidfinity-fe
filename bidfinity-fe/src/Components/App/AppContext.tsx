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
  location: { lat: number; lng: number; address: string; };
  project_summary: string;
  status: string;
  contact_information: string;
  upload_id: number;
  lineItems: {
    itemName: string;
    quantity: string;
    description: string;
  }[];
}

interface AppContextType {
  user: Account | null;
  handleLogin: (matchingAccount: Account) => void;
  handleLogout: () => void;
  openModal: (selectedForm: string) => void;
  closeModal: () => void;
  setSelectedProject: Dispatch<SetStateAction<Project | null>>;
  setSearchedLat: Dispatch<SetStateAction<number | null>>;
  setSearchedLon: Dispatch<SetStateAction<number | null>>;
  handleOpenModal: () => void;
  handleCreateAccount: (email: string, password: string, userType: string) => void;
  setFilteredProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setProjectsData: React.Dispatch<React.SetStateAction<Project[]>>;
  searchedLat: number | null;
  searchedLon: number | null;
  accountsData: Account[];
  selectedProject?: Project | null;
  projectsData: Project[];
  allProjects: Project[];
}

export const AppContext = createContext<AppContextType>({
  user: null,
  searchedLat: null,
  searchedLon: null,
  handleLogin: () => { },
  handleLogout: () => { },
  openModal: () => { },
  closeModal: () => { },
  handleOpenModal: () => { },
  handleCreateAccount: () => { },
  setSelectedProject: () => { },
  setFilteredProjects: () => { },
  setSearchedLat: () => { },
  setSearchedLon: () => { },
  setProjectsData: () => { },
  selectedProject: null,
  accountsData: [],
  projectsData: [],
  allProjects: [],
});

export default AppContext;
