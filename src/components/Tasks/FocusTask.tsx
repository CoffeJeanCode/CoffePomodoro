import { useRecoilState } from "recoil";
import { currentTask } from "../../state";

const FocusTask = () => {
  const [currentWork] = useRecoilState(currentTask);
  console.log(currentWork);
  return <>{currentWork.title}</>;
};

export default FocusTask;
