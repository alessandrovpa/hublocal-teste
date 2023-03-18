import { useContext } from 'react';
import { AddressModalContext } from '../context/AddressModalContext';

export function useAddressModal() {
  const addressModalContext = useContext(AddressModalContext);

  return addressModalContext;
}
