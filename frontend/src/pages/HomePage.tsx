import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import { useState } from "react";
import { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <h1>Error fetching products</h1>;
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Grid key="products" container spacing={2}>
        {products.map((product: Product) => (
          <Grid key={product._id} size={{ xs: 6, md: 4 }}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
