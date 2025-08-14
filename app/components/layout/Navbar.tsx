import { useState, useEffect } from "react";
import { Link, NavLink } from "@remix-run/react";
import { motion, AnimatePresence} from "framer-motion";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";
import { useSpotlight } from "~/context/SpotlightContext";
import {
  // ArrowRightIcon,
  // AtomIcon,
  // ChevronDownIcon,
  // CodeIcon,
  // ListIcon,
  MenuIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";

// const interviewDropdownData = [
//   {
//     id: "all-questions",
//     title: "All practice questions",
//     description:
//       "The largest question bank of 500+ practice questions for front end interviews",
//     icon: <ListIcon />,
//     tags: ["Coding", "System design", "Quiz"],
//     href: "/interviews/all-questions",
//   },
//   {
//     id: "frameworks",
//     title: "Frameworks / languages",
//     description:
//       "Targeted practice in specific front end frameworks and languages",
//     icon: <AtomIcon />,
//     tags: ["React", "TypeScript", "Vue", "Angular", "Svelte", "+3 more"],
//     href: "/interviews/frameworks",
//   },
//   {
//     id: "formats",
//     title: "Question formats",
//     description:
//       "Targeted practice in specific question formats for front end interviews",
//     icon: <CodeIcon />,
//     tags: ["JavaScript functions", "UI coding", "Algo coding", "+2 more"],
//     href: "/interviews/formats",
//   },
// ];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // const [activeInterviewTab, setActiveInterviewTab] = useState(
  //   interviewDropdownData[0].id
  // );
  const [isScrolled, setIsScrolled] = useState(false);

  const { setIsOpen } = useSpotlight();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      // setOpenDropdown(null);
    }
  }, [isMenuOpen]);

  // --- PERUBAHAN DI SINI ---
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
      isActive
        ? "text-white" // Warna teks putih saat aktif
        : "text-neutral-400 hover:text-white"
    }`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive
        ? "bg-gray-100 text-gray-900 dark:bg-neutral-900 dark:text-white"
        : "text-gray-500 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-white"
    }`;
 
  // const dropdownVariants = {
  //   hidden: { opacity: 0, scale: 0.95, y: -10 },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     y: 0,
  //     transition: { duration: 0.2, ease: "easeOut" as const },
  //   },
  //   exit: {
  //     opacity: 0,
  //     scale: 0.95,
  //     y: -10,
  //     transition: { duration: 0.15, ease: "easeIn" as const },
  //   },
  // };
  
  // const mobileDropdownVariants = {
  //   hidden: { opacity: 0, height: 0 },
  //   visible: {
  //     opacity: 1,
  //     height: "auto",
  //     transition: { duration: 0.3, ease: easeOut },
  //   },
  //   exit: {
  //     opacity: 0,
  //     height: 0,
  //     transition: { duration: 0.2, ease: easeIn },
  //   },
  // };
 
  // const handleMobileDropdownToggle = (dropdownName: string) => {
  //   setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  // };
 
  // const activeTabContent = interviewDropdownData.find(
  //   (item) => item.id === activeInterviewTab
  // );

  // Komponen untuk indikator aktif
  const ActiveIndicator = () => (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BFF163] opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BFF163]"></span>
    </span>
  );

  return (
    <>
      <nav className="fixed w-full top-0 z-50">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className={`
                flex items-center justify-between
                ${
                  isScrolled
                    ? "mx-auto mt-2 max-w-fit rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-neutral-900/50 shadow-lg backdrop-blur-md"
                    : "mx-4 md:mx-auto max-w-7xl h-14"
                }
            `}
        >
          {/* Konten Navbar akan bertukar di sini */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isScrolled ? "floating" : "main"}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "linear" }}
              className={`flex items-center justify-between ${
                isScrolled ? "px-5 py-2" : "w-full"
              }`}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link
                    to="/"
                    className="text-gray-900 dark:text-white font-bold text-xl"
                  >
                    <section className="flex justify-center items-center space-x-1">
                      <img
                        src="/albarmox.png"
                        alt="Albarmo"
                        width="42"
                        height="42"
                        className="invert dark:invert-0"
                      />
                      <h1 className="text-lg font-bold">albarmox</h1>
                    </section>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {/* <div
                      className="relative"
                      onMouseEnter={() => setOpenDropdown("interviews-desktop")}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        type="button"
                        className={`${navLinkClasses({
                          isActive: false,
                        })} flex items-center gap-1`}
                      >
                        Mini Program <ChevronDownIcon />
                      </button>
                      <AnimatePresence>
                        {openDropdown === "interviews-desktop" && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dropdownVariants}
                            className="absolute left-0 mt-4 w-[672px] origin-top-left rounded-md bg-white dark:bg-neutral-900 shadow-lg ring-1 ring-black dark:ring-neutral-700 ring-opacity-5 focus:outline-none"
                          >
                            <div className="flex">
                              <div className="w-1/3 border-r border-gray-200 dark:border-neutral-700 p-2">
                                <div className="flex flex-col space-y-1">
                                  <button
                                    onMouseEnter={() =>
                                      setActiveInterviewTab("all-questions")
                                    }
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                                      activeInterviewTab === "all-questions"
                                        ? "bg-gray-100 dark:bg-neutral-800"
                                        : ""
                                    }`}
                                  >
                                    Practice questions
                                  </button>
                                  <button className="w-full text-left px-3 py-2 rounded-md text-sm font-medium">
                                    Recommended strategy
                                  </button>
                                  <button className="w-full text-left px-3 py-2 rounded-md text-sm font-medium">
                                    Time-savers
                                  </button>
                                  <button className="w-full text-left px-3 py-2 rounded-md text-sm font-medium">
                                    Guides
                                  </button>
                                </div>
                              </div>
                              <div className="w-2/3 p-4">
                                {activeTabContent && (
                                  <Link
                                    to={activeTabContent.href}
                                    className="block p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
                                  >
                                    <div className="flex items-start justify-between">
                                      <div className="flex items-start gap-4">
                                        <div className="text-gray-400 dark:text-neutral-500 mt-1">
                                          {activeTabContent.icon}
                                        </div>
                                        <div>
                                          <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {activeTabContent.title}
                                          </h3>
                                          <p className="text-sm text-gray-500 dark:text-neutral-400 mt-1">
                                            {activeTabContent.description}
                                          </p>
                                          <div className="mt-3 flex flex-wrap gap-2">
                                            {activeTabContent.tags.map(
                                              (tag) => (
                                                <span
                                                  key={tag}
                                                  className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-neutral-300"
                                                >
                                                  {tag}
                                                </span>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-gray-400 dark:text-neutral-500">
                                        <ArrowRightIcon />
                                      </div>
                                    </div>
                                  </Link>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div> */}
                    {/* <div
                      className="relative"
                      onMouseEnter={() => setOpenDropdown("prepare-desktop")}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        type="button"
                        className={`${navLinkClasses({
                          isActive: false,
                        })} flex items-center gap-1`}
                      >
                        Blogs <ChevronDownIcon />
                      </button>
                      <AnimatePresence>
                        {openDropdown === "prepare-desktop" && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dropdownVariants}
                            className="absolute left-0 mt-4 w-56 origin-top-left rounded-md bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-5 focus:outline-none"
                          >
                            <div className="py-1">
                              <NavLink
                                to="/blog/components"
                                className="text-gray-700 dark:text-neutral-300 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-700"
                              >
                                Components
                              </NavLink>
                              <NavLink
                                to="/blog/articles"
                                className="text-gray-700 dark:text-neutral-300 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-700"
                              >
                                Articles
                              </NavLink>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div> */}
                    <NavLink to="/projects" className={navLinkClasses}>
                      {({ isActive }) => (
                        <>
                          {isActive && <ActiveIndicator />}
                          <span>Portfolio</span>
                        </>
                      )}
                    </NavLink>
                    <NavLink to="/blogs" className={navLinkClasses}>
                      {({ isActive }) => (
                        <>
                          {isActive && <ActiveIndicator />}
                          <span>Blogs</span>
                        </>
                      )}
                    </NavLink>
                    <NavLink to="/about" className={navLinkClasses}>
                      {({ isActive }) => (
                        <>
                          {isActive && <ActiveIndicator />}
                          <span>About</span>
                        </>
                      )}
                    </NavLink>
                    <NavLink to="/contact" className={navLinkClasses}>
                      {({ isActive }) => (
                        <>
                          {isActive && <ActiveIndicator />}
                          <span>Contact</span>
                        </>
                      )}
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="block">
                <div className="ml-4 flex items-center md:ml-6 gap-4">
                  <ThemeSwitcher />
                  <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="relative rounded-full p-1 text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white focus:outline-none"
                  >
                    <span className="sr-only">Search</span> <SearchIcon />{" "}
                  </button>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  type="button"
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700 hover:text-gray-900 dark:hover:text-white focus:outline-none"
                  aria-controls="mobile-menu"
                  aria-expanded={isMenuOpen}
                >
                  {" "}
                  <span className="sr-only">Open main menu</span>{" "}
                  {isMenuOpen ? <XIcon /> : <MenuIcon />}{" "}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </nav>

      {/* Menu Mobile (tetap terhubung dengan state isMenuOpen) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-14 left-0 right-0 z-40 md:hidden overflow-hidden border border-black/10 dark:border-white/10 bg-white/50 dark:bg-neutral-900/50 shadow-lg backdrop-blur-md"
            id="mobile-menu"
          >
            {/* Konten menu mobile Anda yang sudah ada */}
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {/* <div>
                <button
                  onClick={() =>
                    handleMobileDropdownToggle("interviews-mobile")
                  }
                  type="button"
                  className={`${mobileNavLinkClasses({
                    isActive: false,
                  })} w-full flex justify-between items-center`}
                >
                  <span>Interviews</span>
                  <ChevronDownIcon
                    className={
                      openDropdown === "interviews-mobile" ? "rotate-180" : ""
                    }
                  />
                </button>
                <AnimatePresence>
                  {openDropdown === "interviews-mobile" && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={mobileDropdownVariants}
                      className="pl-4 mt-1 space-y-1 overflow-hidden"
                    >
                      <NavLink
                        to="/interviews/questions"
                        className={mobileNavLinkClasses}
                      >
                        Interview Questions
                      </NavLink>
                      <NavLink
                        to="/interviews/guides"
                        className={mobileNavLinkClasses}
                      >
                        Interview Guides
                      </NavLink>
                      <NavLink
                        to="/interviews/experiences"
                        className={mobileNavLinkClasses}
                      >
                        Interview Experiences
                      </NavLink>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div> */}
              {/* <div>
                <button
                  onClick={() => handleMobileDropdownToggle("prepare-mobile")}
                  type="button"
                  className={`${mobileNavLinkClasses({
                    isActive: false,
                  })} w-full flex justify-between items-center`}
                >
                  <span>Prepare</span>
                  <ChevronDownIcon
                    className={
                      openDropdown === "prepare-mobile" ? "rotate-180" : ""
                    }
                  />
                </button>
                <AnimatePresence>
                  {openDropdown === "prepare-mobile" && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={mobileDropdownVariants}
                      className="pl-4 mt-1 space-y-1 overflow-hidden"
                    >
                      <NavLink
                        to="/prepare/courses"
                        className={mobileNavLinkClasses}
                      >
                        Courses
                      </NavLink>
                      <NavLink
                        to="/prepare/learning-paths"
                        className={mobileNavLinkClasses}
                      >
                        Learning Paths
                      </NavLink>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div> */}
              <NavLink to="/about" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClasses}>
                About
              </NavLink>
              <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClasses}>
                Contact
              </NavLink>
                <NavLink to="/projects" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClasses}>
                Portfolio
              </NavLink>
              <NavLink to="/blogs" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClasses}>
                Blogs
              </NavLink>
            
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}