import { createContext } from "react";
import { DemarketContextType } from "@/types/contexts/DemarketContextType";

const DemarketContext = createContext<DemarketContextType>(null!);

export default DemarketContext;
