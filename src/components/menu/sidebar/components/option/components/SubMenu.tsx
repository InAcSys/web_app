import { Category } from "../../../../../../models/menu/Menu";
import { SubOption } from "./SubOption";
import "./sub-menu.css";

interface Props {
  title: string;
  path: string;
  categories: Array<Category> | undefined;
}

export const SubMenu = ({ title, path, categories }: Props) => {
  return (
    <div className="sub-menu-container">
      <h3 className="sub-menu-title">{title}</h3>
      <div className="sub-menu-options-container">
        {categories?.map((subCategory) => {
          return (
            <SubOption
              key={`sub-category-${subCategory.id}`}
              label={subCategory.name}
              path={`${path}${subCategory.path}`}
            />
          );
        })}
      </div>
    </div>
  );
};
