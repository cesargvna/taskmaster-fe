import { FC, useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import Avatar from "../../Shared/Components/Avatar";
import { IconDelete } from "../../Shared/Components/Icons";
import Modal from "../../Shared/Components/Modal";
import ShowIssueInfo from "../Components/ShowIssueInfo";
import { toast } from "react-toastify";
import {
  getTasks,
  createTask,
  deleteTask,
  sortTasks,
} from "../../../services/task.service";
import TaskFilter from "../../Shared/Components/TaskFilter";

type Order = {
  priority: string;
  category: string;
  fechaVencimiento: string;
};

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
  const [search, setSearch] = useState<string>("");
  const [order, setOrder] = useState<Order>({
    priority: "",
    category: "",
    fechaVencimiento: "",
  });

  const handleClickCard = (issue: Task) => {
    issue && setTask(issue);
    setOpen(!open);
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

  const handleClickDelete = async (id: string) => {
    try {
      const res = await deleteTask(id);
      if (res.data.success) {
        toast.success(res.data.message);
        getIssues();
      }
    } catch (error) {
      toast.error("Error al eliminar la tarea");
    }
  };

  const sortedTasks = async () => {
    try {
      const { data } = await sortTasks(order);
      data.data && setIssues(data.data);
    } catch (error) {
      toast.error("No se encontraron tareas con esos criterios.");
      setOrder({ priority: "", category: "", fechaVencimiento: "" });
    }
  };

  const searchTasks = async () => {
    issues &&
      setIssues(
        issues.filter((task) => task.name.toLowerCase().includes(search)),
      );
  };

  useEffect(() => {
    if (order.priority || order.category || order.fechaVencimiento) {
      sortedTasks();
    } else if (search) {
      searchTasks();
    } else {
      getIssues();
    }
  }, [search, order.category, order.priority, order.fechaVencimiento]);

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
          <MiniButtonCancel onClick={() => setIsCreate(!isCreate)}>
            Cancel
          </MiniButtonCancel>
          <MiniButtonCreate onClick={handleCreateIssue}>
            Create
          </MiniButtonCreate>
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
        <TaskFilter setOrder={setOrder} setSearch={setSearch} search={search} />
      </DashboardHeader>
      <TableContainer>
        <Column>
          <TaskList>
            <h2>DO</h2>
            {issues &&
              issues.map((issue) => {
                return issue.status === "pending" ? (
                  <Card key={issue.id} onClick={() => handleClickCard(issue)}>
                    <CardContent>
                      <IssueName> {issue.name}</IssueName>
                      <IssueOptions>
                        <IconDelete
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            handleClickDelete("" + issue.id);
                          }}
                        />
                        <Avatar
                          size={20}
                          name="Juan Perez"
                          handleClick={() => console.log("")}
                        />
                      </IssueOptions>
                    </CardContent>
                  </Card>
                ) : null;
              })}
            {isCreate ? CardAdd : CardCreate}
          </TaskList>
        </Column>
        <Column>
          <TaskList>
            <h2>IN PROGRESS</h2>
            {issues &&
              issues.map((issue) => {
                return issue.status === "in_progress" ? (
                  <Card key={issue.id} onClick={() => handleClickCard(issue)}>
                    <CardContent>
                      <IssueName> {issue.name}</IssueName>
                      <IssueOptions>
                        <IconDelete
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            handleClickDelete("" + issue?.id);
                          }}
                        />
                        <Avatar
                          size={20}
                          name="Juan Perez"
                          handleClick={() => console.log("")}
                        />
                      </IssueOptions>
                    </CardContent>
                  </Card>
                ) : null;
              })}
          </TaskList>
        </Column>
        <Column>
          <TaskList>
            <h2>DONE</h2>
            {issues &&
              issues.map((issue) => {
                return issue.status === "completed" ? (
                  <Card key={issue.id} onClick={() => handleClickCard(issue)}>
                    <CardContent>
                      <IssueName> {issue.name}</IssueName>
                      <IssueOptions>
                        <IconDelete
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            handleClickDelete("" + issue.id);
                          }}
                        />
                        <Avatar
                          size={20}
                          name="Juan Perez"
                          handleClick={() => console.log("")}
                        />
                      </IssueOptions>
                    </CardContent>
                  </Card>
                ) : null;
              })}
          </TaskList>
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
  margin-top: 70px;
  width: 100vw;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
`;

const DashboardHeader = styled.div`
  width: 90%;
  margin: 0 auto;
  position: sticky;
  top: 0;
  z-index: 0;
  padding: 10px 0;
`;

const TableContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  padding: 10px;
  flex-grow: 1;
`;

const Column = styled.div`
  width: 100%;
  min-width: 300px;
  border-radius: 5px;

  /* Título de la columna (estático) */
  h2 {
    position: sticky;
    background-color: #f9f9f9;
    border-radius: 5px;
    top: 0;
    padding: 10px;
    width: 100%;
    text-align: center;
    z-index: 5;
  }
`;

const TaskList = styled.div`
  width: 100%;
  max-height: 450px; /* Ajusta esta altura según sea necesario */

  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px; /* Ancho del scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #e0e0e0; /* Color del fondo del track */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #00c4cc; /* Color de la barra */
    border-radius: 10px;
    border: 2px solid #e0e0e0; /* Espacio entre la barra y el track */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #009fa8; /* Color cuando se pasa el cursor por la barra */
  }
`;

const Card = styled.div`
  margin-top: 10px;
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

const MiniButtonCancel = styled.button`
  border: none;
  border-radius: 5px;
  padding: 5px;
  background-color: #e57373;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #c62828;
  }
`;
const MiniButtonCreate = styled.button`
  border: none;
  border-radius: 5px;
  padding: 5px;
  background-color: #00c4cc;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #009fa8;
  }
`;
