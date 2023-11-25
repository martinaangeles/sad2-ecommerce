import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Center from "../components/Center";
import Button from "../components/Button";
import ButtonLink from "../components/ButtonLink";
import { Link } from "react-router-dom";

const Title = styled.h1`
  font-size: 1.5em;
  color: #fff;
`;

const StyledContainer = styled.div`
  background-color: #000;
  margin-top: 100px;
  margin-bottom: 300px;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
`;

const ProductCardContainer = styled.div`
background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

const ProductCard = styled(Link)`
  text-decoration: none;
  position: relative;
  overflow: hidden;

  img {
    max-width: 100%;
    transition: filter 0.3s ease-in-out;
    border-radius: 8px;
  }

  &:hover img {
    filter: blur(5px); // Adjust the blur value as needed
  }

  .overlay {
    position: absolute;
    top: 40%;
    bottom: 50%;
    left: 50%;
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transform: translate(-50%, -50%);
    color: black;
    font-weight: bold;
    font-size: medium;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover .overlay {
    opacity: 1;
  }
`;

const ProductDetails = styled.div`
  text-align: center;
`;

const ProductName = styled.h3`
  color: white;
  font-family: "Kish", sans-serif;
  font-weight: 500;
`;

const ProductPrice = styled.p`
  color: white;
  margin-top: 0;
  font-weight: 300;
`;

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8082/shop");
        setAllProducts(response.data.allProducts);
      } catch (error) {
        console.error("Error fetching new products:", error);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <StyledContainer>
      <Center>
        <div>
          
          {allProducts?.length > 0 ? ( // Use optional chaining operator to check if allProducts is defined
            <ProductsGrid>
              {allProducts.map((product) => (
                <ProductCardContainer key={product.product_id}>
                  <ProductCard to={`/product/${product.product_id}`}>
                    <img
                      src={product.product_image}
                      alt={product.product_name}
                    />
                    <div className="overlay">
                      <p>READ MORE</p>
                    </div>
                    <ProductName>{product.product_name}</ProductName>
                  </ProductCard>
                  <ProductDetails>
                    <ProductPrice>
                      Price: P{product.product_unitPrice}
                    </ProductPrice>
                  </ProductDetails>
                </ProductCardContainer>
              ))}
            </ProductsGrid>
          ) : (
            <div>Loading products...</div>
          )}
        </div>
      </Center>
    </StyledContainer>
  );
}
