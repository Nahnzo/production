import Flex, { FlexPops } from "../Flex/Flex";

type VStackProps = Omit<FlexPops, "direction">;

const VStack = (props: VStackProps) => {
  const { align = "start" } = props;
  return <Flex direction="column" {...props} align={align} />;
};

export default VStack;
