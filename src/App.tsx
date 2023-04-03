import { useState, useEffect } from 'react'
import React, { lazy, Suspense } from 'react';
import { Post, Category, Subcategory } from './interfaces/post'
import './App.css'
const Header = lazy(() => import('./components/header'));

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(posts => {
        const groupedCategories = groupPostsByCategory(posts);
        setCategories(groupedCategories);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setError('There was an error fetching the posts. Please try again later.');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  function groupPostsByCategory(posts: Post[]): Category[] {
    const categories: Category[] = [];

    // First group by category
    const categoriesMap = new Map<string, Post[]>();
    posts.forEach(post => {
      const category = post.category;
      if (categoriesMap.has(category)) {
        categoriesMap.get(category)?.push(post);
      } else {
        categoriesMap.set(category, [post]);
      }
    });

    categoriesMap.forEach((posts, category) => {
      const subcategoriesMap = new Map<string, Post[]>();
      posts.forEach(post => {
        const subcategory = post.subcategory;
        if (subcategoriesMap.has(subcategory)) {
          subcategoriesMap.get(subcategory)?.push(post);
        } else {
          subcategoriesMap.set(subcategory, [post]);
        }
      });

      const subcategories: Subcategory[] = [];
      subcategoriesMap.forEach((posts, subcategory) => {
        subcategories.push({ name: subcategory, posts });
      });

      categories.push({ name: category, subcategories });
    });

    return categories;
  }

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <div className="grid-container">
        {categories.map(category => (
          <div key={category.name} className="category">
            <h2>{category.name}</h2>
            {category.subcategories.map(subcategory => (
              <div key={subcategory.name} className="subcategory">
                <h3>{subcategory.name}</h3>
                <div className="grid-subcontainer">
                  {subcategory.posts.map(post => (
                    <div key={post.id} className="card">
                      <h4>{post.title}</h4>
                      <p>{post.body}</p>
                      <button>Read Later</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default App;

