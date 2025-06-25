const router = require("express").Router();
const { createBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlog } = require("../controllers/blog");

router.route("/").post(createBlog).get(getAllBlogs);
router.route("/:blogId").patch(updateBlog).get(getSingleBlog).delete(deleteBlog);




module.exports = router;