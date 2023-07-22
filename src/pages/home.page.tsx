import { Center, Spinner, Stack } from "@chakra-ui/react"
import React from "react"
import Filter from "../components/filter"
import LibraryList from "../components/libraryList"

import { useLibraryContextFilter } from "../hooks/useLibraryContextFilter"
import Layout from "../layout/layout"

const HomePage: React.FC = () => {
  const { getLibraryFilter } = useLibraryContextFilter()
  const library = getLibraryFilter()

  return (
    <Layout>
      <Stack direction={{ base: "column", md: "row" }} w="100%" gap={4}>
        <Stack w={{ base: "100%", md: "300px" }}>
          <Filter />
        </Stack>
        <Stack w={{ base: "100%", md: "calc( 100% - 300px)" }}>
          {library && <LibraryList library={library} />}

          {!library && (
            <Center>
              <Spinner size={"xl"} />
            </Center>
          )}
        </Stack>
      </Stack>
    </Layout>
  )
}

export default HomePage
