import styles from "../styles/Category.module.css";
import Category from "./category";
import { disableButton } from "../helperFunctions/cardTransition";
import LoadingSpinner from "./loadingSpinner/loadingSpinner";

export default function PickCategory({ chooseCategory, categoryData }) {
  function handleClick(name) {
    return () => {
      chooseCategory(name);
    };
  }
  return (
    <div className={styles.root}>
      {categoryData.length ? (
        <>
          <div className={styles.categoriesHeadingsContainer}>
            <p className={styles.admin} onClick={() => chooseCategory("admin")}>
              Admin
            </p>
            <h1 className={styles.heading}>Pick a Category</h1>
          </div>
          <div className={styles.categoriesContainer}>
            {categoryData.map((category, i) => {
              return (
                <Category
                  key={i}
                  name={category.category_name}
                  handleClick={handleClick}
                />
              );
            })}
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
