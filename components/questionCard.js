import React from "react";
import { Card, Collapse, Text, Badge, Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function QuestionCard({ card }) {
  const [opened, { toggle }] = useDisclosure(false);

  if (!card) return null;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{card.card_question}</Text>
        <Badge color="pink" variant="light">
          {card.category_name}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {card.card_hint}
      </Text>

      <Text size="xs" color="dimmed">
        {card.card_source}
      </Text>

      <Button
        onClick={toggle}
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
      >
        Show Answer
      </Button>

      <Collapse in={opened}>
        <Text>{card.card_answer}</Text>
        <Text>{card.card_code}</Text>
      </Collapse>
    </Card>
  );
}
