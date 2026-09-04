import { createContext, useContext } from "react";

export const InquiryContext = createContext(null);

export const useInquiry = () => {
  const context = useContext(InquiryContext);
  if (!context) throw new Error("useInquiry must be used inside an InquiryProvider");
  return context;
};
