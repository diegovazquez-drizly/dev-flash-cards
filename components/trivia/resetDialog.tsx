import { Button, Dialog } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import s from "./resetDialog.module.scss";
import Storage from "../../utils/storage";
import ResetNotification from "./resetNotification";

interface ResetDialogProps {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  close: () => void;
}

export default function ResetDialog({
  showDialog,
  setShowDialog,
  close,
}: ResetDialogProps) {
  const [showNotification, setShowNotification] = useState(false);

  const handleReset = () => {
    Storage.delete();
    close();
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <>
      <Dialog
        opened={showDialog}
        withCloseButton
        onClose={() => setShowDialog(false)}
      >
        <p>Are you sure you want to reset the question history?</p>
        <div className={s.ButtonsWrapper}>
          <Button className={s.SubmitAuth} onClick={handleReset}>
            Yes
          </Button>
          <Button variant="default" onClick={close}>
            No
          </Button>
        </div>
      </Dialog>
      {showNotification && <ResetNotification />}
    </>
  );
}
