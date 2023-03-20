import NextLink from "next/link";
import * as Chakra from "@chakra-ui/react";

export default function Home() {
  return (
    <Chakra.Container>
      <Chakra.Heading my={8}>My Blog</Chakra.Heading>

      <Chakra.VStack align="flex-start">
        <Chakra.Link as={NextLink} href="/posts/1">
          Lorem ipsum 01
        </Chakra.Link>
        <Chakra.Link as={NextLink} href="/posts/2">
          Lorem ipsum 02
        </Chakra.Link>
        <Chakra.Link as={NextLink} href="/posts/3">
          Lorem ipsum 03
        </Chakra.Link>
      </Chakra.VStack>
    </Chakra.Container>
  );
}
