type Props = {
  page: number;
  totalPages: number;
};

function PageNumbers({ page, totalPages }: Props) {
  return (
    <div>
      <p>
        Page {page}
        {totalPages ? ` of ${totalPages}` : ""}
      </p>
    </div>
  );
}

export default PageNumbers;
