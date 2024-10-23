// ./src/pages/Blog.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Grid, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editBlog, setEditBlog] = useState(null); // To hold the blog being edited
  const [openEditDialog, setOpenEditDialog] = useState(false); // Control for edit dialog

  useEffect(() => {
    // Check if the user is logged in as admin by checking the token
    const token = localStorage.getItem('token');
    setIsAdmin(!!token);

    // Fetch blog posts from the backend
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://fyndah-backend.onrender.com/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  // Toggle expanded state
  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);  // Toggle between expanded and collapsed
  };

  // Delete blog post
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fyndah-backend.onrender.com/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      // Remove the deleted blog from state
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  // Open edit dialog
  const handleEditClick = (blog) => {
    setEditBlog(blog);
    setOpenEditDialog(true);
  };

  // Handle edit form submission
  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(`https://fyndah-backend.onrender.com/api/blogs/${editBlog._id}`, editBlog, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      // Update the blog in the state
      setBlogs(blogs.map(blog => (blog._id === editBlog._id ? response.data : blog)));
      setOpenEditDialog(false);
    } catch (error) {
      console.error('Error editing blog:', error);
    }
  };

  // Handle form input changes for editing
  const handleEditChange = (e) => {
    setEditBlog({ ...editBlog, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 12 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
        Blog Posts
      </Typography>

      <Grid container spacing={3} sx={{ mt: 6, mb:6 }}>
        {blogs.length > 0 ? (
          blogs.map(blog => (
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}
                  </Typography>

                  <Typography variant="body1">
                    {expandedId === blog._id ? blog.content : `${blog.content.substring(0, 100)}...`}
                  </Typography>

                  <Button onClick={() => handleExpandClick(blog._id)} sx={{ mt: 1 }}>
                    {expandedId === blog._id ? 'View Less' : 'View More'}
                  </Button>

                  {/* Only show "Edit" and "Delete" for Admin users */}
                  {isAdmin && (
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ mt: 1, ml: 1 }}
                        onClick={() => handleEditClick(blog)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ mt: 1, ml: 1 }}
                        onClick={() => handleDelete(blog._id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" align="center" sx={{ width: '100%' }}>
            No blog posts available
          </Typography>
        )}
      </Grid>

      {/* Edit Dialog */}
      {editBlog && (
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Blog Post</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Title"
              name="title"
              value={editBlog.title}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Author"
              name="author"
              value={editBlog.author}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Content"
              name="content"
              value={editBlog.content}
              onChange={handleEditChange}
              multiline
              rows={4}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default Blog;
