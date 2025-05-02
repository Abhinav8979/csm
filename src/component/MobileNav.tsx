"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaChevronDown, FaChevronRight } from "react-icons/fa";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setOpenSubmenu(null); // Reset submenus on toggle
  };

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const menuItems = [
    {
      label: "Home",
      href: "/home",
      subLinks: [
        { label: "Overview", href: "/home/overview" },
        { label: "Updates", href: "/home/updates" },
      ],
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Services",
      href: "/services",
      subLinks: [
        { label: "Web Development", href: "/services/web" },
        { label: "Mobile Development", href: "/services/mobile" },
      ],
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="relative h-screen w-full">
      {/* Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <div className="flex flex-col mr-4">
          <motion.span
            className={`h-1 rounded-full w-8 ${
              isOpen ? "bg-orange-500" : "bg-black"
            }`}
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : -3 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className={`h-1 rounded-full w-8 ${
              isOpen ? "bg-orange-500" : "bg-black"
            }`}
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className={`h-1 rounded-full w-8 ${
              isOpen ? "bg-orange-500" : "bg-black"
            }`}
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -1 : 3 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-green-400 z-40 overflow-y-auto pt-24"
            initial={{ clipPath: "circle(0% at 2rem 2rem)" }}
            animate={{ clipPath: "circle(150% at 2rem 2rem)" }}
            exit={{ clipPath: "circle(0% at 2rem 2rem)" }}
            transition={{ duration: 0.6, ease: [0.25, 0.8, 0.3, 1] }}
          >
            <motion.nav
              className="space-y-6 px-6 py-10"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="text-gray-800"
                  variants={menuItemVariants}
                >
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() =>
                      item.subLinks ? toggleSubmenu(item.label) : null
                    }
                  >
                    {item.subLinks ? (
                      <span className="font-medium hover:text-blue-600">
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="font-medium hover:text-blue-600 flex-1"
                      >
                        {item.label}
                      </Link>
                    )}

                    {item.subLinks ? (
                      <FaChevronDown
                        className={`ml-2 transition-transform duration-300 ${
                          openSubmenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    ) : (
                      <FaArrowRight className="ml-2" />
                    )}
                  </div>

                  {/* Animate Sub-links */}
                  <AnimatePresence>
                    {item.subLinks && openSubmenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="ml-4 mt-2 space-y-2 overflow-hidden"
                      >
                        {item.subLinks.map((sub, i) => (
                          <Link
                            key={i}
                            href={sub.href}
                            className="flex items-center justify-between text-sm text-gray-700 hover:text-blue-500"
                          >
                            <span>{sub.label}</span>
                            <FaArrowRight className="text-xs ml-1" />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
