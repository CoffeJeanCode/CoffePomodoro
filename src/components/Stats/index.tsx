import { Button, Icon } from "@chakra-ui/react";
import { FaChartBar } from "react-icons/fa";

const Stats = () => {
  return (
    <>
      <Button leftIcon={<Icon as={FaChartBar} />}>Stats</Button>
    </>
  );
};

export default Stats;
