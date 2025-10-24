import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, CardActions, Button } from "@mui/material";

const MyPosts = () => {
    const [posts, setPosts] = useState([]);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const fetchMyPosts = async () => {
        const { data } = await axios.get("http://localhost:5000/api/posts/my", {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setPosts(data);
    };

    useEffect(() => {
        fetchMyPosts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            await axios.delete(`http://localhost:5000/api/posts/${id}`, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            fetchMyPosts();
        }
    };

    return (
        <Box p={3}>
            <Typography variant="h4" mb={3}>My Posts</Typography>
            {posts.length === 0 ? (
                <Typography>No posts yet.</Typography>
            ) : (
                posts.map((post) => (
                    <Card key={post._id} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{post.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{post.content}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => {
                                const newTitle = prompt("Edit Title", post.title);
                                const newContent = prompt("Edit Content", post.content);
                                if (newTitle && newContent) {
                                    axios.put(`http://localhost:5000/api/posts/${post._id}`,
                                        { title: newTitle, content: newContent },
                                        { headers: { Authorization: `Bearer ${userInfo.token}` } }
                                    ).then(fetchMyPosts);
                                }
                            }}>Edit</Button>
                            <Button size="small" color="error" onClick={() => handleDelete(post._id)}>Delete</Button>
                        </CardActions>
                    </Card>
                ))
            )}
        </Box>
    );
};

export default MyPosts;
