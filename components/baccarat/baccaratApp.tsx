import { Tabs, rem } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import Baccarat from "./baccarat";
import s from "./baccarat.module.scss";

export default function BaccaratApp() {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <div className={s.BaccaratContainer}>
      <h1 className={s.Heading}>Baccarat</h1>
      <Tabs defaultValue="single">
        <Tabs.List>
          <Tabs.Tab
            value="single"
            leftSection={<IconPhoto style={iconStyle} />}
          >
            Single Session
          </Tabs.Tab>
          <Tabs.Tab
            value="multi"
            leftSection={<IconMessageCircle style={iconStyle} />}
          >
            Multi Session
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="single">
          <Baccarat multiSession={false} />
        </Tabs.Panel>

        <Tabs.Panel value="multi">
          <Baccarat multiSession />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
