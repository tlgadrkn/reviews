'use client';
import React from 'react';
import { NavLink } from './navLink';

export const Navbar = () => {
  return (
    <nav>
      <div className="h-16 mx-auto ">
        <ul className=" flex flex-shrink-0 gap-4">
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/about">About</NavLink>
          </li>

          <li>
            <NavLink href="/reviews">Reviews</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
