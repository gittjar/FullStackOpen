import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogForm from './BlogForm';
import UserBlogs from './UserBlogs';

test('BlogForm calls the event handler with the right details when a new blog is created', () => {
  const addBlog = jest.fn();

  const component = render(
    <BlogForm addBlog={addBlog} title="Test Title" /> 
  );

  const input = component.container.querySelector('#title');
  const form = component.container.querySelector('form');

  fireEvent.change(input, { target: { value: 'testing of forms could be easier' } });
  fireEvent.submit(form);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe('testing of forms could be easier');
});

test('UserBlogs renders blogs and allows interaction', () => {
  const blogs = [
    {
      id: '1',
      title: 'First blog',
      author: 'John Doe',
      url: 'http://example.com/first',
      likes: 5,
      user: {
        username: 'johndoe',
        name: 'John Doe',
      },
    },
    {
      id: '2',
      title: 'Second blog',
      author: 'Jane Doe',
      url: 'http://example.com/second',
      likes: 10,
      user: {
        username: 'janedoe',
        name: 'Jane Doe',
      },
    },
  ];

  const component = render(
    <UserBlogs blogs={blogs} />
  );

  expect(component.container).toHaveTextContent('First blog');
  expect(component.container).toHaveTextContent('Second blog');

  const likeButton = component.getByText('I Like this!');
  fireEvent.click(likeButton);

  expect(component.container).toHaveTextContent('Likes: 6');
});