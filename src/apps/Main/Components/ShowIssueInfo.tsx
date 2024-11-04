import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { IconSave, IconEdit } from "../../Shared/Components/Icons.tsx";
import { ButtonBlank } from "../../Shared/Components/Buttons.ts";
import { updateUser } from "../../../services/user.service.ts";
import { Task } from "../../../models/index.ts";

type ShowIssueInfoProps = {
  task: Task | null;
};

const ShowIssueInfo: FC<ShowIssueInfoProps> = ({ task }) => {
  interface Edit {
    name: boolean;
    description: boolean;
    status: boolean;
  }
  const [isEditing, setIsEditing] = useState<Edit>({
    name: true,
    description: true,
    status: true,
  });

  const handleEdit = (name: keyof Edit) => {
    setIsEditing((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const getApiData = async () => {
    // const { data } = await getTask("" + id);
    // data.data && setTask(data.data);
  };

  const handleSubmit = async (values: Task) => {
    // const response = await updateUser("" + task?.id, values);
    // console.log(response);
  };

  const initialValues: Task = {
    name: task?.name || "",
    description: task?.description || "",
    status: task?.status || "",
  };

  return (
    <Section>
      <SectionContent>
        <ProfileDetails>
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
                  <Input type="name" name="name" disabled={isEditing.name} />
                  <IconEdit onClick={() => handleEdit("name")} />
                  <ButtonBlank type="submit">
                    <IconSave />
                  </ButtonBlank>
                </InputGroup>
                <ErrorMessage name="name" component={ErrorText} />
              </Group>
              <Group>
                <Label>Description</Label>

                <InputGroup>
                  <Input
                    type="textarea"
                    name="description"
                    disabled={isEditing.description}
                  />
                  <IconEdit onClick={() => handleEdit("description")} />
                  <ButtonBlank type="submit">
                    <IconSave />
                  </ButtonBlank>
                </InputGroup>
                <ErrorMessage name="description" component={ErrorText} />
              </Group>
              <Group>
                <Label>State</Label>

                <InputGroup>
                  <Input as="select" name="status" disabled={isEditing.status}>
                    <option value={task?.status}>{task?.status}</option>
                    <option value="do">Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                  </Input>
                  <IconEdit onClick={() => handleEdit("status")} />
                  <ButtonBlank type="submit">
                    <IconSave />
                  </ButtonBlank>
                </InputGroup>
                <ErrorMessage name="status" component={ErrorText} />
              </Group>
            </Form>
          </Formik>
        </ProfileDetails>
      </SectionContent>
    </Section>
  );
};

export default ShowIssueInfo;

const Section = styled.section`
  min-width: 500px;
  display: flex;
  flex-wrap: wrap;
`;

const Name = styled.h4`
  text-align: center;
`;

const SectionContent = styled.section`
  width: 100%;
  color: #000;
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
