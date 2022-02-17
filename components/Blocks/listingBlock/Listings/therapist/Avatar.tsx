import SanityImage from "@lib/SanityImage";
import { ImageMetaResult } from "@lib/SanityImage/query";

type AvatarProps = {
  name?: string;
  image?: ImageMetaResult;
  className?: string;
};

const Avatar: React.FC<AvatarProps> = (props) => {
  const { image, name, className } = props;
  return (
    <div className={`${className}`}>
      {image ? (
        <SanityImage image={image} objectFit="cover" />
      ) : (
        <div className=" absolute inset-0 flex justify-center items-center  bg-primary-light">
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
