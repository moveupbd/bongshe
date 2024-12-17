import React from 'react';
import './Product.css';
import Rating from '@mui/material/Rating';

import { Button, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';


const Product = (props) => {
    const { key, rating, price, regularPrice, name, stock, img } = props.product || {}
    const { handleAddToCart } = props || {}
    // console.log(key)
    return (
        <>
            <Card >

                <CardMedia
                    component="img"
                    height="100%"
                    image={img}
                    alt="Paella dish"
                />
                <CardHeader
                    sx={{ color: "midnightblue" }}
                    title={name}
                />
                <CardContent>
                    {/* <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                    </Typography> */}

                    <Typography variant="h6" color="text.secondary">
                        Regular Price: {regularPrice}
                    </Typography>
                    <Typography variant="h6" color="red">
                        Discount Price: {price}
                    </Typography>

                    <p><small>Only {stock} left in stock - Order Now</small></p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="warning" onClick={() => handleAddToCart(props.product)} className="btn btn-danger"><ShoppingCartIcon></ShoppingCartIcon> Add To Cart</Button>

                        <Link to={`/detail/${key}`}> Detail</Link>
                    </div>
                    {/* <Rating name="read-only" value={rating} readOnly /> */}

                </CardContent>

            </Card>




        </>
    );
};

export default Product;