import { Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styles from "../styles/Header.module.css";
import MenuDrawer from "./drawer";

export default function Header({ chooseCategory, setPage }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <div className={styles.HeaderContainer}>
      <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
      <MenuDrawer
        chooseCategory={chooseCategory}
        setPage={setPage}
        opened={opened}
        toggle={toggle}
      />
    </div>
  );
}
