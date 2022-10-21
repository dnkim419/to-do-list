import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { customCategoryState } from "../atoms";

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
      <input
        {...register("customCategory", {
          required: "Write Custom Category here.",
        })}
        placeholder="Make your own category."
      />
      <button>Add</button>
    </form>
  );
}

export default CreateCustomCategory;
