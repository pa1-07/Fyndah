const express = require('express');
const BlogPost = require('../models/BlogPost');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get all blog posts (Public)
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new blog post (Admin only)
router.post('/', authMiddleware, async (req, res) => {
  const blogPost = new BlogPost({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });
  try {
    const newPost = await blogPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a blog post (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) return res.status(404).json({ message: 'Blog post not found' });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a blog post (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    console.log('Attempting to delete blog post with ID:', req.params.id); // Log the ID
    const blog = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog post not found' });
    res.json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
