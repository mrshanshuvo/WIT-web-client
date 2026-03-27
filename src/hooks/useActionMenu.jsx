import { useState, useEffect, useRef } from "react";

export const useActionMenu = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);
  const openMenu = () => setIsOpen(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Use mousedown to ensure firing before component lifecycle cleans up
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { isOpen, toggleMenu, closeMenu, openMenu, menuRef };
};
