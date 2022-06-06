import React from 'react'

import Dashboard from './views/dashboard/Dashboard.jsx'
import Blog from './views/dashboard/Blog.jsx'

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/blog', name: 'Blog', element: Blog },
  { path: '/blog/:id', name: 'Blog', element: Blog },
  { path: '/blog/:id/edit', name: 'Edit Post', element: Blog },
  { path: '/blog/add', name: 'Add Post', element: Blog },
]

export default routes
