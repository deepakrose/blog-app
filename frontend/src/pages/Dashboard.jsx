import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const Dashboard = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [myPosts, setMyPosts] = useState([]);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const fetchData = async () => {
        // All posts
        const allData = await axios.get("http://localhost:5000/api/posts");
        setAllPosts(allData.data);

        // My posts
        const myData = await axios.get("http://localhost:5000/api/posts/my", {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setMyPosts(myData.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box p={3}>
            <Typography variant="h4" mb={3}>Dashboard</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="h6">Total Posts</Typography>
                        <Typography variant="h3">{allPosts.length}</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="h6">My Posts</Typography>
                        <Typography variant="h3">{myPosts.length}</Typography>
                    </Card>
                </Grid>
            </Grid>

            <Box mt={5}>
                <Typography variant="h5" mb={2}>Latest Posts</Typography>
                <Grid container spacing={2}>
                    {allPosts.slice(-4).reverse().map(post => (
                        <Grid item xs={12} md={6} key={post._id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{post.title}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        {post.content.length > 100 ? post.content.slice(0, 100) + "..." : post.content}
                                    </Typography>
                                    <Typography variant="caption">By: {post.user.name}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default Dashboard;
