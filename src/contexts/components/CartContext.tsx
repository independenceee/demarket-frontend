import { createContext } from "react";
import { CartContextType } from "@/types/contexts/CartContextType";

const CartContext = createContext<CartContextType>(null!);

export default CartContext;
