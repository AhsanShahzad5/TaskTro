import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import userImg from '../../assets/images/user.jpg';

export default function AccountDropdown({ className }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // Prevent scrolling when the dropdown is open
  useEffect(() => {
    if (dropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [dropdownOpen]);

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  return (
    <div className="flex">
      <div className="relative inline-block">
        <button
          ref={trigger}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="mb-3.5 inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-stroke bg-white px-6 py-3 text-base font-medium text-dark"
        >
          Account
          <span className={`duration-100 ${dropdownOpen ? "-scale-y-100" : ""}`}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4062 5.65625 17.6875 5.9375C17.9688 6.21875 17.9688 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1562 10.1875 14.25 10 14.25Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </button>
        <div
          ref={dropdown}
          className={`divide-y divide-stroke overflow-hidden rounded-lg bg-white ${dropdownOpen ? "block" : "hidden"} ${className}`}
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="relative aspect-square w-10 rounded-full">
              <img
                src={userImg}
                alt="account"
                className="w-full rounded-full object-cover object-center"
              />
              <span className="absolute -right-0.5 -top-0.5 block h-3.5 w-3.5 rounded-full border-2 border-white bg-green"></span>
            </div>
            <div>
              <p className="text-sm font-semibold text-dark">Ahsan Shahzad</p>
              <p className="text-sm text-body-color">ahsan@company.com</p>
            </div>
          </div>
          <div>
            {["View profile", "Settings", "Add a team"].map((item, index) => (
              <Link
                key={index}
                to="#"
                className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-dark hover:bg-red-100"
              >
                {item}
                {item === "Add a team" && (
                  <span className="text-xs text-dark-5"> "+" </span>
                )}
              </Link>
            ))}
          </div>
          <div>
            {["Activity Log", "Resources", "Upgrade to Pro"].map((item, index) => (
              <Link
                key={index}
                to="#"
                className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-dark hover:bg-red-100"
              >
                {item}
              </Link>
            ))}
          </div>
          <div>
            <Link
              to="#"
              className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-dark hover:bg-red-100"
            >
              Sync
            </Link>
          </div>
          <div>
            <button className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-dark hover:bg-red-100">
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
