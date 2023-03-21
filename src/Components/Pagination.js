import styles from "./styles.module.css";

const Pagination = ({ page, total, limit, setPage, data, isLoading }) => {
  const totalPages = Math.ceil(total / limit);

  const nextPage = () => {
    if (page != data.total_pages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page != 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="mt-4">
      <h1>
        Showing {data.page} of {data.total_pages} page
      </h1>
      <div className="inline-flex mb-4">
        <button
          onClick={() => prevPage()}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          disabled={isLoading}
        >
          Prev
        </button>
        <button
          onClick={() => nextPage()}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          disabled={isLoading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
