import { createContext } from "react";
import { CartContextType } from "@/types";

const CartContext = createContext<CartContextType>(null!);

export default CartContext;
