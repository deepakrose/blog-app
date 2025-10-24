import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        try {
            await axios.post(
                "http://localhost:5000/api/posts",
                { title, content },
                { headers: { Authorization: `Bearer ${userInfo.token}` } }
            );
            setMessage("Post created successfully!");
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            setMessage(err.response?.data?.message || "Error creating post");
        }
    };

    return (
        <Box p={3}>
            <Typography variant="h4" mb={3}>Create New Post</Typography>
            <Box component="form" display="flex" flexDirection="column" gap={2} onSubmit={handleSubmit} width="400px">
                <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <TextField label="Content" multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} required />
                <Button type="submit" variant="contained">Create Post</Button>
            </Box>
            {message && <Typography mt={2}>{message}</Typography>}
        </Box>
    );
};

export default CreatePost;
