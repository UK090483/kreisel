import Image, { ImageSrc, validateSrc } from "components/Atoms/Image";

type AvatarProps = {
  name?: string;
  image?: ImageSrc;
  className?: string;
};

const Avatar: React.FC<AvatarProps> = (props) => {
  const { image, name, className } = props;

  return (
    <div className={`${className} relative`}>
      {validateSrc(image) ? (
        <Image
          src={image}
          alt={`${name} Profil`}
          fill={true}
          className=" object-cover"
        />
      ) : (
        <div className="absolute  inset-0 flex justify-center items-center bg-primary-light">
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
