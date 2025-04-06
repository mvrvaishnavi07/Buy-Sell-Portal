// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Alert,
//   Container,
//   Grid,
// } from "@mui/material";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     age: "",
//     contactNumber: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/register",
//         formData
//       );
//       if (res.status === 201) {
//         navigate("/login");
//       }
//     } catch (err) {
//       setError(err.response.data.message || "Registration Failed");
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 8 }}>
//       <Box
//         sx={{
//           boxShadow: 3,
//           p: 4,
//           borderRadius: 2,
//           backgroundColor: "background.paper",
//         }}
//       >
//         <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
//           Register
//         </Typography>
//         {error && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {error}
//           </Alert>
//         )}
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="First Name"
//                 name="firstName"
//                 fullWidth
//                 variant="outlined"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Last Name"
//                 name="lastName"
//                 fullWidth
//                 variant="outlined"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="IIIT Email"
//                 name="email"
//                 type="email"
//                 fullWidth
//                 variant="outlined"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Age"
//                 name="age"
//                 type="number"
//                 fullWidth
//                 variant="outlined"
//                 value={formData.age}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Contact Number"
//                 name="contactNumber"
//                 fullWidth
//                 variant="outlined"
//                 value={formData.contactNumber}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Password"
//                 name="password"
//                 type="password"
//                 fullWidth
//                 variant="outlined"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 3 }}
//           >
//             Register
//           </Button>
//         </form>
//         <Typography
//           variant="body2"
//           color="textSecondary"
//           align="center"
//           sx={{ mt: 2 }}
//         >
//           Already have an account?{" "}
//           <Button
//             size="small"
//             onClick={() => navigate("/login")}
//             sx={{ textTransform: "none", p: 0 }}
//           >
//             Login here
//           </Button>
//         </Typography>
//       </Box>
//     </Container>
//   );
// };

// export default Register;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Grid,
} from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    contactNumber: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValidIIITEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]*iiit\.ac\.in$/;
    return regex.test(email);
  };

  const isValidPhoneNumber = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Email Validation
    if (!isValidIIITEmail(formData.email)) {
      setError("Only IIIT email addresses are allowed!");
      return;
    }

    // Phone Number Validation
    if (!isValidPhoneNumber(formData.contactNumber)) {
      setError("Phone number must be exactly 10 digits!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      if (res.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response.data.message || "Registration Failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          boxShadow: 3,
          p: 4,
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
          Register
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                fullWidth
                variant="outlined"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                fullWidth
                variant="outlined"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="IIIT Email"
                name="email"
                type="email"
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                required
                error={formData.email && !isValidIIITEmail(formData.email)}
                helperText={
                  formData.email && !isValidIIITEmail(formData.email)
                    ? "Must be an IIIT email (e.g., xyz@iiit.ac.in)"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Age"
                name="age"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contact Number"
                name="contactNumber"
                fullWidth
                variant="outlined"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                error={
                  formData.contactNumber &&
                  !isValidPhoneNumber(formData.contactNumber)
                }
                helperText={
                  formData.contactNumber &&
                  !isValidPhoneNumber(formData.contactNumber)
                    ? "Phone number must be exactly 10 digits!"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Register
          </Button>
        </form>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mt: 2 }}
        >
          Already have an account?{" "}
          <Button
            size="small"
            onClick={() => navigate("/login")}
            sx={{ textTransform: "none", p: 0 }}
          >
            Login here
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;

