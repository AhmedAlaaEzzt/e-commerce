import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product } from "../types/Product";
import { useCart } from "../context/Cart/CartContext";
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product: { _id, name, price, image },
}: ProductCardProps) {
  const { addItemToCart } = useCart();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 200 }} image={image} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={() => addItemToCart(_id)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
