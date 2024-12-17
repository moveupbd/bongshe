import { Box, Button, Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Header from '../Header/Header';
import Product from '../Product/Product';
import './Shop.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('/products.JSON')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        if (products.length) {
            const savedCart = getStoredCart();
            const storedCart = [];
            for (const key in savedCart) {
                const addedProduct = products.find(product => product.key === key);
                if (addedProduct) {
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);
                }

            }
            setCart(storedCart);
        }
    }, [products])

    const handleAddToCart = (product) => {
        const exists = cart.find(pd => pd.key === product.key);
        let newCart = [];
        if (exists) {
            const remaining = cart.filter(pd => pd.key !== product.key);
            exists.quantity = exists.quantity + 1;
            newCart = [...remaining, product]
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDb(product.key);
    }


    //     const newCart = [...cart, product]
    //     setCart(newCart)
    //     // console.log(cart)
    //     addToDb(product.key)
    // }

    return (
        <>
            <Container>
                <Header></Header>


                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Total Item: {cart.length}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Cart cart={cart}>
                            <Link to="/review" style={{ textDecoration: "none" }}>
                                <Button variant="contained" color="warning">Review Cart</Button>
                            </Link>
                        </Cart>
                    </AccordionDetails>
                </Accordion>




                <Box sx={{ flexGrow: 1 }}>

                    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                            products.map(product =>
                                <Grid item xs={12} sm={6} md={4}>

                                    <Product
                                        key={product.key}
                                        product={product}
                                        handleAddToCart={handleAddToCart}
                                    >
                                    </Product>

                                </Grid>)
                        }

                    </Grid>
                </Box>


            </Container>

            <Box gridColumn="span 4">
                {/* <Cart cart={cart}>

                    <Link to="/review" style={{ textDecoration: "none" }}>
                        <Button variant="contained" color="warning">Checkout111</Button>
                    </Link>

                </Cart> */}
            </Box>
        </>
    );
};

export default Shop;