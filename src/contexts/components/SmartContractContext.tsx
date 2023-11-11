import { createContext } from "react";
import { WalletContextType } from "@/types";

const SmartContractContext = createContext<WalletContextType>(null!);

export default SmartContractContext;
