import { FC, useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Avatar from "../../Shared/Components/Avatar";
import { IconDelete } from "../../Shared/Components/Icons";
import Modal from "../../Shared/Components/Modal";
import ShowIssueInfo from "../Components/ShowIssueInfo";
import { getTasks, createTask } from "../../../services/task.service";

type NavbarProps = object;
interface Task {
  id?: string;
  name: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

const Dashboard: FC<NavbarProps> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [task, setTask] = useState<Task | null>(null);
  const [issues, setIssues] = useState<Task[]>([]);
  const [dataNewTask, setDataNewTask] = useState<Task | null>(null);

  const handleClickCard = (issue: Task) => {
    issue && setTask(issue);
    setOpen(!open);
  };

  const handleAvatarClick = () => {
    console.log("Avatar clicked");
  };

  const handleCreateIssue = async () => {
    dataNewTask && (await createTask(dataNewTask));
    getIssues();
    setIsCreate(!isCreate);
    setDataNewTask({ name: "" });
  };
  const getIssues = async () => {
    const { data } = await getTasks();
    data.data && setIssues(data.data);
  };

  useEffect(() => {
    getIssues();
  }, []);
  console.log(issues);
  const CardAdd = (
    <Card>
      <CardCreateContent>
        <Input
          type="text"
          placeholder="Issue Name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDataNewTask({ name: e.target.value })
          }
        />
        <ButonGroup>
          <MiniButton color="red" onClick={() => setIsCreate(!isCreate)}>
            Cancel
          </MiniButton>
          <MiniButton color="blue" onClick={handleCreateIssue}>
            Create
          </MiniButton>
        </ButonGroup>
      </CardCreateContent>
    </Card>
  );
  const CardCreate = (
    <Card onClick={() => setIsCreate(!isCreate)}>
      <AddIssue>+ Create Issue</AddIssue>
    </Card>
  );
  return (
    <DashboardContainer>
      <DashboardHeader>
        <h2>Dashboard</h2>
      </DashboardHeader>
      <TableContainer>
        <Column>
          <h2>TO DO</h2>
          {issues &&
            issues.map((issue) => {
              return issue.status === "do" ? (
                <Card key={issue.id} onClick={() => handleClickCard(issue)}>
                  <CardContent>
                    <IssueName> {issue.name}</IssueName>
                    <IssueOptions>
                      <IconDelete
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                        }}
                      />
                      <Avatar
                        size={20}
                        name="Juan Perez"
                        handleClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          handleAvatarClick();
                        }}
                      />
                    </IssueOptions>
                  </CardContent>
                </Card>
              ) : null;
            })}
          {isCreate ? CardAdd : CardCreate}
        </Column>
        <Column>
          <h2>IN PROGRESS</h2>
          {issues &&
            issues.map((issue) => {
              return issue.status === "in-progress" ? (
                <Card key={issue.id} onClick={() => handleClickCard(issue)}>
                  <CardContent>
                    <IssueName> {issue.name}</IssueName>
                    <IssueOptions>
                      <IconDelete
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                        }}
                      />
                      <Avatar
                        size={20}
                        name="Juan Perez"
                        handleClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          handleAvatarClick();
                        }}
                      />
                    </IssueOptions>
                  </CardContent>
                </Card>
              ) : null;
            })}
        </Column>
        <Column>
          <h2>DONE</h2>
          {issues &&
            issues.map((issue) => {
              return issue.status === "done" ? (
                <Card key={issue.id} onClick={() => handleClickCard(issue)}>
                  <CardContent>
                    <IssueName> {issue.name}</IssueName>
                    <IssueOptions>
                      <IconDelete
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                        }}
                      />
                      <Avatar
                        size={20}
                        name="Juan Perez"
                        handleClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          handleAvatarClick();
                        }}
                      />
                    </IssueOptions>
                  </CardContent>
                </Card>
              ) : null;
            })}
        </Column>
      </TableContainer>
      <Modal title="Issue Info" open={open} onClose={() => setOpen(!open)}>
        <ShowIssueInfo task={task} />
      </Modal>
    </DashboardContainer>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
  width: 100vw;
`;

const DashboardHeader = styled.div`
  width: 100%;
  margin-top: 80px;
`;

const TableContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  padding: 5px;
  cursor: pointer;
`;

const Column = styled.div`
  width: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 10px;
  border-radius: 5px;
`;

const Card = styled.div`
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.8);

  &:hover {
    background-color: #e8e8e8;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const CardContent = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const IssueName = styled.p`
  font-size: 1rem;
  font-weight: 400;
`;

const IssueOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const AddIssue = styled.span`
  font-size: 1rem;
  display: flex;
  justify-content: center;
`;

const CardCreateContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ButonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #000;
  border-radius: 5px;
`;

const MiniButton = styled.button<{ color: string }>`
  border: none;
  border-radius: 5px;
  background-color: ${({ color }) => color};
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #000;
  }
`;
