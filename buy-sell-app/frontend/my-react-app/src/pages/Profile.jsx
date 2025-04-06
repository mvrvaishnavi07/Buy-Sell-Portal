

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Stack,
} from "@mui/material";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setUpdatedProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <Typography>Unauthorized Access or Loading...</Typography>;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/auth/profile", updatedProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(updatedProfile);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "120px" }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Welcome, {profile.firstName}
          </Typography>
          {editMode ? (
            <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
              <Stack spacing={2}>
                <TextField
                  label="First Name"
                  value={updatedProfile.firstName || ""}
                  onChange={(e) =>
                    setUpdatedProfile({
                      ...updatedProfile,
                      firstName: e.target.value,
                    })
                  }
                  fullWidth
                />
                {/* <TextField
                  label="Email"
                  type="email"
                  value={updatedProfile.email || ""}
                  onChange={(e) =>
                    setUpdatedProfile({
                      ...updatedProfile,
                      email: e.target.value,
                    })
                  }
                  fullWidth
                /> */}
                <TextField
                  label="Age"
                  type="number"
                  value={updatedProfile.age || ""}
                  onChange={(e) =>
                    setUpdatedProfile({
                      ...updatedProfile,
                      age: e.target.value,
                    })
                  }
                  fullWidth
                />
                <TextField
                  label="Contact Number"
                  value={updatedProfile.contactNumber || ""}
                  onChange={(e) =>
                    setUpdatedProfile({
                      ...updatedProfile,
                      contactNumber: e.target.value,
                    })
                  }
                  fullWidth
                />
              </Stack>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
                  Save Changes
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </Stack>
            </Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">Email: {profile.email}</Typography>
              <Typography variant="body1">Age: {profile.age}</Typography>
              <Typography variant="body1">Contact: {profile.contactNumber}</Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </Button>
                <Button variant="outlined" color="error" onClick={handleLogout}>
                  Logout
                </Button>
              </Stack>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;

