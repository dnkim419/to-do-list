import styled from "styled-components";
import { Categories, customCategoryState, IToDo, toDoState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  margin-top: 20px;
  margin-left: 10px;
  display: flex;
`;

const List = styled.li`
  list-style-type: none;
`;

const Item = styled.span`
  margin-left: 20px;
  font-family: "BMHANNAAir";
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
  opacity: 0.8;
`;

const Button = styled.button`
  margin-left: 15px;
  height: 20px;
  width: 60px;
  border: none;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.bgColor};
  font-family: "BMHANNAAir";
  font-size: 15px;
  border-radius: 10%;
  cursor: pointer;
`;

function ToDo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const customCategories = useRecoilValue(customCategoryState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <Container>
      <List>
        <FontAwesomeIcon
          icon={faSquare}
          size="sm"
          color="#483838"
          opacity="0.8"
        />
        <Item>{text}</Item>
        {category !== Categories.DOING && (
          <Button name={Categories.DOING} onClick={onClick}>
            하는 중
          </Button>
        )}
        {category !== Categories.TO_DO && (
          <Button name={Categories.TO_DO} onClick={onClick}>
            해야함
          </Button>
        )}
        {category !== Categories.DONE && (
          <Button name={Categories.DONE} onClick={onClick}>
            했음
          </Button>
        )}
        {customCategories?.map(
          (customCategory) =>
            category !== customCategory.text && (
              <Button
                key={customCategory.id}
                name={customCategory.text}
                onClick={onClick}
              >
                {customCategory.text}
              </Button>
            )
        )}
      </List>
    </Container>
  );
}

export default ToDo;
