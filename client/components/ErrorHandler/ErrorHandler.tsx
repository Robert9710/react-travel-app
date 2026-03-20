import { useNavigate } from "react-router";

export default function ErrorHandler(error: { error: object }) {
  const navigate = useNavigate();
  if (error) {
    navigate("/error");
  }
  return null;
}
