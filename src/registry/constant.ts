export const BASE = "";
export const ICONS_DIR = "/neo-assets/icons";
export const IMAGES_DIR = "/neo-assets/images";

export type Menu = {
  name: string;
  link: string;
  icon: string;
  iconActive: string;
  isPath?: boolean;
  submenu?: Menu[];
  status?: boolean;
};

export const APP_MODULES: Menu[] = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: "/assets/images/dashboard.svg",
    isPath: false,
    iconActive: "/assets/images/dashboard.svg",
    submenu: [
      {
        name: "Analisis",
        link: "/dashboard/analysis",
        icon: "",
        iconActive: "/assets/images/faq.svg",
        status: false,
      },
      {
        name: "Rangkuman Pembayaran",
        link: "/dashboard/recap",
        icon: "",
        iconActive: "/assets/images/faq.svg",
        status: false,
      },
      {
        name: "Performa Uker",
        link: "/dashboard/performance",
        icon: "",
        iconActive: "/assets/images/faq.svg",
        status: false,
      },
    ],
  },
  {
    name: "List Pengajuan",
    link: "/submission",
    icon: "/assets/images/submission.svg",
    isPath: true,
    iconActive: "/assets/images/submission-active.svg",
    submenu: [],
  },
  {
    name: "List Aktifitas",
    link: "/activity",
    icon: "/assets/images/calender.svg",
    isPath: true,
    iconActive: "/assets/images/calender.svg",
    submenu: [],
  },
];

export const FALLBACK_IMAGE = "/images/fallback-image.webp";
