type SearchResultsLimiterProps = {
  value: number;
  options?: number[];
  onChange: (limit: number) => void;
};

function SearchResultsLimiter({
  value,
  options = [5, 10, 20],
  onChange,
}: SearchResultsLimiterProps) {
  return (
    <>
      <label>
        Show
        <select
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        movies per page
      </label>
    </>
  );
}

export default SearchResultsLimiter;
