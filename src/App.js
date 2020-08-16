import React from "react";
import { ThemeProvider, theme, Flex, PseudoBox, Icon } from "@chakra-ui/core";
import { motion } from "framer-motion";
import "./styles.css";
import useIterator from "./useIterator";

const images = [
  {
    id: 1,
    path:
      "https://p1.pxfuel.com/preview/387/762/376/mountains-alpine-mountain-landscape-bernese-oberland-switzerland-landscape.jpg",
    thumbnail:
      "https://p1.pxfuel.com/preview/387/762/376/mountains-alpine-mountain-landscape-bernese-oberland-switzerland-landscape.jpg"
  },
  {
    id: 2,
    path:
      "https://images.pexels.com/photos/714258/pexels-photo-714258.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    thumbnail:
      "https://images.pexels.com/photos/714258/pexels-photo-714258.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  {
    id: 3,
    path:
      "https://c0.wallpaperflare.com/preview/481/575/757/himalayas-mountain-travel-nature.jpg",
    thumbnail:
      "https://c0.wallpaperflare.com/preview/481/575/757/himalayas-mountain-travel-nature.jpg"
  },
  {
    id: 4,
    path: "https://live.staticflickr.com/3090/2418536788_4c95e26b86_b.jpg",
    thumbnail: "https://live.staticflickr.com/3090/2418536788_4c95e26b86_b.jpg"
  }
];

const ImageContainer = motion.custom(PseudoBox);

const IconButton = (props) => (
  <PseudoBox as="button" border="none" {...props} />
);

const variants = {
  enter: (direction = 0) => {
    return {
      x: direction > 0 ? 200 : -200,
      scale: 0.8
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction = 0) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 200 : -200,
      scale: 0.8
    };
  }
};

export default function App() {
  const { current, previous, next, setCurrent, onPrev, onNext } = useIterator(
    images.length,
    1
  );
  const activeIndex = current - 1;
  const [direction, setDirection] = React.useState(1);

  const handlePrevious = () => {
    setDirection(-1);
    onPrev();
  };

  const handleNext = () => {
    setDirection(1);
    onNext();
  };

  return (
    <ThemeProvider theme={theme}>
      <Flex
        align="center"
        justify="center"
        p="4rem"
        h="60rem"
        direction="column"
        overflow="hidden"
      >
        <Flex align="center" justify="center" position="relative" w="80rem">
          <PseudoBox
            as="img"
            height="22rem"
            src={images[previous - 1].path}
            position="absolute"
            left="0"
            width="50%"
            top="4rem"
            cursor="pointer"
            onClick={handlePrevious}
            style={{
              filter: "brightness(0.5)"
            }}
          />
          <ImageContainer
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 200 },
              opacity: { duration: 0.2 }
            }}
            as="img"
            key={current}
            custom={direction}
            width="60rem"
            height="30rem"
            rounded="6px"
            src={images[activeIndex].path}
            alt="imagea"
          />
          <PseudoBox
            as="img"
            height="22rem"
            position="absolute"
            src={images[next - 1].path}
            right="0"
            width="50%"
            top="4rem"
            cursor="pointer"
            onClick={handleNext}
            style={{
              filter: "brightness(0.5)"
            }}
          />
        </Flex>
        <Flex align="center" mt="2rem">
          <IconButton mr="2rem" onClick={handlePrevious}>
            <Icon name="chevron-left" size="3rem" color="#aaa" />
          </IconButton>
          {images.map((image, index) => {
            const isCurrent = activeIndex === index;
            return (
              <PseudoBox
                key={image.id}
                onClick={() => setCurrent(index + 1)}
                _first={{
                  marginLeft: 0
                }}
                opacity={isCurrent ? 1 : "0.4"}
                cursor="pointer"
                ml="2rem"
                rounded="4px"
                size="4rem"
                as="img"
                src={image.thumbnail}
              />
            );
          })}
          <IconButton ml="2rem" onClick={handleNext}>
            <Icon name="chevron-right" size="3rem" color="#aaa" />
          </IconButton>
        </Flex>
      </Flex>
    </ThemeProvider>
  );
}
