import { Button } from "@mantine/core";

import { IconBrandX } from "@tabler/icons-react";
export function TwitterButton(props) {
  return (
    <Button
      leftSection={
        <IconBrandX style={{ width: "1rem", height: "1rem" }} color="#00ACEE" />
      }
      variant="default"
      {...props}
    />
  );
}
