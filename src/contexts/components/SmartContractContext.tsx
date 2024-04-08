import { createContext } from "react";
import { SmartContractType } from "@/types/contexts/SmartContextType";

const SmartContractContext = createContext<SmartContractType>(null!);

export default SmartContractContext;
