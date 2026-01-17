import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to BookNook 📚</h1>

      {user ? (
        <p>
          Logged in as <strong>{user.username}</strong>. Go to your{" "}
          <Link to="/shelves">Shelves</Link> or <Link to="/community">Community</Link>.
        </p>
      ) : (
        <>
          <p>Please <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to get started.</p>
        </>
      )}
    </div>
  );
}
