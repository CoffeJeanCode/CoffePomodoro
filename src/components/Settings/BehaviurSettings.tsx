import { Box, Switch, Title } from "@mantine/core";

import { FC } from "react";

interface Props {
  configuration: any;
  setConfigValue: any;
}

const BehaviurSettings: FC<Props> = ({ configuration, setConfigValue }) => {
  return (
    <Box my={20}>
      <Title order={3} size={25}>
        Behaviur
      </Title>
      <Switch
        label="Auto play timer"
        onLabel="ON"
        offLabel="OFF"
        size="md"
        checked={configuration.canAutoPlay}
        onChange={(event) =>
          setConfigValue("canAutoPlay", event.currentTarget.checked)
        }
      />
    </Box>
  );
};

export default BehaviurSettings;
