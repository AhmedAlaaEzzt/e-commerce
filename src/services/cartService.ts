import { cartModel, ICart, ICartItem } from "../models/cartModel";
import productModel from "../models/productModel";

interface CreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({
    userId,
    totalAmount: 0,
  });

  await cart.save();

  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}

export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  const cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    return createCartForUser({ userId });
  }

  return cart;
};

interface AddProductToCart {
  userId: string;
  productId: any;
  quantity: number;
}

export const addProductToCart = async ({
  userId,
  productId,
  quantity,
}: AddProductToCart) => {
  const cart = await getActiveCartForUser({ userId });

  // Does the item exist in the cart?
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (existsInCart) {
    return { data: "Item already in cart", statusCode: 400 };
  }

  // Fetch the product
  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "Low stock for item", statusCode: 400 };
  }

  // Add the item to the cart
  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity,
  });

  // Update the total amount of the  cart
  cart.totalAmount += product.price * quantity;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};

interface UpdateProductInCart {
  userId: string;
  productId: any;
  quantity: number;
}

export const updateProductInCart = async ({
  userId,
  productId,
  quantity,
}: UpdateProductInCart) => {
  const cart = await getActiveCartForUser({ userId });

  // Does the item exist in the cart?
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!existsInCart) {
    return { data: "Item not found in cart", statusCode: 400 };
  }

  // Fetch the product
  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "Low stock for item", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  let total = calculateCartTotalItems({ cartItems: otherCartItems });

  existsInCart.quantity = quantity;

  total += existsInCart.quantity * existsInCart.unitPrice;

  cart.totalAmount = total;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};

interface DeleteProductInCart {
  productId: any;
  userId: string;
}

export const deleteProductInCart = async ({
  userId,
  productId,
}: DeleteProductInCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  const total = calculateCartTotalItems({ cartItems: otherCartItems });

  cart.items = otherCartItems;
  cart.totalAmount = total;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};

const calculateCartTotalItems = ({ cartItems }: { cartItems: ICartItem[] }) => {
  let total = cartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);

  return total;
};
