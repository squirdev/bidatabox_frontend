import Image from "next/image";
import { useLanguage } from "../../../context/LanguageProvider";

const TableNoData = ({ colSpan }) => {
  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;
  return (
    <tr>
      <td colSpan={colSpan} className="py-6 text-center">
        <div className="flex flex-col justify-center items-center gap-2 text-md0 text-gray-600">
          <Image src={"/nodata.jpg"} width={120} height={120} alt="No Data" />
          {t("noDataAvailable")}
        </div>
      </td>
    </tr>
  );
};

export default TableNoData;
