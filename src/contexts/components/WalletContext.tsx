import { createContext } from "react";
import { WalletContextType } from "@/types/WalletContextType";

const WalletContext = createContext<WalletContextType>(null!);

export default WalletContext;
