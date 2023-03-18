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
import { Edit, Place, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCompanyModal } from '../../../../../hooks/useCompanyModal';

interface Company {
  id: string;
  name: string;
  addressesCount: number;
}

interface CompanyTableProps {
  companies: Company[];
}

export function CompanyTable({ companies }: CompanyTableProps) {
  const { openModal, openDeleteModal, updateCompanyIndex } = useCompanyModal();
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
    updateCompanyIndex(index);
    openModal();
  }

  function handleOpenDeleteModal(index: number) {
    updateCompanyIndex(index);
    openDeleteModal();
  }

  return (
    <TableContainer
      component={StyledPaper}
      sx={{ overflowY: 'auto', maxHeight: '70vh' }}
    >
      <Table>
        <TableHead sx={{ position: 'sticky', top: 0, background: 'white' }}>
          <TableRow>
            <TableCell size="medium">Empresa</TableCell>
            <TableCell>Qt de Locais</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((company, index) => {
              return (
                <TableRow key={company.id}>
                  <TableCell size="medium">{company.name}</TableCell>
                  <TableCell>{company.addressesCount}</TableCell>
                  <TableCell>
                    <button onClick={() => handleOpenEditModal(index)}>
                      <Edit />
                    </button>
                    <button>
                      <Link to={`/dashboard/company/${company.id}`}>
                        <Place />
                      </Link>
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
              count={companies.length}
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
