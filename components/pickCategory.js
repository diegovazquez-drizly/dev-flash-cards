import React, { useState} from 'react';
import styles from "../styles/Category.module.css";
import Category from "./category";
import LoadingSpinner from "./loadingSpinner/loadingSpinner";
import { Button, Dialog, TextInput, PasswordInput } from "@mantine/core";
import { doc } from 'prettier';

export default function PickCategory({ chooseCategory, categoryData }) {
  const [showDialog, setShowDialog] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const checkCredentials = () => {
    if (!username) setUsernameError('Username cannot be blank.')
    if (!password) setPasswordError('Password cannot be blank.')
    return !!(username && password);  
  }

  const checkAuthToken = () => {
    const authToken = document.cookie.split(';').find((item) => item.trim().startsWith('authToken='));
    return !!authToken;
  }

  const loginUser = async () => {
    if (checkCredentials()) { 
      const body = JSON.stringify({
        username,
        password
      })
      try {
        const res = await fetch('/api/login', {
          method:'POST',
          body,
        });
        const data = await res.json();
        if (data.authToken) {
          document.cookie = `authToken=${data.authToken}; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT;`
          return chooseCategory("admin");
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  const handleAdmin =   () => {
    if (checkAuthToken()) {
      return chooseCategory("admin");
    } else {
      setShowDialog(true);
    }
  }

  return (
    <>
      <div className={styles.root}>
        {categoryData.length ? (
          <>
            <div className={styles.categoriesHeadingsContainer}>
              <p className={styles.admin} onClick={handleAdmin}>
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
      <Dialog 
        opened={showDialog}
        withCloseButton
        onClose={() => setShowDialog(false)}
      >
        <TextInput 
          label="User name"
          placeholder="User name"
          onChange={(e) => setUsername(e.currentTarget.value)}
          error={usernameError}
        />
        <PasswordInput 
          label="Password"
          placeholder="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          error={passwordError}
        />
        <Button
          className={styles.SubmitAuth}
          onClick={loginUser}
        >Submit</Button>
        <Button variant='default' onClick={() => setShowDialog(false)}> Cancel</Button>
      </Dialog>
    </>
  );
}
