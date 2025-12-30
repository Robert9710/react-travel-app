import "./Pagination.css";
export default function Pagination(props: {
  totalNumberOfItems: number;
  numberOfItemsPerPage: number;
  pagenum: number;
  setPagenum: (pagenum: number) => void;
}) {
  const numberOfPages = parseInt(
    Math.ceil(props.totalNumberOfItems / props.numberOfItemsPerPage).toString()
  );
  if (props.totalNumberOfItems > props.numberOfItemsPerPage) {
    return (
      <div id="pagination">
        {[...Array(numberOfPages).keys()].map((i) => (
          <button
            className={
              "page-number " + (i + 1 === props.pagenum ? "active" : "")
            }
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
}
