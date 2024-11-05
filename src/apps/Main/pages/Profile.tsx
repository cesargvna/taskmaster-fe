import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ButtonIconCamera from "../../Shared/Components/ButtonIconCamera";
import Modal from "../../Shared/Components/Modal";
import ImageUpload from "../Components/ImageUpload.tsx";
import { IconSave, IconEdit } from "../../Shared/Components/Icons.tsx";
import { ButtonBlank } from "../../Shared/Components/Buttons.ts";
import { getUserByToken, updateUser } from "../../../services/user.service.ts";
import { User } from "../../../models/user.model.ts";
import { toast } from "react-toastify";
// const ImageUrl = import.meta.env.VITE_BACK_URL;
const ImageUrl = "";
type ProfileProps = object;

const Profile: FC<ProfileProps> = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [profile, setProfile] = useState<User | null>(null);

  interface Edit {
    name: boolean;
    email: boolean;
    phone: boolean;
    password: boolean;
  }
  const [isEditing, setIsEditing] = useState<Edit>({
    name: true,
    email: true,
    phone: true,
    password: true,
  });

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleEdit = (name: keyof Edit) => {
    setIsEditing((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const getApiData = async () => {
    const { data } = await getUserByToken();
    data.data && setProfile(data.data);
  };
  useEffect(() => {
    getApiData();
  }, []);

  const handleSubmit = async (values: User) => {
    const { data } = await updateUser("" + profile?.id, values);
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  const initialValues: User = {
    email: profile?.email || "",
    name: profile?.name || "",
    phone: profile?.phone || "",
    password: "",
    image: profile?.image || "",
  };

  return (
    <ProfileContainer>
      <ProfileContent>
        <Section>
          <SectionLeft>
            <ImageContainer src={ImageUrl + profile?.image}>
              <ChangeImageContent onClick={openModal}>
                <ButtonIconCamera />
              </ChangeImageContent>
            </ImageContainer>
            <Name>{initialValues.name}</Name>
            <Modal
              open={isModalOpen}
              onClose={closeModal}
              title="Título del Modal"
            >
              <ImageUpload userId={"" + profile?.id} closeModal={closeModal} />
            </Modal>
          </SectionLeft>
          <SectionRight>
            <ProfileDetails>
              <h2>Profile Details</h2>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                <Form>
                  <Group>
                    <Label>Name</Label>
                    <InputGroup>
                      <Input
                        type="name"
                        name="name"
                        disabled={isEditing.name}
                      />
                      <IconEdit onClick={() => handleEdit("name")} />
                      <ButtonBlank type="submit">
                        <IconSave />
                      </ButtonBlank>
                    </InputGroup>
                    <ErrorMessage name="name" component={ErrorText} />
                  </Group>
                  <Group>
                    <Label>Email</Label>

                    <InputGroup>
                      <Input
                        type="email"
                        name="email"
                        disabled={isEditing.email}
                      />
                      <IconEdit onClick={() => handleEdit("email")} />
                      <ButtonBlank type="submit">
                        <IconSave />
                      </ButtonBlank>
                    </InputGroup>
                    <ErrorMessage name="email" component={ErrorText} />
                  </Group>
                  <Group>
                    <Label>Phone</Label>

                    <InputGroup>
                      <Input
                        type="phone"
                        name="phone"
                        disabled={isEditing.phone}
                      />
                      <IconEdit onClick={() => handleEdit("phone")} />
                      <ButtonBlank type="submit">
                        <IconSave />
                      </ButtonBlank>
                    </InputGroup>

                    <ErrorMessage name="phone" component={ErrorText} />
                  </Group>
                  <Group>
                    <Label>Password</Label>

                    <InputGroup>
                      <Input
                        type="password"
                        name="password"
                        disabled={isEditing.password}
                        placeholder="********"
                      />
                      <IconEdit onClick={() => handleEdit("password")} />
                      <ButtonBlank type="submit">
                        <IconSave />
                      </ButtonBlank>
                    </InputGroup>
                    <ErrorMessage name="email" component={ErrorText} />
                  </Group>
                </Form>
              </Formik>
            </ProfileDetails>
          </SectionRight>
        </Section>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  width: 100vw;
  margin-top: 76px;
`;

const ProfileContent = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  background-color: #f0f0f0;
`;

const SectionLeft = styled.section`
  flex: 1;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Name = styled.h4`
  text-align: center;
`;

const SectionRight = styled.section`
  flex: 2;
  color: #000;
`;

type ImageContainerProps = {
  src: string;
};

const ImageContainer = styled.div<ImageContainerProps>`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto;
  background: ${({ src }) => (src ? `url(${src})` : "#c0c5cf")};
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChangeImageContent = styled.div`
  width: 150px;
  height: 150px;
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    display: none;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    & svg {
      display: block;
    }
  }
`;

const ProfileDetails = styled.div`
  max-width: 500px;
  margin: 0 auto;
  color: #000;
  padding: 20px; /* Ajustado el padding */
`;

const Group = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
const Input = styled(Field)<InputProps>`
  width: 100%;
  padding: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-size: 1.2rem;
  margin-bottom: 10px;
  display: block;
`;

const ErrorText = styled.div`
  color: red;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
