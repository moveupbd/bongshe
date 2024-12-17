import { Alert, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { clearTheCart, deleteFromDb } from '../../utilities/fakedb';
import Header from '../Header/Header';



import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAuth from '../../hooks/useAuth';



const OrderReview = () => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);
    const { user } = useAuth();
    const initialInfo = { customerName: user?.displayName, email: user?.email, phone: '', address: '' }
    const [orderInfo, setOrderInfo] = useState(initialInfo);
    const [orderSuccess, setOrderSuccess] = useState(false);

    // console.log(cart);

    const handleRemove = key => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        deleteFromDb(key);
    }

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newOrderInfo = { ...orderInfo };
        newOrderInfo[field] = value;
        setOrderInfo(newOrderInfo);
    }

    const orderData = cart.map(item => {
        const container = {};

        container[item.key] = item.quantity;
        container[item.name] = item.quantity;

        return container;
    })


    const handlePlaceOrder = e => {

        const order = {
            ...orderInfo,
            productName: orderData
        }

        fetch('https://peaceful-tundra-51440.herokuapp.com/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setOrderSuccess(true)
                    setCart([]);
                    clearTheCart();
                    // navigate('/');
                }
            });

        e.preventDefault();

    }
    return (
        <Container>
            <Header></Header>


            {orderSuccess && <Alert severity="success">Order Confirmed!</Alert>}
            <Grid container spacing={2}>
                <Grid item sx={{ mt: 8 }} xs={12} md={6}>

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Product Image</TableCell>
                                    <TableCell align="center">Product Name</TableCell>
                                    <TableCell align="center">Price Per Item</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="center">Review</TableCell>
                                </TableRow>


                            </TableHead>
                            <TableBody>

                                {
                                    cart.map(product => <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        key={product.key}
                                        product={product}
                                        handleRemove={handleRemove}
                                    >

                                        <TableCell align="center" >
                                            <img style={{ height: "150px" }} src={product.img} alt="" />
                                        </TableCell>

                                        <TableCell align="center" component="th" scope="row">
                                            {product.name}
                                        </TableCell>

                                        <TableCell align="center">{product.price}</TableCell>
                                        <TableCell align="center">{product.quantity}</TableCell>

                                        <TableCell align="center">Remove Item</TableCell>

                                    </TableRow>
                                    )
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} md={6}>


                    <Typography variant="h6" gutterBottom>Your Information</Typography>
                    <form onSubmit={handlePlaceOrder}>

                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Name"
                            defaultValue={user?.displayName}
                            name="customerName"
                            onBlur={handleOnBlur}
                            variant="standard" />

                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Email"
                            name="email"
                            defaultValue={user?.email}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="standard"
                        />

                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Address"
                            name="address"
                            onBlur={handleOnBlur}
                            variant="standard" />

                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Phone Number"
                            name="phone"
                            onBlur={handleOnBlur}
                            variant="standard" />



                        <Button sx={{ width: '75%', m: 1 }} type="submit" variant="contained">Place Order</Button>

                    </form>



                </Grid>
            </Grid >



        </Container >
    );
};

export default OrderReview;