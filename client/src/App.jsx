import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MailtmChecker from "./MailtmChecker";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfUse from "./TermOfUse";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Đường dẫn mặc định */}
        <Route path="/" element={<MailtmChecker />} />

        {/* Đường dẫn Chính sách bảo mật */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Đường dẫn Điều khoản sử dụng */}
        <Route path="/terms-of-use" element={<TermsOfUse />} />

        {/* Chuyển hướng các đường dẫn không tồn tại về trang chủ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
