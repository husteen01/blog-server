const Blog = require("../models/blog")  
// a. create a blog
const createBlog = async (req, res) => {
//    res.send("created")
//    console.log(req.body)

   const {userId} = req.user; // get userId from the authenticated user
   req.body.createdBy = userId; // add createdBy field to the blog object
    try {
         const blog = await Blog.create(req.body); // create a new blog using the Blog model
         res.status(201).json({success: true, blog}); // send the created blog as a response
    } catch (error) {
         res.json({error});
    }
}

// b. get all blogs
const getAllBlogs = async (req, res) => {
    // res.send("get all blogs")

    const {userId} = req.user; // get userId from the authenticated user
    try {
        const blogs = await Blog.find({createdBy: userId}) // find all blogs created by the user
            res.status(200).json({success: true, blogs}); // send the blogs as a response
    } catch (error) {
        res.json({error});
    }
}

// c. get a single blog
const getSingleBlog = async (req, res) => {
    // res.send("single blog")
    const {userId} = req.user; // get userId from the authenticated user
    const {blogId} = req.params; // get blogId from the request parameters
    try {
        const blog = await Blog.findOne({createdBy: userId, _id: blogId}); // find the blog by id and createdBy userId
        res.status(200).json({success: true, blog}); // send the blog as a response
    } catch (error) {
        res.json({error});
    }
}

// d. update a blog
const updateBlog = async (req, res) => {
    res.send("updated")
    const {userId} = req.user; // get userId from the authenticated user
    const {blogId} = req.params; // get blogId from the request parameters
    try {
        const blog = await Blog.findOneAndUpdate(
            {createdBy: userId, _id: blogId}, req.body, {new: true}, 
            {runValidators: true}); // find the blog by id and createdBy userId, update it with req.body, return the updated blog
            res.satus(200).json({success: true, blog}); // send the updated blog as a response
    } catch (error) {
        res.json({error});
    }
}

// e. delete a blog
const deleteBlog = async (req, res) => {
    res.send("deleted")
    const {userId} = req.user;
    const {blogId} = req.params; 
    try {
        const blog = await Blog.findOneAndDelete({createdBy: userId, _id: blogId});
        res.status(200).json({success: true, msg: "Blog deleted successfully"}) // find the blog by id and createdBy userId, delete it
    } catch (error) {
        res.json({error});
    }
}

module.exports = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
}