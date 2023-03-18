import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import React, { useState } from 'react';
import { StyledPaper } from './styles';
import { Edit, Delete } from '@mui/icons-material';
import { useAddressModal } from '../../../../../hooks/useAddressModal';

interface Address {
  id: string;
  name: string;
}

interface CompanyTableProps {
  addresses: Address[];
}

export function AddressTable({ addresses }: CompanyTableProps) {
  const { openModal, updateAddressIndex, openDeleteModal } = useAddressModal();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function handleChangePage(
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function handleOpenEditModal(index: number) {
    updateAddressIndex(index);
    openModal();
  }

  function handleOpenDeleteModal(index: number) {
    updateAddressIndex(index);
    openDeleteModal();
  }

  return (
    <TableContainer component={StyledPaper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell size="medium">Local</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addresses
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((address, index) => {
              return (
                <TableRow key={address.id}>
                  <TableCell>{address.name}</TableCell>
                  <TableCell>
                    <button onClick={() => handleOpenEditModal(index)}>
                      <Edit />
                    </button>
                    <button onClick={() => handleOpenDeleteModal(index)}>
                      <Delete color="error" />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              colSpan={3}
              count={addresses.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage="Linas por página"
              labelDisplayedRows={({ from, to, count }) => {
                return `${from}-${to} de ${count}`;
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
