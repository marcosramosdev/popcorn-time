type Props = {
  page: number;
  totalPages: number;
};

function PageNumbers({ page, totalPages }: Props) {
  return (
    <span className="inline-flex items-center text-sm font-medium text-muted-foreground">
      Page{" "}
      <span className="mx-1 text-foreground">{page}</span>
      {totalPages > 0 && (
        <>
          of{" "}
          <span className="ml-1 text-foreground">{totalPages}</span>
        </>
      )}
    </span>
  );
}

export default PageNumbers;
