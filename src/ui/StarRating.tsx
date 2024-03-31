import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

interface StarProps {
  onClick: () => void;
  isFull: boolean;
  onHoverOut: () => void;
  onHoverIn: () => void;
  imageSrc?: string; // Opcional porque tiene un valor por defecto
  size: number;
}

export const Star: React.FC<StarProps> = ({
  onClick,
  isFull,
  onHoverOut,
  onHoverIn,
  imageSrc = "https://firebasestorage.googleapis.com/v0/b/invitacion-27932.appspot.com/o/symtech.svg?alt=media&token=0117d744-ab55-437a-b229-83e1fb34d201",
  size,
}) => {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
    opacity: isFull ? 1 : 0.5, // Establecer opacidad basada en si la estrella está 'llena'
    transition: "opacity 0.2s ease-in-out", // Opcional: transición suave de opacidad
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onClick}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      <img
        src={imageSrc}
        alt="star"
        style={{ width: "100%", height: "100%" }}
      />
    </span>
  );
};

interface StarRatingProps {
  maxRating?: number;
  imageSrc?: string;
  size?: number;
  className?: string;
  onsetRating: (rating: number) => void;
  defRating?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  maxRating = 5,
  imageSrc = "https://firebasestorage.googleapis.com/v0/b/sistema-info-d52b6.appspot.com/o/eugenio.svg?alt=media&token=cf6ff87e-e4eb-4179-add3-4e08874a671f",
  size = 48,
  className = "",
  onsetRating,
  defRating = 0,
}) => {
  const [rating, setRating] = useState<number>(defRating);
  const [tempRating, setTempRating] = useState<number | null>(null);

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
    onsetRating(newRating);
  };

  const displayRating = tempRating || rating;

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(null)} // Volver a null para que se muestre la calificación actual al salir
            key={i}
            isFull={displayRating >= i + 1} // Determina si la imagen debe estar completamente opaca o no
            onClick={() => handleRatingClick(i + 1)}
            imageSrc={imageSrc}
            size={size}
          />
        ))}
      </div>
    </div>
  );
};
