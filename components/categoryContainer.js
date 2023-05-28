import React, { useEffect, useState } from "react";
import QuestionCard from "./questionCard";
import { Button, Collapse } from "@mantine/core";
import styles from "../styles/Admin.module.css";
import { useDisclosure } from "@mantine/hooks";

export default function CategoryContainer(props) {
  const [opened, { toggle }] = useDisclosure(false);

  const categoryButtons = props?.cards?.map((card) => {
    return <QuestionCard card={card} />;
  });

  return (
    <>
      <Button className={styles.CategoryButtons} onClick={toggle}>
        {`${props.categoryName} ${opened ? "-" : "+"}`}
      </Button>
      <Collapse in={opened}>{categoryButtons}</Collapse>
    </>
  );
}
