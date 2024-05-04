import React from 'react';

const BlogForm = ({ newBlog, handleBlogChange, addBlog }) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor="title">Title</label><br/>
        <input
          id="title"
          type="text"
          name="title"
          value={newBlog.title}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label><br/>
        <input
          id="author"
          type="text"
          name="author"
          value={newBlog.author}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        <label htmlFor="url">URL</label><br/>
        <input
          id="url"
          type="text"
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        <label htmlFor="likes">LIKES</label><br/>
        <input
          id="likes"
          type="number"
          name="likes"
          value={newBlog.likes = 0}
          onChange={handleBlogChange}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default BlogForm;