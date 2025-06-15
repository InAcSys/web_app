import "./tabs.css"
import { Tab } from "../../models/tabs/Tab";
import { TabLink } from "./components/tab-link/TabLInk";

interface Props {
  tabs: Array<Tab>;
}

export const Tabs = ({ tabs }: Props) => {
  return (
    <div className="tabs-section-component flex-row-center">
      {tabs && tabs.length > 0 ? (
        tabs.map((tab) => {
          return <TabLink key={tab.label} tab={tab} />;
        })
      ) : (
        <p className="tabs-error">No tabs</p>
      )}
    </div>
  );
};
