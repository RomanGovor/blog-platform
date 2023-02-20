import { FunctionComponent, ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

interface PageContentProps {
  maxWidth?: string;

  children: [ReactNode, ReactNode];
}

const PageContent: FunctionComponent<PageContentProps> = ({
  children,
  maxWidth,
}) => {
  return (
    <Flex justify="center" p="16px 0px">
      <Flex width="95%" justify="center" maxWidth={maxWidth || "860px"}>
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
        >
          {children && children[0]}
        </Flex>
        <Flex
          display={{ base: "none", md: "flex" }}
          flexDirection="column"
          flexGrow={1}
        >
          {children && children[1]}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageContent;
