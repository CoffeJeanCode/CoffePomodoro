import { useRecoilState } from "recoil";
import { currentTask } from "../../state";

const FocusTask = () => {
  const [currentWork] = useRecoilState(currentTask);
  return <>{currentWork.title}</>;
};

export default FocusTask;
