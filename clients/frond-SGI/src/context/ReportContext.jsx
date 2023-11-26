import { createContext } from "react";

export const ReportContext = createContext({});

export const ReportContextProvider = ({ children }) => {
    return <ReportContext.Provider>{children}</ReportContext.Provider>;
}