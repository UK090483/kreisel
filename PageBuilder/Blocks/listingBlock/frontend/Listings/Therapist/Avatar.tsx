import { ImageResult } from "PageBuilder/Image/sanityImage.query";
import Image from "next/image";

type AvatarProps = {
  name?: string;
  image?: ImageResult;
  className?: string;
};

const imageSize = 500;
const Avatar: React.FC<AvatarProps> = (props) => {
  const { image, name, className } = props;

  return (
    <div className={`${className}`}>
      {image && image.url ? (
        <Image
          src={image.url}
          width={imageSize}
          height={imageSize / image.aspectRatio}
          alt={`${name} Profil`}
        />
      ) : (
        <div className="absolute inset-0 flex justify-center items-center bg-primary-light">
          {getInitials(name)}
        </div>
      )}
    </div>
  );
};

export default Avatar;

const getInitials = (name?: string) => {
  return name
    ? name
        .split(" ")
        .filter((i) => i)
        .reduce((acc, subName) => acc + subName[0] + "", "")
    : "N.N.";
};
