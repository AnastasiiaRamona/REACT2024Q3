interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const Image: React.FC<ImageProps> = ({ src, alt, width = 100, height = 100, ...rest }) => {
  const { priority, ...imgProps } = rest;

  return <img src={src} alt={alt} width={width} height={height} {...imgProps} />;
};

export default Image;
