import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const useStyles = makeStyles({
  buttonEdit: {
    backgroundColor: "#ff761c !important",
    color: "white !important",
    // textTransform: "none    !important",
    margin: "0.5rem !important",
    borderRadius: "5rem !important",
    padding: "0rem!important",
    fontSize: "0.8rem !important",
  },
});

const columns = [
  { id: "Contract", label: "Proposal", minWidth: 120 },
  {
    id: "DAO",
    label: "DAO Type",
    minWidth: 120,
  },
  {
    id: "Adress",
    label: "Contract Adress",
    minWidth: 120,
    align: "right",
  },
  {
    id: "Token",
    label: "Token Adress",
    minWidth: 120,
    align: "right",
  },
  {
    id: "Date",
    label: "Created Date",
    minWidth: 120,
    align: "right",
  },
];

function createData(Contract: any, DAO: any, Adress: any, Token: any, Date: any) {
  return { Contract, DAO, Adress, Token, Date };
}

type Props = {
  daoId: string;
  tokenContract: string;
};

export const StickyHeadTable: React.FC<Props> = ({ daoId, tokenContract }) => {
  //get proposals from local storage and filter by daoId

  //create rows for table from proposals array by mapping
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    //get proposals from API and save to rows. Api is 188.132.128.77:1423/getContracts/:id
    axios.get(`https://0xfb5f6301747772afa27c55100b95eb29f07dbeb5.diode.link/getContracts/${daoId}`).then((res) => {
      console.log(res.data);
      const proposals = res.data;
      var tempData = proposals.map((proposal: { contract_description: any; DAO_Id: any; contract_address: any; contract_name: any }) =>
        createData(proposal.contract_description, proposal.DAO_Id, proposal.contract_address, proposal.contract_address, proposal.contract_name)
      );
      setRows(tempData);
    });
  }, [daoId]);

  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string | number } }) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const classes = useStyles();

  return (
    <div
      style={{
        paddingTop: "1rem",
      }}
    >
      <Paper sx={{ width: "80vw", overflow: "hidden", borderRadius: "1rem" }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align as "right" | "center" | "left" | "inherit" | "justify" | undefined}
                    style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column: any) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          style={{
                            fontSize: "12px",
                          }}
                          key={column.id}
                          align={column.align as "right" | "center" | "left" | "inherit" | "justify" | undefined}
                        >
                          {column.format && typeof value === "number" ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                    {/* go to /vote page with proposalId like: /vote/0x123456789 */}
                    <a href={`/vote/${row.Adress}`}>
                      <Button className={classes.buttonEdit}>
                        {" "}
                        <EditIcon style={{ fontSize: "14px", marginRight: "5px" }} /> Vote
                      </Button>
                    </a>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
