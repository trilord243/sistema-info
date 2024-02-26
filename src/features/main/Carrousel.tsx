import ImageGallery from "react-image-gallery";

const Carousel: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <>
      <ImageGallery />
    </>
  );
};

export default Carousel;
