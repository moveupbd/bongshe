import React from 'react';
// import './Cart.css';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';

const Cart = (props) => {
    const { cart } = props;
    // console.log(props);

    let totalPrice = 0;
    let shipping = 0;

    let grandTotal = 0;
    let totalQuantity = 0;
    for (const product of cart) {
        if (!product.quantity) {
            product.quantity = 1;
        }
        totalPrice = totalPrice + product.regularPrice * product.quantity;
        totalQuantity = totalQuantity + product.quantity;
        if (totalPrice > 1000) { shipping = 60 }
        else { shipping = 20 }

        grandTotal = totalPrice + shipping;
    }

    return (
        <Container>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell align="center">Total Quantity: </TableCell>
                            <TableCell align="center">Price </TableCell>
                            <TableCell align="center">Delivery Cost:</TableCell>
                            <TableCell align="center">Total Price: </TableCell>
                        </TableRow>


                    </TableHead>
                    <TableBody>


                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                        >



                            <TableCell align="center" component="th" scope="row">
                                {totalQuantity}
                            </TableCell>

                            <TableCell align="center">{parseFloat(totalPrice).toFixed(2)}</TableCell>
                            <TableCell align="center">{parseFloat(shipping).toFixed(2)}</TableCell>

                            <TableCell align="center">{parseFloat(grandTotal).toFixed(2)}</TableCell>

                        </TableRow>


                    </TableBody>

                </Table>
                {props.children}
            </TableContainer>
        </Container>
    );
};

export default Cart;