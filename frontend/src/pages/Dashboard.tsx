import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return <div>Dashboard</div>;
};

export default Dashboard;
