import { Image } from "@components/Image";
import { ImageMetaResult } from "@services/pageBuilderService/queries/snippets";

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
        <Image />
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
