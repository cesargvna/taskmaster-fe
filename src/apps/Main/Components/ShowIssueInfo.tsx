import { FC, useState } from "react";
import styled from "styled-components";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { IconSave, IconEdit } from "../../Shared/Components/Icons.tsx";
import { ButtonBlank } from "../../Shared/Components/Buttons.ts";
import { Task } from "../../../models/index.ts";
import { updateTask } from "../../../services/task.service.ts";
import { toast } from "react-toastify";

type ShowIssueInfoProps = {
  task: Task | null;
};

const ShowIssueInfo: FC<ShowIssueInfoProps> = ({ task }) => {
  interface Edit {
    name: boolean;
    description: boolean;
    fechaVencimiento: boolean;
    priority: boolean;
    status: boolean;
    category: boolean;
  }
  const [isEditing, setIsEditing] = useState<Edit>({
    name: true,
    description: true,
    fechaVencimiento: true,
    priority: true,
    status: true,
    category: true,
  });

  const handleEdit = (name: keyof Edit) => {
    setIsEditing((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSubmit = async (values: Task) => {
    try {
      const res = await updateTask("" + task?.id, values);
      console.log(res);
      res.data && toast.success("Task updated successfully");
    } catch (e) {
      toast.error("Error updating task");
    }
  };
  const initialValues: Task = {
    name: task?.name || "",
    description: task?.description || "",
    fechaVencimiento: task?.fechaVencimiento || "",
    priority: task?.priority || "",
    status: task?.status || "",
    category: task?.category || "",
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
            {({ setFieldValue }) => (
              <Form>
                <IssueInfoContainer>
                  <IssueLeft>
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
                      <Label>Description</Label>
                      <InputGroup>
                        <Input
                          as="textarea"
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
                      <Label>Fecha de Vencimiento</Label>
                      <InputGroup>
                        <Input
                          type="date"
                          name="fechaVencimiento"
                          disabled={isEditing.fechaVencimiento}
                        />
                        <IconEdit
                          onClick={() => handleEdit("fechaVencimiento")}
                        />
                        <ButtonBlank type="submit">
                          <IconSave />
                        </ButtonBlank>
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
                          disabled={isEditing.status}
                          onChange={(e) => {
                            setFieldValue("status", e.target.value);
                          }}
                        >
                          <option value="">{task?.status}</option>
                          <option value="pending">Do</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Done</option>
                        </Input>
                        <IconEdit onClick={() => handleEdit("status")} />
                        <ButtonBlank type="submit">
                          <IconSave />
                        </ButtonBlank>
                      </InputGroup>
                      <ErrorMessage name="status" component={ErrorText} />
                    </Group>
                    <Group>
                      <Label>Prioriry</Label>
                      <InputGroup>
                        <Input
                          as="select"
                          name="priority"
                          disabled={isEditing.priority}
                          onChange={(e) => {
                            setFieldValue("priority", e.target.value);
                          }}
                        >
                          <option value="">{task?.priority}</option>
                          <option value="low">Do</option>
                          <option value="medium">In Progress</option>
                          <option value="high">Done</option>
                        </Input>
                        <IconEdit onClick={() => handleEdit("priority")} />
                        <ButtonBlank type="submit">
                          <IconSave />
                        </ButtonBlank>
                      </InputGroup>
                      <ErrorMessage name="priority" component={ErrorText} />
                    </Group>
                    <Group>
                      <Label>Category</Label>
                      <InputGroup>
                        <Input
                          as="select"
                          name="category"
                          disabled={isEditing.category}
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
                        <IconEdit onClick={() => handleEdit("category")} />
                        <ButtonBlank type="submit">
                          <IconSave />
                        </ButtonBlank>
                      </InputGroup>
                      <ErrorMessage name="priority" component={ErrorText} />
                    </Group>
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
