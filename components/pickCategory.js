import React from "react";
import styles from "../styles/Category.module.css";
import Category from "./category";
import LoadingSpinner from "./loadingSpinner/loadingSpinner";

export default function PickCategory({ chooseCategory, categoryData }) {
  return (
    <>
      <div className={styles.root}>
        {categoryData.length ? (
          <>
            <div className={styles.categoriesContainer}>
              {categoryData.map((category, i) => {
                return (
                  <Category
                    key={i}
                    name={category.category_name}
                    handleClick={(name) => () => chooseCategory(name)}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </>
  );
}
