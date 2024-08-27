import { Notification } from "@mantine/core";
import s from "./resetDialog.module.scss";

export default function ResetNotification() {
  return (
    <Notification
      title="Reset questions history"
      className={s.Notification}
      withBorder
    >
      Your question history has been reset
    </Notification>
  );
}
