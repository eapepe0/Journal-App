import React from "react";
import {
  Dialog,
  IconButton,
  Box
} from "@mui/material";
import {
  Close,
  ArrowBackIosNew,
  ArrowForwardIos
} from "@mui/icons-material";

export const ImageCarouselModal = ({
  open,
  onClose,
  images,
  index,
  setIndex
}) => {

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <Box sx={{ position: "relative", bgcolor: "black" }}>
        
        {/* Cerrar */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8, color: "white", zIndex: 10 }}
        >
          <Close />
        </IconButton>

        {/* Imagen */}
        <img
          src={images[index]}
          alt="Imagen ampliada"
          style={{
            maxHeight: "90vh",
            maxWidth: "90vw",
            display: "block",
            margin: "auto"
          }}
        />

        {/* Navegación */}
        <IconButton
          onClick={handlePrev}
          sx={{ position: "absolute", top: "50%", left: 10, color: "white" }}
        >
          <ArrowBackIosNew />
        </IconButton>

        <IconButton
          onClick={handleNext}
          sx={{ position: "absolute", top: "50%", right: 10, color: "white" }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Dialog>
  );
};
