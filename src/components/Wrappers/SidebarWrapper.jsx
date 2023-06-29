import React from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Avatar,
  HStack,
  Button,
  Heading,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FiMenu, FiLogOut, FiEdit3, FiFileText } from "react-icons/fi";
import { Logo } from "../Logo";
import { signOut, useSession } from "next-auth/react";
import { maskCapitalize } from "@/utils/maskCapitalize";
import { useRouter } from "next/router";

const LinkItems = [
  { name: "Processos", href: "/", icon: FiFileText },
  { name: "Cadastros", href: "/cadastros", icon: FiEdit3 },
];

export function SidebarWrapper({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 280 }} py={{ base: 0, md: 4 }}>
        {/* <Box p={4}>
          <Heading size="lg">Process Manager</Heading>
        </Box> */}
        <Box px={4}>{children}</Box>
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, asPath, ...rest }) => {
  const { data: session } = useSession();
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 280 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Heading display={{ base: "block", md: "none" }} size={["sm", "lg"]}>
          Process Manager
        </Heading>
        <HStack>
          <Logo h={[6, 8]} />

          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </HStack>
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
      <Box shadow="inner" bottom={0} position="absolute" w="full">
        <HStack p={3}>
          <Avatar />
          <Box>
            <Text fontSize={16}>{maskCapitalize(session?.user.name)}</Text>
            <Button
              size="xs"
              leftIcon={<FiLogOut />}
              alignSelf="self-end"
              colorScheme="red"
              variant="outline"
              onClick={signOut}
            >
              Sair
            </Button>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, href = "#", children, ...rest }) => {
  const router = useRouter();
  const { asPath } = router;

  return (
    <Link
      href={href}
      as={NextLink}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        px={4}
        py={3}
        mb={2}
        mx={4}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "primary.500",
          color: "white",
        }}
        bg={asPath === href && "primary.400"}
        color={asPath === href && "white"}
        transition="all .2s ease-in-out"
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="space-between"
      {...rest}
      flex="0 0 1%"
      position="sticky"
      top={0}
      zIndex="banner"
    >
      <HStack>
        <IconButton
          variant="outline"
          onClick={onOpen}
          aria-label="open menu"
          icon={<FiMenu />}
        />
        <Heading display={{ base: "block", md: "none" }} size={["sm", "lg"]}>
          Process Manager
        </Heading>
      </HStack>

      <Logo h={6} />
    </Flex>
  );
};
