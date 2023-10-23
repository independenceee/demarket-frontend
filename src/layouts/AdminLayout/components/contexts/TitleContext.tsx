// TitleContext.js
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type TitleContextType = {
    title: string;
    setTitle: (title: string) => void;
};

const TitleContext = createContext<TitleContextType | undefined>(undefined);

export const useTitle = () => {
    const context = useContext(TitleContext);
    if (!context) {
        throw new Error("useTitle must be used within a TitleProvider");
    }
    return context;
};

type TitleProviderProps = {
    children: ReactNode;
};

export const TitleProvider = ({ children }: TitleProviderProps) => {
    const [title, setTitle] = useState("Default Title");

    return (
        <TitleContext.Provider value={{ title, setTitle }}>
            {children}
        </TitleContext.Provider>
    );
};
