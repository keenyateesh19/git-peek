import { FaGithubAlt } from "react-icons/fa";
import type { GithubUser } from "../types";

const ProfileCard = ({ user }: { user: GithubUser }) => {
  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={user.name} className="avatar" />
      <div>
        <h2>{user.name}</h2>
        <code className="username">{user.login}</code>
        <p className="bio">{user.bio}</p>
      </div>
      <a
        href={user.html_url}
        className="profile-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithubAlt />
        View Profile
      </a>
    </div>
  );
};

export default ProfileCard;
