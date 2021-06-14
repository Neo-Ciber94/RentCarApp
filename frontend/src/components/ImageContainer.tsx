interface ImageContainerProps {
  src: string;
  alt?: string;
}

export function ImageContainer(props: ImageContainerProps) {
  return (
    <div className="mb-2 rounded-lg overflow-hidden shadow-md border border-gray-500 border-opacity-25">
      <img
        className="w-full object-cover"
        alt={props.alt}
        style={{ maxHeight: 300 }}
        src={props.src}
      />
    </div>
  );
}
