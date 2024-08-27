import { MultiSelect } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import s from "./trivia.module.scss";

interface TagsFilterInterface {
  tagKeys: string[];
  setFilters: Dispatch<SetStateAction<string[]>>;
}

export default function TagsFilter({
  tagKeys,
  setFilters,
}: TagsFilterInterface) {
  return (
    <div className={s.TagsFilterContainer}>
      <MultiSelect
        label=""
        placeholder="Choose a tag(s)"
        data={tagKeys.sort()}
        onChange={setFilters}
      />
    </div>
  );
}
