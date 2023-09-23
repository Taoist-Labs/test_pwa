import { useNavigate } from "react-router-dom";
import useSubcribe from "../hooks/useSubscribe";

export default function EventHandler() {
  const navigate = useNavigate();
  useSubcribe("link-event", () => {
    navigate("/message");
  });
  return <></>;
}
