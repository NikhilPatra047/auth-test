import React from "react";

import SignUp from "./SignUp";
import Login from "./Login";
import DashBoard from "./DashBoard";
import PrivateRoute from "./privateRoute";
import ForgotPassword from "./ForgotPassword";

import { Container } from "react-bootstrap";


import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";

function App() {
  return (
    <AuthProvider>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <AuthProvider>
            <Router>

              <Routes>
                <Route path='/signup' element={<SignUp />} />
                <Route exact path='/' element={<PrivateRoute />}>
                  <Route exact path='/' element={<DashBoard />} />
                </Route>
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/forgot-password' element={<ForgotPassword />} />
                <Route exact path='/update-profile' element={<UpdateProfile />} />
              </Routes>

            </Router>
          </AuthProvider>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
