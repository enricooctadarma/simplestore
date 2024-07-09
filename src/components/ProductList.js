import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/actions/productActions';
import { addToCart } from '../store/actions/cartActions';
import { Card, Button, Row, Col, Spinner, Container, Alert } from 'react-bootstrap';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <Container className="product-list mt-4">
      {productState.loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : productState.error ? (
        <Alert variant="danger">{productState.error}</Alert>
      ) : (
        <Row>
          {productState.products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="h-100 product-card shadow-sm border-0">
                <Card.Img 
                  variant="top" 
                  src={product.image} 
                  alt={product.title} 
                  className="product-image"
                />
                <Card.Body>
                  <Card.Title className="text-truncate" title={product.title}>{product.title}</Card.Title>
                  <Card.Text className="product-description">
                    {product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}
                  </Card.Text>
                  <Card.Text className="text-black h5">Rp.{product.price}</Card.Text>
                  <Button variant="danger" className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Masukkan Keranjang</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ProductList;
