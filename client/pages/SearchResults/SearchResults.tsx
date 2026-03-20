import { useNavigate, useSearchParams } from "react-router";
import SearchResultsList from "../../components/SearchResultsList/SearchResultsList";

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  if (!query) {
    navigate("/");
  } else
    return (
      <div id="search-results" className="row">
        <div className="col-3"></div>
        <div className="col-9">
          <SearchResultsList query={query} />
        </div>
      </div>
    );
}
