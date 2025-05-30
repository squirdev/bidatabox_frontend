"use client";

import { IconButton, Tooltip, Typography } from "@material-tailwind/react";

import { BsArrowCounterclockwise, BsDownload } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useLanguage } from "../../../context/LanguageProvider";
import { useEffect, useState } from "react";
import { phoneDeleteRow, phoneDetectList } from "../api/service";
import { getSimplifiedDateTime } from "../helper";
import Link from "next/link";
import { useAlert } from "../../../context/alertContext";
import { useRouter } from "next/navigation";
import TableLoading from "../components/tableLoading";
import TableNoData from "../components/tableNoData";
import TablePagination from "../components/tablePagination";

export default function Home() {
  const [detectList, setDetectList] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useLanguage();
  const { showAlert } = useAlert();
  const router = useRouter();

  const fetchDetectList = async () => {
    try {
      setIsLoading(true);
      const result = await phoneDetectList({ pageIndex, pageSize });
      if (result && result.data) {
        setDetectList(result.data);
        setTotalCount(result.total);
      } else {
        showAlert("出了点问题。");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      showAlert("出了点问题。请重试");
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRow = async (row) => {
    const id = row._id;

    const result = await phoneDeleteRow({ id });
    if (result && result.message) {
      showAlert(result.message, "success");
      fetchDetectList();
    } else {
      showAlert("删除失败");
    }
  };

  useEffect(() => {
    fetchDetectList();
  }, [pageIndex, pageSize]);

  if (!t) return <p className="text-white">Loading translations...</p>;
  const TABLE_HEAD = [
    t("taskName"),
    t("fileName"),
    t("screeningTime"),
    t("screeningNumber"),
    t("activatedNumber"),
    t("unregistedNumber"),
    t("operation"),
  ];
  return (
    <div className="w-full h-full bg-white">
      <div className="w-full flex justify-between items-center p-4">
        <Typography variant="h6">{t("statusDetectionList")}</Typography>
        <button
          className="flex items-center gap-2"
          onClick={() => fetchDetectList()}
        >
          <BsArrowCounterclockwise strokeWidth={1.5} />
          <Typography variant="h6">{t("reload")}</Typography>
        </button>
      </div>
      <hr />
      <div className="w-full mt-4 p-4 flex flex-col gap-12">
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <table className="w-full table-auto min-w-max text-left ">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th key={index} className="bg-blue-gray-50/50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between font-bold"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <TableLoading isLoading={isLoading} colSpan={TABLE_HEAD.length} />
              {detectList && detectList.length !== 0
                ? detectList.map((row, index) => {
                    return (
                      <tr key={index}>
                        {[
                          { key: "taskname", color: "blue-gray", bold: false },
                          {
                            key: "fileurl",
                            color: "blue-gray",
                            bold: false,
                            fallback: "处理中...",
                          },
                          {
                            key: "createdAt",
                            color: "blue-gray",
                            bold: false,
                            format: getSimplifiedDateTime,
                          },
                          {
                            key: "entirenumber",
                            color: "blue-gray",
                            bold: false,
                          },
                          {
                            key: "activenumber",
                            color: "red",
                            bold: true,
                            fallback: "处理中...",
                          },
                          {
                            key: "unregisternumber",
                            color: "red",
                            bold: true,
                            fallback: "处理中...",
                          },
                        ].map(({ key, color, bold, fallback, format }) => (
                          <td key={key}>
                            <Typography
                              variant="small"
                              color={color}
                              className={`p-4 ${bold ? "font-bold" : "font-normal"}`}
                            >
                              {format
                                ? format(row[key])
                                : (row[key] ?? fallback)}
                            </Typography>
                          </td>
                        ))}
                        <td>
                          <Tooltip content="Download File">
                            <IconButton
                              disabled={!row.activenumber}
                              variant="text"
                            >
                              <Link
                                href={`${process.env.NEXT_PUBLIC_DOWNLOAD_URL}/${row.fileurl}`}
                              >
                                <BsDownload
                                  strokeWidth={1.2}
                                  className="h-4 w-4 text-green-700"
                                />
                              </Link>
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Delete File">
                            <IconButton
                              variant="text"
                              onClick={() => handleDeleteRow(row)}
                            >
                              <AiFillDelete
                                strokeWidth={1.2}
                                className="h-4 w-4 text-gray/700"
                              />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })
                : !isLoading && <TableNoData colSpan={TABLE_HEAD.length} />}
            </tbody>
          </table>
        </div>
        <TablePagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalCount={totalCount}
          setPageIndex={setPageIndex}
        />
      </div>
    </div>
  );
}
