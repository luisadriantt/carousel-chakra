import React, { useState } from "react";
import {
  ModalContent,
  Modal,
  ModalBody,
  ModalOverlay,
  Box,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

interface ImageCarouselProps {
  images: string[];
  showThumbs?: boolean;
  size?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  showThumbs,
  size,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imgIndex, setImgIndex] = useState(0);

  const carouselAction = (index: number) => {
    setImgIndex(index);
  };

  return (
    <>
      <Box w={size ? size : "322px"}>
        <Carousel
          onClickItem={(index) => {
            carouselAction(index), onOpen();
          }}
          showThumbs={showThumbs ?? true}
        >
          {images.map((img, _) => (
            <img key={_} src={img} />
          ))}
        </Carousel>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box position="relative">
              <IconButton
                aria-label="Search database"
                pos="absolute"
                top="calc(50% - 20px)"
                left="50px"
                icon={<ChevronLeftIcon />}
                onClick={() => setImgIndex(imgIndex - 1)}
              />
              <img alt="" src={images[imgIndex]} />
              <IconButton
                aria-label="Search database"
                onClick={() => setImgIndex(imgIndex + 1)}
                position="absolute"
                top="calc(50% - 20px)"
                right="50px"
                icon={<ChevronRightIcon />}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageCarousel;
