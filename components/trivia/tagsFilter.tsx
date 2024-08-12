import { MultiSelect } from "@mantine/core";
import { useState } from "react";
import s from "./trivia.module.scss";

interface TagsFilterInterface {
  tagKeys: string[];
}

export default function TagsFilter({ tagKeys }: TagsFilterInterface) {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div className={s.TagsFilterContainer}>
      <MultiSelect
        label="Tags"
        placeholder="Choose a tag(s)"
        data={tagKeys.sort()}
        onChange={setValue}
        className={s.TagsFilter}
      />
    </div>
  );
}
