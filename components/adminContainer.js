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
  const [showAddQuestionSuccess, setShowAddQuestionSuccess] = useState(false);

  const clearFields = () => {
    setCategory(null);
    setQuestion("");
    setAnswer("");
    setHint("");
    setSource("");
    setCode("");
  };

  const handleSubmit = async () => {
    const body = JSON.stringify({
      category,
      question,
      answer,
      hint,
      source,
      code,
    });
    try {
      const res = await fetch("/api/question", {
        method: "POST",
        body,
      });
      await res.json();
      setShowDialog(false);
      setShowAddQuestionSuccess(true);
      clearFields();
    } catch (e) {
      console.log(e);
    }
  };

  const selectData = (data) =>
    data.map((el) => ({
      value: el.category_id,
      label: el.category_name,
    }));

  const heading = showAddQuestionSuccess
    ? "Add another question?"
    : "Add question?";

  return (
    <div className={styles.AdminContainer}>
      <h2>{heading}</h2>
      <Select
        label="Category"
        placeholder="Category"
        data={selectData(categoryData)}
        onChange={setCategory}
        required
        value={category}
      />
      <Textarea
        label="Question"
        placeholder="Question"
        onChange={(e) => setQuestion(e.currentTarget.value)}
        required
        value={question}
      />
      <Textarea
        label="Answer"
        placeholder="Answer"
        onChange={(e) => setAnswer(e.currentTarget.value)}
        required
        value={answer}
      />
      <Textarea
        label="Hint"
        placeholder="Hint"
        onChange={(e) => setHint(e.currentTarget.value)}
        value={hint}
      />
      <Textarea
        label="Source"
        placeholder="Source"
        onChange={(e) => setSource(e.currentTarget.value)}
        value={source}
      />
      <Textarea
        label="Relevant Code"
        placeholder="Relevant Code"
        onChange={(e) => setCode(e.currentTarget.value)}
        value={code}
      />
      <Button
        onClick={() => setShowDialog(true)}
        disabled={!question || !answer || !category}
        className={styles.Submit}
      >
        Submit
      </Button>
      <Button onClick={() => setAdmin(false)} className={styles.Cancel}>
        Cancel
      </Button>
      {showAddQuestionSuccess && (
        <p className={styles.SuccessMessage}>Success! ✅</p>
      )}
      <Dialog
        opened={showDialog}
        withCloseButton
        onClose={() => setShowDialog(false)}
      >
        <div className={styles.DialogContainer}>
          <p className={styles.DialogHeading}>Are you sure?</p>
          <div className={styles.DialogButtonsContainer}>
            <Button onClick={handleSubmit}>Yes</Button>
            <Button onClick={() => setShowDialog(false)}>No</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
