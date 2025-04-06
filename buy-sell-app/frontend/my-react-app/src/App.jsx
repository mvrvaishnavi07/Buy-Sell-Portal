// import React, { useEffect, useState } from "react";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import LandingPage from "./pages/LandingPage";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Profile from "./pages/Profile";
// import RequireAuth from "./components/RequireAuth";
// import Navbar from "./components/Navbar";
// import SearchItemsPage from "./pages/SearchItemsPage";
// import Dashboard from "./pages/Dashboard";
// import AddItemToSell from "./pages/AddItemToSell";
// import ViewItemPage from './pages/ViewItemPage';
// import MyCart from "./pages/MyCart";
// import OrdersHistory from "./pages/OrdersHistory";
// import DeliverItems from "./pages/DeliverItems";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#007bff",
//     },
//     secondary: {
//       main: "#ffdf40",
//     },
//   },
//   typography: {
//     fontFamily: "Roboto, sans-serif",
//   },
// });

// const AuthenticatedLayout = ({ children }) => (
//   <>
//     <Navbar />
//     <div style={{ marginTop: "80px", padding: "20px" }}>{children}</div>
//   </>
// );

// const App = () => {
//   // const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   const token = localStorage.getItem("token");
//   //   if (token) {
//   //     // Validate the token (optional: send a request to the backend to verify the token)
//   //     setIsAuthenticated(true);
//   //     navigate("/dashboard"); // Redirect to dashboard if token exists
//   //   } else {
//   //     setIsAuthenticated(false);
//   //   }
//   // }, [navigate]);

// //   useEffect(() => {
// //   const token = localStorage.getItem("token");
// //   if (token) {
// //     setIsAuthenticated(true);
// //     // Redirect only if the user is on login or landing page
// //     if (window.location.pathname === "/" || window.location.pathname === "/login") {
// //       navigate("/dashboard");
// //     }
// //   } else {
// //     setIsAuthenticated(false);
// //   }
// // }, [navigate]);
 
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       {/* <Router> */}
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />


//           <Route
//             path="/dashboard"
//             element={
//               <RequireAuth>
//                 <AuthenticatedLayout>
//                   <Dashboard />
//                 </AuthenticatedLayout>
//               </RequireAuth>
//             }
//           />
//           <Route
//             path="/profile"
//             element={
//               <RequireAuth>
//                 <AuthenticatedLayout>
//                   <Profile />
//                 </AuthenticatedLayout>
//               </RequireAuth>
//             }
//           />
//           <Route
//             path="/search"
//             element={
//               <RequireAuth>
//                 <AuthenticatedLayout>
//                   <SearchItemsPage />
//                 </AuthenticatedLayout>
//               </RequireAuth>
//             }
//           />

//           <Route
//             path="/add-item"
//             element={
//               <RequireAuth>
//                 <AuthenticatedLayout>
//                   <AddItemToSell />
//                 </AuthenticatedLayout>
//               </RequireAuth>
//             }
//           />

//           <Route
//             path="/items/:id"
//             element={
//               <RequireAuth>
//                 <AuthenticatedLayout>
//                   <ViewItemPage />
//                 </AuthenticatedLayout>
//               </RequireAuth>
//             }
//           />

//           <Route
//             path="/cart"
//             element={
//               <RequireAuth>
//                 <AuthenticatedLayout>
//                   <MyCart />
//                 </AuthenticatedLayout>
//               </RequireAuth>
//             }
//           />

//           <Route
//             path="/orders-history"
//             element={
//               <RequireAuth>
//                 <AuthenticatedLayout>
//                   <OrdersHistory />
//                 </AuthenticatedLayout>
//               </RequireAuth>
//             }
//           />

//           <Route
//             path="/deliver-items"
//             element={
//               <RequireAuth>
//                 <AuthenticatedLayout>
//                   <DeliverItems />
//                 </AuthenticatedLayout>
//               </RequireAuth>
//             }
//           />

//         </Routes>
//       {/* </Router> */}
//     </ThemeProvider>
//   );
// };

// export default App;


import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RequireAuth from "./components/RequireAuth";
import Navbar from "./components/Navbar";
import SearchItemsPage from "./pages/SearchItemsPage";
import Dashboard from "./pages/Dashboard";
import AddItemToSell from "./pages/AddItemToSell";
import ViewItemPage from './pages/ViewItemPage';
import MyCart from "./pages/MyCart";
import OrdersHistory from "./pages/OrdersHistory";
import DeliverItems from "./pages/DeliverItems";
import Chatbot from "./pages/Chatbot";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff",
    },
    secondary: {
      main: "#ffdf40",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const AuthenticatedLayout = ({ children }) => (
  <>
    <Navbar />
    <div style={{ marginTop: "80px", padding: "20px" }}>{children}</div>
  </>
);

const App = () => {
  // const navigate = useNavigate();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     // Validate the token (optional: send a request to the backend to verify the token)
  //     setIsAuthenticated(true);
  //     navigate("/dashboard"); // Redirect to dashboard if token exists
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, [navigate]);
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />


          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <AuthenticatedLayout>
                  <Dashboard />
                </AuthenticatedLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <AuthenticatedLayout>
                  <Profile />
                </AuthenticatedLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/search"
            element={
              <RequireAuth>
                <AuthenticatedLayout>
                  <SearchItemsPage />
                </AuthenticatedLayout>
              </RequireAuth>
            }
          />

          <Route
            path="/add-item"
            element={
              <RequireAuth>
                <AuthenticatedLayout>
                  <AddItemToSell />
                </AuthenticatedLayout>
              </RequireAuth>
            }
          />

          <Route
            path="/items/:id"
            element={
              <RequireAuth>
                <AuthenticatedLayout>
                  <ViewItemPage />
                </AuthenticatedLayout>
              </RequireAuth>
            }
          />

          <Route
            path="/cart"
            element={
              <RequireAuth>
                <AuthenticatedLayout>
                  <MyCart />
                </AuthenticatedLayout>
              </RequireAuth>
            }
          />

          <Route
            path="/orders-history"
            element={
              <RequireAuth>
                <AuthenticatedLayout>
                  <OrdersHistory />
                </AuthenticatedLayout>
              </RequireAuth>
            }
          />

          <Route
            path="/deliver-items"
            element={
              <RequireAuth>
                <AuthenticatedLayout>
                  <DeliverItems />
                </AuthenticatedLayout>
              </RequireAuth>
            }
          />

          <Route
            path="/chatsupport"
            element={
              <RequireAuth>
                <AuthenticatedLayout>
                  <Chatbot/>
                </AuthenticatedLayout>
              </RequireAuth>
            }
          />

        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;