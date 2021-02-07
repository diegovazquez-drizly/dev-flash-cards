import React, { useRef } from 'react';
import styles from '../styles/Category.module.css';

export default function Category({ name, handleClick }) {
  const ref = useRef();
  return (
    <div className={styles.categoryButton} onClick={handleClick(name, ref)} ref={ref}>
      <h3>{name}</h3>
    </div>
    )
}