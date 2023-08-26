import { ImageUpload } from "components/Molecules/Inputs/ImageUpload";

const ProfileImage = ({ image }: { image?: string | null }) => {
  return (
    <div>
      <ImageUpload
        name=""
        image={image}
        onSave={(image) => {
          if (!image) return;
          const formData = new FormData();
          if (image?.erased) {
            formData.append("erased", "true");
          } else {
            if (image?.file) {
              formData.append("file", image.file, "file");
            }
          }

          fetch(`/api/profileImage`, {
            method: "POST",
            body: formData,
          }).then((e) => {
            console.log(e);
          });
        }}
      />
    </div>
  );
};
export default ProfileImage;
