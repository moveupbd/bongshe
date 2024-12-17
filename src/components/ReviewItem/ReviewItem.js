import React from 'react';

const ReviewItem = (props) => {
    const { name, price, quantity, key } = props.product;
    const { handleRemove } = props;
    return (
        <div className="row">

            <div className="col-md-8">
                <h5>Item: {name}</h5>
                <h6>Price Per Item: {price}</h6>
                <h6>Total Item: {quantity}</h6>
                <button onClick={() => handleRemove(key)} className="btn btn-danger">Remove Item</button>

            </div>
        </div>
    );
};

export default ReviewItem;