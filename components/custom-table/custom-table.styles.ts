import { styled } from "@mui/material/styles";
import type { Theme } from "@mui/material";
import { TableCell, TableRow, tableCellClasses } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:
      theme.palette.mode === "dark"
        ? `rgba(255,255,255,0.04) !important`
        : `#FAFAF8 !important`,
    height: 40,
    color: "#9CA3AF",
    textAlign: "left",
    fontWeight: 600,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    whiteSpace: "nowrap",
    zIndex: 1,
    padding: "0px 16px",
    borderBottom:
      theme.palette.mode === "dark"
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid #F1ECE2",
    borderRadius: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "13px",
    fontWeight: 400,
    textAlign: "left",
    color:
      theme.palette.mode === "dark" ? "#C9D2E0" : "#3A4763",
    whiteSpace: "nowrap",
    padding: "13px 16px",
    borderBottom:
      theme.palette.mode === "dark"
        ? "1px solid rgba(255,255,255,0.06)"
        : "1px solid #F1ECE2",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  background: theme.palette.mode === "dark"
    ? theme.palette.grey[900]
    : theme.palette.common.white,

  "&:last-of-type td": {
    borderBottom: "none",
  },

  "&:first-of-type th": {
    border: "none",
  },

  "&:hover td": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.03)"
        : "rgba(21,35,63,0.02)",
  },
}));

export const styles = {
  tableContainer: (tableContainerSX: any, theme: any) => ({
    "&::-webkit-scrollbar": {
      width: 10,
      height: 6,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 2,
    },
    mt: theme.palette.mode === "dark" ? 0.5 : 0,
    ...tableContainerSX,
  }),
  cell: {
    display: "flex",
    justifyContent: "flex-start",
  },

  currentPageBox: {
    display: "flex",
    my: "15px",
    px: "25px",
    alignItems: "center",
  },

  currentPage: (theme: any) => ({
    color: theme.palette.grey[600],
    fontSize: "12px",
  }),
  error: (theme: Theme) => ({
    background: theme.palette.background.paper,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),

  pagination: (theme: any) => ({
    ".Mui-selected": {
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: theme.palette.common.white,
    },
  }),
};
