import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent } from "@mui/material";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await axios.get("http://localhost:5000/api/posts");
            setPosts(data);
        };
        fetchPosts();
    }, []);

    return (
        <Box p={3}>
            <Typography variant="h4" mb={3}>All Blog Posts</Typography>
            {posts.map((post) => (
                <Card key={post._id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{post.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{post.content}</Typography>
                        <Typography mt={1} variant="caption">By: {post.user.name}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default Home;
