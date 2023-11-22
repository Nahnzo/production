import Flex, { FlexPops } from "../Flex/Flex";

type HStackProps = Omit<FlexPops, "direction">;

const HStack = (props: HStackProps) => {
  return <Flex direction="row" {...props} />;
};

export default HStack;
