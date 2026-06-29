"use client";
import { Box, Pagination } from "@mui/material";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  paginationProps?: any;
  setPage?: any;
  pageKeyName?: string;
  limit?: number;
}

export function CustomPagination({ currentPage, totalPages, onPageChange, paginationProps }: CustomPaginationProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange?.(page)}
        {...paginationProps}
      />
    </Box>
  );
}
