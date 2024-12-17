import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';


const Products = () => {
    const { productId } = useParams();
    const [products, setProducts] = useState([])
    const [singleProduct, setSingleProduct] = useState([])

    useEffect(() => {
        fetch('/products.JSON')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const singleProduct = products.find(product => product.key === productId)
        setSingleProduct(singleProduct)
        console.log(singleProduct)
    }, [products])


    // const { name, price, description, img } = service; 
    return (
        <Container>
            <Header></Header>
            <div className="container card p-3">

                <h1 className="text-center text-danger text-uppercase fw-light">  {singleProduct?.name}</h1>
                <img className="card-img-top" style={{ borderRadius: "15px" }} src={singleProduct?.img} alt="" />
                <p className="fw-light">{singleProduct?.description}</p>
                <h5 className="card-text text-danger fw-lighter" >Regular Price: BDT {singleProduct?.regularPrice} Only</h5>
                <h5 className="card-text text-danger fw-lighter" >Discount Price: BDT {singleProduct?.price} Only</h5>

                {
                    singleProduct?.features?.map(feature =>
                        < li >
                            {/* key={feature.description} */}
                            {feature.description} = {feature.value}</li>
                    )
                }

            </div >


        </Container>
    );
};

export default Products;