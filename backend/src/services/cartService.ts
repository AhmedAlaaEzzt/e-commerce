import { cartModel, ICart, ICartItem } from "../models/cartModel";
import { IOrderItem, OrderModel } from "../models/orderModel";
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
  populateProducts?: boolean;
}

export const getActiveCartForUser = async ({
  userId,
  populateProducts = false,
}: GetActiveCartForUser) => {
  let cart;
  if (populateProducts) {
    cart = await cartModel
      .findOne({ userId, status: "active" })
      .populate("items.product");
  } else {
    cart = await cartModel.findOne({ userId, status: "active" });
  }

  if (!cart) {
    return createCartForUser({ userId });
  }

  return cart;
};

interface ClearCart {
  userId: string;
}

export const clearCart = async ({ userId }: ClearCart) => {
  const cart = await getActiveCartForUser({ userId });
  cart.items = [];
  cart.totalAmount = 0;
  await cart.save();

  return {
    data: await getActiveCartForUser({ userId, populateProducts: true }),
    statusCode: 200,
  };
};

interface addItemToCart {
  userId: string;
  productId: any;
  quantity: number;
}

export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: addItemToCart) => {
  try {
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

    await cart.save();

    return {
      data: await getActiveCartForUser({ userId, populateProducts: true }),
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
  }
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

  await cart.save();

  return {
    data: await getActiveCartForUser({ userId, populateProducts: true }),
    statusCode: 200,
  };
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

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  const total = calculateCartTotalItems({ cartItems: otherCartItems });

  cart.items = otherCartItems;
  cart.totalAmount = total;

  await cart.save();

  const updatedCart = await getActiveCartForUser({
    userId,
    populateProducts: true,
  });

  return { data: updatedCart, statusCode: 200 };
};

const calculateCartTotalItems = ({ cartItems }: { cartItems: ICartItem[] }) => {
  let total = cartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);

  return total;
};

interface Checkout {
  userId: string;
  address: string;
}

export const checkout = async ({ userId, address }: Checkout) => {
  if (!address) {
    return { data: "Address is required", statusCode: 400 };
  }

  const cart = await getActiveCartForUser({ userId });

  const orderItems: IOrderItem[] = [];
  // Loop cartItems and create orderITems
  for (const item of cart.items) {
    const product = await productModel.findById(item.product);
    if (!product) {
      return { data: "Product not found", statusCode: 400 };
    }

    const orderItem: IOrderItem = {
      productTitle: product?.title,
      productImage: product?.image,
      unitPrice: product?.price,
      quantity: item.quantity,
    };

    orderItems.push(orderItem);
  }

  const order = await OrderModel.create({
    orderItems,
    total: cart.totalAmount,
    address,
    userId,
  });

  await order.save();

  // Update the cart states to be completed
  cart.status = "completed";
  await cart.save();

  return { data: order, statusCode: 201 };
};
