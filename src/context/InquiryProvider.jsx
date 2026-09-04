import { useCallback, useMemo, useState } from "react";

import { InquiryContext } from "./inquiryContext";

const InquiryProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openInquiry = useCallback(() => setIsOpen(true), []);
  const closeInquiry = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, openInquiry, closeInquiry }), [isOpen, openInquiry, closeInquiry]);

  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>;
};

export default InquiryProvider;
