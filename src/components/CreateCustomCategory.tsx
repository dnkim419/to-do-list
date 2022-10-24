import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { customCategoryState } from "../atoms";

const InputCustomCategory = styled.input`
  margin-top: 20px;
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
  font-family: "BMHANNAAir";
  font-size: 18px;
  border-radius: 10%;
  cursor: pointer;
`;

interface IForm {
  customCategory: string;
}

function CreateCustomCategory() {
  const setCustomCategory = useSetRecoilState(customCategoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ customCategory }: IForm) => {
    setCustomCategory((oldCustomCategories) => [
      { text: customCategory, id: Date.now() },
      ...oldCustomCategories,
    ]);
    setValue("customCategory", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <InputCustomCategory
        {...register("customCategory", {
          required: "Write Custom Category here.",
        })}
        placeholder="나만의 카테고리를 만들어보세요"
      />
      <Button>추가</Button>
    </form>
  );
}

export default CreateCustomCategory;
