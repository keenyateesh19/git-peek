import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import { fetchGithubUser, searchGithubUser } from "../api/github";
import RecentSearch from "./RecentSearch";
import { useDebounce } from "use-debounce";
import type { GithubUser } from "../types";
import SuggestionDropdown from "./SuggestionDropdown";

const UserSearch = () => {
  const [username, setUsername] = useState("");
  const [submittedUsername, setSubmittedUsername] = useState("");
  const [recentUsers, setRecentUsers] = useState<string[]>(() => {
    const recentUsers = localStorage.getItem("recentUsers");
    return recentUsers ? JSON.parse(recentUsers) : [];
  });
  const [debouncedUsername] = useDebounce(username, 300);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users", submittedUsername],
    queryFn: () => fetchGithubUser(submittedUsername),
    enabled: !!submittedUsername,
  });

  const { data: suggestions } = useQuery({
    queryKey: ["github-user-suggestions", debouncedUsername],
    queryFn: () => searchGithubUser(debouncedUsername),
    enabled: debouncedUsername.length > 1,
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;
    setSubmittedUsername(username.trim());

    setRecentUsers((prev) => {
      const updated = [trimmed, ...prev.filter((u) => u !== trimmed)];
      return updated.slice(0, 5);
    });
    setUsername("");
  };

  const onSelect = (user: string) => {
    setUsername(user);
    setSubmittedUsername(user);
  };

  const onSuggest = (user: GithubUser) => {
    setUsername(user.login);
    setShowSuggestions(false);

    if (submittedUsername !== user.login) {
      setSubmittedUsername(user.login);
    } else {
      refetch();
    }

    setRecentUsers((prev) => {
      const updated = [user.login, ...prev.filter((u) => u !== user.login)];
      return updated.slice(0, 5);
    });
  };

  useEffect(() => {
    localStorage.setItem("recentUsers", JSON.stringify(recentUsers));
  }, [recentUsers]);

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="dropdown-wrapper">
          <input
            type="text"
            placeholder="Enter Github Username..."
            value={username}
            onChange={(e) => {
              const val = e.target.value;
              setUsername(val);
              setShowSuggestions(val.trim().length > 1);
            }}
          />

          {showSuggestions && suggestions?.length > 0 && (
            <SuggestionDropdown
              onSelect={onSuggest}
              suggestions={suggestions}
            />
          )}
        </div>
        <button type="submit">Search</button>
      </form>

      {isLoading && <p className="status">Loading...</p>}
      {isError && <p className="status error">{error.message}</p>}

      {data && <ProfileCard user={data} />}

      {recentUsers.length > 0 && (
        <RecentSearch recentUsers={recentUsers} onSelect={onSelect} />
      )}
    </>
  );
};

export default UserSearch;
