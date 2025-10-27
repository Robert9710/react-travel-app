// @ts-ignore
import "./Pagination.css";
// @ts-ignore
export default function Pagination(props) {
  const numberOfPages = parseInt(
    Math.ceil(props.totalNumberOfItems / props.numberOfItemsPerPage).toString()
  );
  return (
    <div id="pagination">
      {[...Array(numberOfPages).keys()].map((i) => (
        <button
          className={"page-number " + (i + 1 === props.pagenum ? "active" : "")}
          key={i}
          onClick={() => {
            props.setPagenum(i + 1);
          }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
