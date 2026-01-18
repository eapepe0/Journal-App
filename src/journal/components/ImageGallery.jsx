import { useState } from "react";
import { ImageCarouselModal } from "./ImageCarouselModal";
import { Box } from "@mui/material";

export const ImageGallery = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOpen = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 1,
        }}
      >
        {images.map((image, index) => (
          <Box
            key={image}
            onClick={() => handleOpen(index)}
            sx={{ cursor: "pointer" }}
          >
            <img
              src={image}
              srcSet={`
    ${image}?w=400 400w,
    ${image}?w=800 800w,
    ${image}?w=1200 1200w
  `}
              sizes="
    (max-width: 600px) 100vw,
    (max-width: 900px) 50vw,
    (max-width: 1200px) 33vw,
    25vw
  "
              alt="Imagen"
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 6,
                imageRendering: "auto",
              }}
            />
          </Box>
        ))}
      </Box>

      <ImageCarouselModal
        open={open}
        onClose={() => setOpen(false)}
        images={images}
        index={selectedIndex}
        setIndex={setSelectedIndex}
      />
    </>
  );
};
