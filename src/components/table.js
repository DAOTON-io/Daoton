import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { makeStyles } from "@mui/styles";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditIcon from '@mui/icons-material/Edit';
const useStyles = makeStyles({
    buttonEdit: {
        backgroundColor: "#ff761c !important",
        color: "white !important",
        textTransform: "none    !important",
        margin: "0.5rem !important",
        borderRadius: "5rem !important",
        padding: "0rem!important",
        fontSize: "0.8rem !important",
    },

});
const columns = [
    { id: 'ID', label: 'ID', minWidth: 50 },
    { id: 'Contract', label: 'Contract Name', minWidth: 120 },
    {
        id: 'DAO',
        label: 'DAO Type',
        minWidth: 120,


    },
    {
        id: 'Adress',
        label: 'Contract Adress',
        minWidth: 120,
        align: 'right',

    },
    {
        id: 'Token',
        label: 'Token Adress',
        minWidth: 120,
        align: 'right',

    },
    {
        id: 'URL',
        label: 'Published URL',
        minWidth: 120,
        align: 'right',

    },
    {
        id: 'Date',
        label: 'Created Date',
        minWidth: 120,
        align: 'right',

    },


];

function createData(ID, Contract, DAO, Adress, Token, URL, Date) {

    return { ID, Contract, DAO, Adress, Token, URL, Date };
}

const rows = [
    createData('0', 'Argedor VC DAO', '10X2847227864', '0X28747476', 'Proposal/0X34988374', '10/12/2022', '10/12/2022'),

    createData('1', 'Argedor VC DAO', '10X2847227864', '0X28747476', 'Proposal/0X34988374', '10/12/2022', '10/12/2022'),
    createData('2', 'Argedor VC DAO', '10X2847227864', '0X28747476', 'Proposal/0X34988374', '10/12/2022', '10/12/2022'),
    createData('3', 'Argedor VC DAO', '10X2847227864', '0X28747476', 'Proposal/0X34988374', '10/12/2022', '10/12/2022'),
    createData('4', 'Argedor VC DAO', '10X2847227864', '0X28747476', 'Proposal/0X34988374', '10/12/2022', '10/12/2022'),
    createData('5', 'Argedor VC DAO', '10X2847227864', '0X28747476', 'Proposal/0X34988374', '10/12/2022', '10/12/2022'),
    createData('6', 'Argedor VC DAO', '10X2847227864', '0X28747476', 'Proposal/0X34988374', '10/12/2022', '10/12/2022'),

    createData('7', 'Argedor VC DAO', '10X2847227864', '0X28747476', 'Proposal/0X34988374', '10/12/2022', '10/12/2022'),


];

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const classes = useStyles();

    return (
        <div style={{
            paddingTop: '1rem'
        }} >
            <Paper sx={{ width: '80vw', overflow: 'hidden', borderRadius: '1rem' }}>
                <TableContainer sx={{ maxHeight: 500, }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow  >
                                {columns.map((column) => (
                                    <TableCell

                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, fontWeight: 'bold', }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell style={{
                                                        fontSize: '12px',
                                                    }} key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}<Button className={classes.buttonEdit} > <ThumbUpIcon style={{ fontSize: '14px', marginRight: '5px' }} /> Oyla</Button>
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
}
