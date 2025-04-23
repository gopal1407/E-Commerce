import React from 'react';
import { Card, Button, Spinner, Row, Col, Form } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCategories } from '../hooks/useCategories';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';

const fetchProducts = async (category) => {
  const url = category
    ? `https://fakestoreapi.com/products/category/${category}`
    : `https://fakestoreapi.com/products`;
  const { data } = await axios.get(url);
  return data;
};

const ProductList = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = React.useState('');

  const { data: categories } = useCategories();
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProducts(category),
  });

  if (isLoading) return <Spinner animation="border" />;
  if (error) return <div>Error fetching products.</div>;

  return (
    <>
      <Form.Select className="mb-4" onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">All Categories</option>
        {categories?.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </Form.Select>

      <Row xs={1} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'contain' }} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description.slice(0, 60)}...</Card.Text>
                <Card.Text>
                  <strong>${product.price}</strong>
                </Card.Text>
                <Button
  variant="primary"
  onClick={() => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  }}
>
  Add to Cart
</Button>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProductList;
