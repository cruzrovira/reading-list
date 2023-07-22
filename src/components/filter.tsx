import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Tooltip,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useLibraryContext } from "../hooks/useLibraryContext"
import { useLibraryContextFilter } from "../hooks/useLibraryContextFilter"

type props = {}
const Filter: React.FC<props> = ({}) => {
  const [title, setTitle] = useState("")
  const [sliderValue, setSliderValue] = useState(0)
  const [showTooltip, setShowTooltip] = useState(false)
  const { genres, maxPages } = useLibraryContext()
  const { filter, setFilter } = useLibraryContextFilter()

  const handlerGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(prev => ({ ...prev, genres: e.target.value }))
  }
  const handlerPagesChange = (page: number) => {
    setFilter(prev => ({ ...prev, pages: page }))
    setSliderValue(page)
  }

  const handlerSearchTitle = () => {
    setFilter(prev => ({ ...prev, title: title }))
  }

  return (
    <Stack bg={"white"} p={4}>
      <FormControl>
        <FormLabel>Search</FormLabel>
        <InputGroup>
          <Input
            placeholder="Drácula"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </InputGroup>
      </FormControl>
      <Button colorScheme="teal" size={"sm"} onClick={handlerSearchTitle}>
        Search
      </Button>
      <Divider />
      <FormControl>
        <FormLabel>Genre</FormLabel>
        <Select onChange={handlerGenreChange} value={filter.genres}>
          <option>all</option>
          {genres.map((genre, index) => (
            <option key={index}>{genre}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Pages</FormLabel>
        <Slider
          defaultValue={0}
          min={0}
          max={maxPages}
          onChange={handlerPagesChange}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          colorScheme="teal"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="teal.500"
            color="white"
            placement="top"
            isOpen={showTooltip}
            label={`${sliderValue}`}
          >
            <SliderThumb bg={"teal"} />
          </Tooltip>
        </Slider>
      </FormControl>
    </Stack>
  )
}

export default Filter
