import { createContext, ReactNode, useState } from 'react';

interface AddressModalContextData {
  isModalOpened: boolean;
  isDeleteModalOpened: boolean;
  addressIndex?: number | null;
  openModal: () => void;
  closeModal: () => void;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
  updateAddressIndex: (index: number) => void;
}

export const AddressModalContext = createContext({} as AddressModalContextData);

interface AddressModalContexrProviderProps {
  children: ReactNode;
}

export function AddressModalContextProvider({
  children,
}: AddressModalContexrProviderProps) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [addressIndex, setAddressIndex] = useState<number | null>(null);

  function openModal() {
    setIsModalOpened(true);
  }
  function closeModal() {
    setAddressIndex(null);
    setIsModalOpened(false);
  }

  function openDeleteModal() {
    setIsDeleteModalOpened(true);
  }
  function closeDeleteModal() {
    setAddressIndex(null);
    setIsDeleteModalOpened(false);
  }

  function updateAddressIndex(index: number) {
    setAddressIndex(index);
  }

  return (
    <AddressModalContext.Provider
      value={{
        isModalOpened,
        addressIndex,
        openModal,
        closeModal,
        isDeleteModalOpened,
        openDeleteModal,
        closeDeleteModal,
        updateAddressIndex,
      }}
    >
      {children}
    </AddressModalContext.Provider>
  );
}
