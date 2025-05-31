import { Delete, Search } from "lucide-react";
import "./search-bar.css"

interface Props {
  searchValue: string;
  setSearchValue: (value: string) => void;
  search: () => void;
  hasRecommendations?: boolean;
}

export const SearchBar = ({
  searchValue,
  setSearchValue,
  search,
  hasRecommendations = false,
}: Props) => {
  const handleClean = () => {
    setSearchValue("");
  };

  return (
    <div className="search-bar-container flex-row-center">
      <input
        type="text"
        name="search-bar-component"
        id="search-bar-component"
        className="search-bar-input"
        placeholder="Buscar..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue && (
        <button className="search-bar-delete-button flex-column-center" onClick={handleClean}>
          <Delete />
        </button>
      )}
      <button className="search-bar-button flex-column-center" onClick={search}>
        <Search />
      </button>
    </div>
  );
};
