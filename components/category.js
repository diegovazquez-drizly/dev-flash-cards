import styles from '../styles/Category.module.css';

export default function Category({ name, handleClick }) {

  return (
    <div className={styles.categoryContainer} onClick={handleClick(name)}>
      <h3>{name}</h3>
    </div>
    )
}