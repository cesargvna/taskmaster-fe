import { FC, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IconAdd } from "./Icons";

type Order = {
  priority: string;
  category: string;
  fechaVencimiento: string;
};
type OrderProps = {
  setOrder: (order: Order) => void;
  setSearch: (search: string) => void;
  search: string;
};

const TaskFilter: FC<OrderProps> = ({ setOrder, setSearch, search }) => {
  const navigate = useNavigate();

  const [order, setLocalOrder] = useState<Order>({
    priority: "",
    category: "",
    fechaVencimiento: "",
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = { ...order, category: e.target.value };
    setLocalOrder(newOrder);
    setOrder(newOrder);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = { ...order, priority: e.target.value };
    setLocalOrder(newOrder);
    setOrder(newOrder);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOrder = { ...order, fechaVencimiento: e.target.value };
    setLocalOrder(newOrder);
    setOrder(newOrder);
  };

  const handleNewTask = () => {
    navigate("/protected/tasks", { replace: true });
  };
  return (
    <FilterContainer>
      <Search>
        <SearchInput
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
        />
      </Search>

      <SelectInput onChange={handleStatusChange}>
        <option value="all">Status</option>
        <option value="completed">Completed</option>
        <option value="in_progress">En Progreso</option>
        <option value="pending">Pendiente</option>
      </SelectInput>

      <SelectInput value={order.category} onChange={handleCategoryChange}>
        <option value="">Category</option>
        <option value="work">Trabajo</option>
        <option value="personal">Personal</option>
        <option value="student">Estudio</option>
        <option value="other">Otro</option>
      </SelectInput>

      <SelectInput value={order.priority} onChange={handlePriorityChange}>
        <option value="">Priority</option>
        <option value="low">Baja</option>
        <option value="medium">Medio</option>
        <option value="high">Alta</option>
      </SelectInput>

      <DateInput
        value={order.fechaVencimiento}
        type="date"
        onChange={handleDateChange}
      />
      <IconAdd onClick={handleNewTask} />
    </FilterContainer>
  );
};

export default TaskFilter;

const FilterContainer = styled.div`
  width: 100%;
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 5px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchInput = styled.input`
  padding: 5px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  width: 300px;
  background-color: #2d2d2d;
  color: #fff;
  margin-right: 10px;
  outline: none;
`;

const DateInput = styled.input`
  max-width: 200px;
  padding: 5px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #2d2d2d;
  color: #fff;
  margin-right: 10px;
  outline: none;
`;

const SelectInput = styled.select`
  padding: 5px;
  border: none;
  border-radius: 5px;
  background-color: #2d2d2d;
  color: #fff;
  outline: none;
`;
