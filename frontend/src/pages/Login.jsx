import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5000/api/users/login", {
                email,
                password,
            });

            setMessage("Login successful!");
            localStorage.setItem("userInfo", JSON.stringify(data));

            // ✅ Redirect to dashboard after login
            setTimeout(() => navigate("/dashboard"), 1000);
        } catch (err) {
            setMessage(err.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <Typography variant="h4" mb={3}>
                Login
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                display="flex"
                flexDirection="column"
                width="300px"
                gap={2}
            >
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained">
                    Login
                </Button>
            </Box>
            {message && (
                <Typography
                    mt={2}
                    color={message === "Login successful!" ? "green" : "red"}
                >
                    {message}
                </Typography>
            )}
        </Box>
    );
};

export default Login;
