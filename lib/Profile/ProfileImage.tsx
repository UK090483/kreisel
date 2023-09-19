import { ImageUpload } from "components/Molecules/Inputs/ImageUpload";

const ProfileImage = ({ image }: { image?: string | null }) => {
  return (
    <div>
      <ImageUpload
        name=""
        image={image}
        onSave={async (image) => {
          if (!image || !image?.file) return false;
          const formData = new FormData();
          formData.append("file", image.file, "file");
          const res = await fetch(`/api/profileImage`, {
            method: "POST",
            body: formData,
          });
          return res.ok;
        }}
        onErase={async () => {
          const res = await fetch(`/api/profileImage`, {
            method: "DELETE",
          });
          return res.ok;
        }}
      />
    </div>
  );
};
export default ProfileImage;
