import { createContext, ReactNode, useState } from 'react';

interface CompanyModalContextData {
  isModalOpened: boolean;
  isDeleteModalOpened: boolean;
  companyIndex?: number | null;
  openModal: () => void;
  closeModal: () => void;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
  updateCompanyIndex: (index: number) => void;
}

export const CompanyModalContext = createContext({} as CompanyModalContextData);

interface AddressModalContexrProviderProps {
  children: ReactNode;
}

export function CompanyModalContextProvider({
  children,
}: AddressModalContexrProviderProps) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [companyIndex, setcompanyIndex] = useState<number | null>(null);

  function openModal() {
    setIsModalOpened(true);
  }
  function closeModal() {
    setcompanyIndex(null);
    setIsModalOpened(false);
  }

  function openDeleteModal() {
    setIsDeleteModalOpened(true);
  }
  function closeDeleteModal() {
    setcompanyIndex(null);
    setIsDeleteModalOpened(false);
  }

  function updateCompanyIndex(index: number) {
    setcompanyIndex(index);
  }

  return (
    <CompanyModalContext.Provider
      value={{
        isModalOpened,
        companyIndex,
        openModal,
        closeModal,
        isDeleteModalOpened,
        openDeleteModal,
        closeDeleteModal,
        updateCompanyIndex,
      }}
    >
      {children}
    </CompanyModalContext.Provider>
  );
}
