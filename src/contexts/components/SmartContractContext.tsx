import { createContext } from "react";
import { SmartContractType } from "@/types";

const SmartContractContext = createContext<SmartContractType>(null!);

export default SmartContractContext;
