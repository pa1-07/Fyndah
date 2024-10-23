import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  CardHeader,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [editingBlogId, setEditingBlogId] = useState(null); // For editing mode
  const [viewMoreId, setViewMoreId] = useState(null); // For tracking which blog post is expanded
  const [token] = useState(localStorage.getItem("token") || ""); // Use token from localStorage
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate("/login"); // Redirect to the login page or blog page
  };

  useEffect(() => {
    if (!token) {
      navigate("/login"); // If not logged in, redirect to login page
      return;
    }

    const fetchBlogs = async () => {
      try {
        const response = await axios.get("https://fyndah-backend.onrender.com/api/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [token, navigate]);

  const addOrUpdateBlogPost = async (e) => {
    e.preventDefault();
    const newBlog = { title, content, author };

    try {
      if (editingBlogId) {
        // Edit existing blog post
        await axios.put(
          `https://fyndah-backend.onrender.com/api/blogs/${editingBlogId}`,
          newBlog,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBlogs(
          blogs.map((blog) =>
            blog._id === editingBlogId
              ? { ...blog, title, content, author }
              : blog
          )
        );
        setEditingBlogId(null); // Reset after editing
      } else {
        // Add new blog post
        const response = await axios.post(
          "https://fyndah-backend.onrender.com/api/blogs",
          newBlog,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBlogs([...blogs, response.data]);
      }

      setTitle("");
      setContent("");
      setAuthor("");
    } catch (error) {
      console.error("Error adding or editing blog post:", error);
    }
  };

  const deleteBlogPost = async (id) => {
    try {
      console.log("Deleting blog post with ID:", id); // Log the ID for debugging
      await axios.delete(`https://fyndah-backend.onrender.com/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error(
        "Error deleting blog post:",
        error.response?.data || error.message
      ); // Log error details
    }
  };

  const editBlogPost = (blog) => {
    setEditingBlogId(blog._id); // Set editing blog ID
    setTitle(blog.title);
    setContent(blog.content);
    setAuthor(blog.author);
  };

  const handleViewMore = (id) => {
    if (viewMoreId === id) {
      setViewMoreId(null); // Collapse if the same blog is clicked again
    } else {
      setViewMoreId(id); // Set to expanded state
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container maxWidth="md" sx={{ mt: 6, flexGrow: 1, mb: 10 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Admin Panel
        </Typography>

        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{
            mb: 2,
            ml: 90,
            backgroundColor: "#E53935",
            color: "#FFFFFF",
            "&:hover": { backgroundColor: "#C62828" },
          }}
        >
          Logout
        </Button>

        {/* Form for adding/editing blog posts */}
        <Box
          component="form"
          onSubmit={addOrUpdateBlogPost}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            {editingBlogId ? "Edit Blog Post" : "Create a New Blog Post"}
          </Typography>

          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Content"
            variant="outlined"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Author"
            variant="outlined"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ py: 1.5, fontSize: "1.1rem", mt: 2, borderRadius: 2 }}
          >
            {editingBlogId ? "Update Blog Post" : "Add Blog Post"}
          </Button>
        </Box>

        {/* Display Existing Blog Posts */}
        <Box mt={6}>
          <Typography variant="h6" align="center" gutterBottom>
            Existing Blog Posts
          </Typography>

          <Box
            sx={{
              maxHeight: "300px",
              overflowY: "auto",
              borderRadius: 2,
              boxShadow: 1,
              p: 2,
              backgroundColor: "#fff",
            }}
          >
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <Card key={blog._id} sx={{ mb: 2, boxShadow: 3 }}>
                  <CardHeader
                    title={blog.title}
                    subheader={`By ${blog.author}`}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {viewMoreId === blog._id
                        ? blog.content
                        : `${blog.content.substring(0, 100)}...`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleViewMore(blog._id)}
                    >
                      {viewMoreId === blog._id ? "View Less" : "View More"}
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => editBlogPost(blog)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => deleteBlogPost(blog._id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              ))
            ) : (
              <Typography variant="body2" align="center">
                No blog posts available
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminPanel;
