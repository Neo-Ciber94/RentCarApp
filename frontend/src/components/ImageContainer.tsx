import { useState } from "react";
import "./ImageContainer.css";

interface ImageContainerProps {
  src: string;
  alt?: string;
  height?: number;
}

const PLACEHOLDER_IMAGE =
  process.env.PUBLIC_URL + "/images/placeholder-vehicle.png";

export function ImageContainer(props: ImageContainerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const height = props.height || 300;

  return (
    <div className="mb-2 rounded-lg overflow-hidden shadow-md border border-gray-500 border-opacity-25">
      {!isLoaded && (
        <img
          className={`placeholder-img w-full object-cover ${
            isLoaded ? "hidden" : "block"
          }`}
          alt={props.alt}
          style={{ height }}
          src={PLACEHOLDER_IMAGE}
        />
      )}

      <img
        className={`loaded-img w-full object-cover ${
          isLoaded ? "block" : "hidden"
        }`}
        alt={props.alt}
        style={{ height }}
        src={props.src}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
