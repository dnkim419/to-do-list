import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Categories,
  categoryState,
  customCategoryState,
  toDoSelector,
} from "../atoms";
import CreateCustomCategory from "./CreateCustomCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Select = styled.select`
  margin-top: 40px;
  margin-left: 10px;
  height: 20px;
  width: 100px;
  background-color: transparent;
  color: ${(props) => props.theme.cardBgColor};
  border: none;
`;

const Option = styled.option`
  background-color: ${(props) => props.theme.bgColor};
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const customCategories = useRecoilValue(customCategoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as Categories);
  };
  return (
    <Container>
      <Header>
        <Title>To Dos</Title>
      </Header>
      <Section>
        <CreateCustomCategory />
      </Section>
      <Section>
        <Select value={category} onInput={onInput}>
          <Option value={Categories.TO_DO}>To Do</Option>
          <Option value={Categories.DOING}>Doing</Option>
          <Option value={Categories.DONE}>Done</Option>
          {customCategories?.map((category) => (
            <Option key={category.id} value={category.text}>
              {category.text}
            </Option>
          ))}
        </Select>
        <CreateToDo />
      </Section>
      <Section>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Section>
    </Container>
  );
}

export default ToDoList;
