import React, { useState } from "react";
import styles from "../styles/Admin.module.css";
import { Textarea } from "@mantine/core";
import { Button, Select, Dialog } from "@mantine/core";

export default function AdminContainer({ categoryData, setAdmin }) {
  const [category, setCategory] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState("");
  const [source, setSource] = useState("");
  const [code, setCode] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const handleClick = () => {
    setShowDialog(true);
    console.log("category", category);
    console.log("question", question);
    console.log("hint", hint);
    console.log("source", source);
    console.log("code", code);
  };

  const selectData = (data) =>
    data.map((el) => ({
      value: el.category_id,
      label: el.category_name,
    }));

  return (
    <div className={styles.AdminContainer}>
      <h2>Add question</h2>
      <Select
        label="Category"
        placeholder="Category"
        data={selectData(categoryData)}
        onChange={setCategory}
        required
      />
      <Textarea
        label="Question"
        placeholder="Question"
        onChange={(e) => setQuestion(e.currentTarget.value)}
        required
      />
      <Textarea
        label="Answer"
        placeholder="Answer"
        onChange={(e) => setAnswer(e.currentTarget.value)}
        required
      />
      <Textarea
        label="Hint"
        placeholder="Hint"
        onChange={(e) => setHint(e.currentTarget.value)}
      />
      <Textarea
        label="Source"
        placeholder="Source"
        onChange={(e) => setSource(e.currentTarget.value)}
      />
      <Textarea
        label="Relevant Code"
        placeholder="Relevant Code"
        onChange={(e) => setCode(e.currentTarget.value)}
        
      />
      <Button
        onClick={handleClick}
        disabled={!question || !answer || !category}
        className={styles.Submit}
      >
        Submit
      </Button>
      <Button
        onClick={() => setAdmin(false)}
        className={styles.Cancel}
      >
        Cancel
      </Button>
      <Dialog
        opened={showDialog}
        withCloseButton
        onClose={() => setShowDialog(false)}
      >
        <div className={styles.DialogContainer}>
          <p className={styles.DialogHeading}>Are you sure?</p>
          <div className={styles.DialogButtonsContainer}>
            <Button
            onClick={() => console.log('submit')}
            >Yes</Button>
            <Button
              onClick={() => setShowDialog(false)}
            >No</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
