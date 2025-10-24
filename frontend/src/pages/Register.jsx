import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5000/api/users/register", {
                name, email, password,
            });
            console.log(data);
            setMessage("Registration successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setMessage(err.response?.data?.message || "Error occurred");
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
            <Typography variant="h4" mb={3}>Register</Typography>
            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" width="300px" gap={2}>
                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Button type="submit" variant="contained">Register</Button>
            </Box>
            {message && <Typography mt={2}>{message}</Typography>}
        </Box>
    );
};

export default Register;
