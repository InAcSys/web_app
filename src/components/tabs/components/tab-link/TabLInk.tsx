import "./tab-link.css";
import { useNavigate } from "react-router";
import { Tab } from "../../../../models/tabs/Tab";

interface Props {
  tab: Tab;
}

export const TabLink = ({ tab }: Props) => {
  const navigate = useNavigate();

  const handleGo = () => {
    navigate(tab.path);
  };

  return (
    <button className="tab-link-component" onClick={handleGo}>
      {tab.label}
    </button>
  );
};
