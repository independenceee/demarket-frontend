import { createContext } from "react";
import { GlobalStateContextType } from "@/types/GlobalStateContextType";

const DemarketContext = createContext<GlobalStateContextType>(null!);

export default DemarketContext;
