import { FC, useState } from "react";
import styled from "styled-components";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { IconSave, IconEdit } from "../../Shared/Components/Icons.tsx";
import { ButtonBlank } from "../../Shared/Components/Buttons.ts";
import { Task } from "../../../models/index.ts";
import { updateTask } from "../../../services/task.service.ts";
import { Icons, toast } from "react-toastify";

type ShowIssueInfoProps = {
  task: Task | null;
};

const ShowIssueInfo: FC<ShowIssueInfoProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState<boolean>(true);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (values: Task) => {
    const formatValues = {
      ...values,
      description: values.description ? values.description : null,
      fechaVencimiento: values.fechaVencimiento
        ? values.fechaVencimiento
        : null,
    };
    console.log(formatValues);
    try {
      const res = await updateTask("" + task?.id, formatValues);
      res.data && toast.success("Task updated successfully");
    } catch (e) {
      toast.error("Error updating task");
    } finally {
      handleEdit();
    }
  };
  const initialValues: Task = {
    name: task?.name || "",
    description: task?.description || "",
    fechaVencimiento:
      task?.fechaVencimiento || new Date().toISOString().slice(0, 10),
    priority: task?.priority || "",
    status: task?.status || "",
    category: task?.category || "",
  };
  console.log(initialValues);
  return (
    <Section>
      <SectionContent>
        <ProfileDetails>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log(values);
              handleSubmit(values);
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <IssueInfoContainer>
                  <IssueLeft>
                    <Group>
                      <Label>Name</Label>
                      <InputGroup>
                        <Input type="text" name="name" disabled={isEditing} />
                      </InputGroup>
                      <ErrorMessage name="name" component={ErrorText} />
                    </Group>
                    <Group>
                      <Label>Description</Label>
                      <InputGroup>
                        <Input
                          type="text"
                          name="description"
                          disabled={isEditing}
                        />
                      </InputGroup>
                      <ErrorMessage name="description" component={ErrorText} />
                    </Group>
                    <Group>
                      <Label>Fecha de Vencimiento</Label>
                      <InputGroup>
                        <Input
                          type="date"
                          name="fechaVencimiento"
                          disabled={isEditing}
                          pattern="yyyy-mm-dd"
                        />
                      </InputGroup>
                      <ErrorMessage
                        name="fechaVencimiento"
                        component={ErrorText}
                      />
                    </Group>
                  </IssueLeft>
                  <IssueRight>
                    <Group>
                      <Label>State</Label>
                      <InputGroup>
                        <Input
                          as="select"
                          name="status"
                          disabled={isEditing}
                          onChange={(e) => {
                            setFieldValue("status", e.target.value);
                          }}
                        >
                          <option value="">{task?.status}</option>
                          <option value="pending">Do</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Done</option>
                        </Input>
                      </InputGroup>
                      <ErrorMessage name="status" component={ErrorText} />
                    </Group>
                    <Group>
                      <Label>Prioriry</Label>
                      <InputGroup>
                        <Input
                          as="select"
                          name="priority"
                          disabled={isEditing}
                          onChange={(e) => {
                            setFieldValue("priority", e.target.value);
                          }}
                        >
                          <option value="">{task?.priority}</option>
                          <option value="low">Baja</option>
                          <option value="medium">Media</option>
                          <option value="high">Alta</option>
                        </Input>
                      </InputGroup>
                      <ErrorMessage name="priority" component={ErrorText} />
                    </Group>
                    <Group>
                      <Label>Category</Label>
                      <InputGroup>
                        <Input
                          as="select"
                          name="category"
                          disabled={isEditing}
                          onChange={(e) => {
                            setFieldValue("category", e.target.value);
                          }}
                        >
                          <option value="">{task?.category}</option>
                          <option value="personal">Personal</option>
                          <option value="work">Trabajo</option>
                          <option value="student">Estudio</option>
                          <option value="other">Otros</option>
                        </Input>
                      </InputGroup>
                      <ErrorMessage name="priority" component={ErrorText} />
                    </Group>
                    <Iconscontent>
                      {isEditing ? (
                        <IconEdit onClick={handleEdit} />
                      ) : (
                        <ButtonBlank type="submit">
                          <IconSave />
                        </ButtonBlank>
                      )}
                    </Iconscontent>
                  </IssueRight>
                </IssueInfoContainer>
              </Form>
            )}
          </Formik>
        </ProfileDetails>
      </SectionContent>
    </Section>
  );
};

export default ShowIssueInfo;

const Iconscontent = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Section = styled.section`
  width: 700px;
  display: flex;
  flex-wrap: wrap;
`;

const SectionContent = styled.section`
  width: 100%;
  color: #000;
`;

const ProfileDetails = styled.div`
  margin: 0 auto;
  color: #000;
  padding: 20px; /* Ajustado el padding */
`;

const IssueInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
`;
const IssueRight = styled.div`
  flex: 1;
`;

const IssueLeft = styled.div`
  flex: 1;
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
