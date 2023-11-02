import { createContext } from "react";
import { DemarketContextType } from "@/types";

const DemarketContext = createContext<DemarketContextType>(null!);

export default DemarketContext;
