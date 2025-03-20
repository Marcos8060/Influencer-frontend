import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { influencerMenu } from "@/assets/menu";

const MenuChildren = ({ collapse }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const currentPath = usePathname();

  const handleOpen = (index) => {
    // Toggle the open state: open if currently closed, close if currently open
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {influencerMenu.map((item, index) => {
        const isOpen = openIndex === index;
        const icon = isOpen ? <IoChevronDownOutline /> : <IoChevronForward />;

        return (
          <section key={index}>
            {!item.children ? (
              <section>
                <Link
                  href={`${item.path}`}
                  className={`flex items-center ${collapse ? 'justify-center' : ''} gap-4 ${
                    currentPath === item.path
                      ? "bg-gradient-to-r from-primary to-secondary rounded-3xl px-3 py-3 text-background"
                      : "text-color"
                  }`}
                >
                  <div className={`${collapse ? '' : ''}`}>
                    <p className={`${collapse ? "" : ""}`}>
                      {item.icon}
                    </p>
                  </div>
                  {!collapse && <p className="">{item.label}</p>}
                </Link>
              </section>
            ) : (
              <section>
                <section
                  onClick={() => handleOpen(index)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-4 text-background">
                    <p>{item.icon}</p>
                    <p className="text-sm">{item.label}</p>
                  </div>
                  <div>
                    <p className="text-background">{icon}</p>
                  </div>
                </section>
                {isOpen && (
                  <section className="py-4 pl-8 space-y-4">
                    {item.children.map((child, index) => (
                      <Link
                        key={index}
                        href={`${child.path}`}
                        className={`flex items-center gap-2 ${
                          currentPath === child.path
                            ? "bg-background rounded-3xl px-3 py-2 text-primary"
                            : "text-background"
                        }`}
                      >
                        <p>{child.icon}</p>
                        <p className="text-sm">{child.label}</p>
                      </Link>
                    ))}
                  </section>
                )}
              </section>
            )}
          </section>
        );
      })}
    </>
  );
};

export default MenuChildren;
