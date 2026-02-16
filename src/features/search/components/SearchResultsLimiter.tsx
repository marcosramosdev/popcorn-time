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
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>Show</span>
      <select
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="rounded-md border border-input bg-background px-2 py-1 text-sm text-foreground shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span>per page</span>
    </div>
  );
}

export default SearchResultsLimiter;
