import styles from '../styles/Category.module.css';
import { useEffect, useState } from 'react';
import Category from './category';

export default function PickCategory({ chooseCategory }) {
  const [didFetch, setDidFetch] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (!didFetch) {
      fetch('/api/category')
        .then(res => res.json())
        .then(data => {
          setDidFetch(true);
          setCategoryData(data);
        })
        .catch(err => console.log(err));
    }
  });

  function handleClick(name, ref) {
    return (event) => {
      chooseCategory(name);
    }
  }

  return (
    <div className={styles.root}>
      {didFetch 
        ? 
          <>
            <h1>Pick a Category</h1>
            <div className={styles.categoriesContainer}>
              {categoryData.map((category, i) => {
                return (
                  <Category
                    key={i} 
                    name={category.category_name}
                    handleClick={handleClick}
                  />
                )
              })} 
            </div>
          </>
        : null}
    </div>
    )
}