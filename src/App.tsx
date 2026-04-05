/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Contests from "./pages/Contests";
import ContestDetail from "./pages/ContestDetail";
import ProblemDetail from "./pages/ProblemDetail";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contests" element={<Contests />} />
          <Route path="contests/:slug" element={<ContestDetail />} />
          <Route path="problems/:slug" element={<ProblemDetail />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

