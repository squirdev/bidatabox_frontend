import { Button, Typography } from "@material-tailwind/react";
import { useLanguage } from "../../../context/LanguageProvider";

const TablePagination = ({ pageIndex, pageSize, totalCount, setPageIndex }) => {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
      <Typography variant="small" color="blue-gray" className="font-normal">
        Page {pageIndex + 1} of {Math.ceil(totalCount / pageSize)} ({" "}
        {totalCount} )
      </Typography>
      <div className="flex gap-2">
        <Button
          variant="outlined"
          disabled={pageIndex <= 0}
          size="sm"
          onClick={() => {
            if (pageIndex > 0) setPageIndex((curIndex) => curIndex - 1);
          }}
        >
          {t("previous")}
        </Button>
        <Button
          variant="outlined"
          disabled={pageIndex >= Math.ceil(totalCount / pageSize) - 1}
          size="sm"
          onClick={() => {
            if (pageIndex < Math.ceil(totalCount / pageSize) - 1)
              setPageIndex((curIndex) => curIndex + 1);
          }}
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
