"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  BsChevronDown,
  BsFillShareFill,
  BsFillGridFill,
  BsPhoneFill,
} from "react-icons/bs";

import { useLanguage } from "../../../context/LanguageProvider";

const SideBar = ({ sidebarShow }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    if (
      ["/telegram", "/whatsapp", "/daydetectlist"].some((path) =>
        pathname.includes(path)
      )
    ) {
      setOpen(1);
    } else if (pathname.includes("/numbergenerate")) {
      setOpen(2);
    } else if (pathname.includes("/detectlist")) {
      setOpen(0);
    }
  }, [pathname]);

  const { t } = useLanguage();
  if (!t) return <p className="text-white">Loading translations...</p>;

  const sideBarItem = [
    {
      title: t("activeDetection"),
      icon: BsFillShareFill,
      detail: [
        {
          subTitle: t("addDetection"),
          url: "/",
        },
        {
          subTitle: t("detectionList"),
          url: "/detectlist",
        },
      ],
    },
    {
      title: t("daysDetection"),
      icon: BsFillGridFill,
      detail: [
        {
          subTitle: t("addTGDaysDetection"),
          url: "/telegram",
        },
        {
          subTitle: t("addWSDaysDetection"),
          url: "/whatsapp",
        },
        {
          subTitle: t("daysDetectionList"),
          url: "/daydetectlist",
        },
      ],
    },
    {
      title: t("numberArchiving"),
      icon: BsPhoneFill,
      detail: [
        {
          subTitle: t("numberGeneration"),
          url: "/numbergenerate",
        },
      ],
    },
    {
      title: t("reward"),
      icon: BsPhoneFill,
      detail: [
        {
          subTitle: t("reward"),
          url: "/reward",
        },
      ],
    },
    {
      title: t("numberCompare"),
      icon: BsPhoneFill,
      detail: [
        {
          subTitle: t("numberCompare"),
          url: "/compare",
        },
      ],
    },
  ];
  return (
    <div className="flex">
      <Card
        className={`h-screen max-w-[16rem] transform transition-all duration-500 ease-in-out overflow-hidden rounded-none shadow-md shadow-gray-500  ${sidebarShow ? "w-64" : "w-0"}`}
      >
        <div className="flex justify-center items-center h-20 py-3 bg-gray-200">
          <Image src={"/logo.png"} width={150} height={20} alt="logo" />
        </div>
        <List className="p-0 mt-4 text-sm">
          {sideBarItem.map((sideItem, index) => (
            <Accordion
              key={index}
              className="bg-gray-100"
              open={open === index}
              icon={
                <BsChevronDown
                  strokeWidth={1}
                  className={`mx-auto h-3 w-3 transition-transform ${open === index ? "rotate-180" : ""}`}
                />
              }
            >
              <ListItem className="p-0 rounded-none" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(index)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <sideItem.icon className="h-4 w-4 text-black" />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="mr-auto font-bold"
                  >
                    {sideItem.title}
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  {sideItem.detail.map((subItem, index) => (
                    <Link key={index} href={subItem.url}>
                      <ListItem className="rounded-none text-sm font-bold px-8">
                        {subItem.subTitle}
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </AccordionBody>
            </Accordion>
          ))}
        </List>
      </Card>
    </div>
  );
};

export default SideBar;
