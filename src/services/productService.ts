import productModel, { IProduct } from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  const initialProducts = [
    {
      title: "Product 1",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      price: 100,
      stock: 10,
    },
    {
      title: "Product 2",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      price: 199,
      stock: 15,
    },
    {
      title: "Product 3",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      price: 299,
      stock: 8,
    },
    {
      title: "Product 4",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      price: 399,
      stock: 12,
    },
    {
      title: "Product 5",
      image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
      price: 499,
      stock: 20,
    },
    {
      title: "Product 6",
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      price: 599,
      stock: 5,
    },
    {
      title: "Product 7",
      image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
      price: 699,
      stock: 18,
    },
    {
      title: "Product 8",
      image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
      price: 799,
      stock: 25,
    },
    {
      title: "Product 9",
      image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
      price: 899,
      stock: 7,
    },
    {
      title: "Product 10",
      image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
      price: 999,
      stock: 16,
    },
  ];

  const products = await getAllProducts();

  if (products.length > 0) return;

  await productModel.insertMany(initialProducts);
};
