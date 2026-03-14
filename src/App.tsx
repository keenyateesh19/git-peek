import { FaGithubAlt } from "react-icons/fa";
import UserSearch from "./components/UserSearch";

const App = () => {
  return (
    <div className="container">
      <h1 className="title"><FaGithubAlt />Git Peek</h1>
      <UserSearch />
    </div>
  );
};

export default App;
