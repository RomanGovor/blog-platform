import { FunctionComponent } from "react";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

type SearchInputProps = {
  // user:
};

/* eslint-disable-next-line react/no-children-prop */
const SearchInput: FunctionComponent<SearchInputProps> = () => {
  return (
    <Flex flexGrow={1} mr={2} align="center">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" mb="1" />
        </InputLeftElement>
        <Input
          placeholder="Search Reddit"
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
          _focus={{ bg: "none", border: "1px solid", borderColor: "blue.500" }}
          height="34px"
          bg="gray.50"
          flex="10"
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
