import { FC, useState, ChangeEvent, FormEvent } from "react";
import { ButtonSuccess, ButtonError } from "../../Shared/Components/Buttons";
import styled from "styled-components";
import { updateImage } from "../../../services/user.service.ts";
import { toast } from "react-toastify";

type ImageUploadProps = {
  closeModal: () => void;
  userId: string;
};

const ImageUpload: FC<ImageUploadProps> = ({ closeModal, userId }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (imageFile) {
      const res = await updateImage(userId, imageFile);
      console.log(res);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error("Error al subir la imagen");
      }
      closeModal();
    }
  };

  return (
    <FormImage onSubmit={handleSubmit}>
      <Input type="file" accept="image/*" onChange={handleImageChange} />
      {imagePreview && (
        <PreviewContainer>
          <PreviewImage src={imagePreview} alt="Vista previa" />
        </PreviewContainer>
      )}
      <ButonsContainer>
        <ButtonError type="button" onClick={closeModal}>
          Cancel
        </ButtonError>
        <ButtonSuccess type="submit">Upload</ButtonSuccess>
      </ButonsContainer>
    </FormImage>
  );
};

export default ImageUpload;

const FormImage = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin-bottom: 10px;
`;

const PreviewContainer = styled.div`
  width: 200px;
  height: 200px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-top: 10px;
`;

const ButonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
