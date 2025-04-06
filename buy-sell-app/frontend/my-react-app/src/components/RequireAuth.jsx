import { Navigate } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token'); // Always check token in localStorage


  // If no token or token is expired, redirect to landing page
  // if (!token || isTokenExpired(token)) {
  //   return <Navigate to="/" />;
  // }
  if (!token) {
    return <Navigate to="/" />;
  }

  return children; // If token exists, render the protected page (children)
};

// function isTokenExpired(token) {
//   const decoded = jwtDecode(token); // You need to install 'jwt-decode' library
//   const currentTime = Date.now() / 1000; // Get current time in seconds
//   return decoded.exp < currentTime; // Check if the token has expired
// }

export default RequireAuth;
