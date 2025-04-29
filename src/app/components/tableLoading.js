import { useLanguage } from "../../../context/LanguageProvider";

const TableLoading = ({ isLoading, colSpan }) => {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    isLoading && (
      <tr>
        <td colSpan={colSpan} className="py-6 text-center">
          <div className="flex justify-center items-center gap-2 text-md0 text-gray-600">
            <span className="animate-spin h-5 w-5 border-2 border-t-transparent rounded-full" />
            {t("loading")}
          </div>
        </td>
      </tr>
    )
  );
};

export default TableLoading;
