import { useSelector } from "react-redux";

const UserProfile = () => {
  const { full_name, email, isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) return <p>Please log in.</p>;

  return (
    <div>
      <h1>Welcome, {full_name}!</h1>
      <p>Email: {email}</p>
    </div>
  );
};
export default UserProfile;
