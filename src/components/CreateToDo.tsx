import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

const InputCustomCategory = styled.input`
  margin-left: 10px;
  height: 50px;
  width: 300px;
  border-top: none;
  border-left: none;
  border-right: none;
  font-size: 16px;
  background-color: transparent;
  border-bottom: 2px solid ${(props) => props.theme.cardBgColor};
  opacity: 0.6;
`;

const Button = styled.button`
  margin-left: 15px;
  height: 30px;
  width: 50px;
  border: none;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.bgColor};
  font-size: 15px;
  border-radius: 10%;
  cursor: pointer;
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <InputCustomCategory
        {...register("toDo", {
          required: "Write To Do here.",
        })}
        placeholder="Write a to do"
      />
      <Button>Add</Button>
    </form>
  );
}

export default CreateToDo;
