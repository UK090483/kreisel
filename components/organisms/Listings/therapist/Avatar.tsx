import SanityImage from "@privateModules/SanityImage";
import { ImageMetaResult } from "@privateModules/SanityImage/query";

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
        <SanityImage />
      ) : (
        <div className=" absolute inset-0 flex justify-center items-center  font-bold  bg-primary">
          {getInitials(name)}
        </div>
      )}
    </div>
  );
};

export default Avatar;

const getInitials = (name?: string) => {
  return name
    ? name.split(" ").reduce((acc, subName) => acc + subName[0] + "", "")
    : "N.N.";
};
