import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav>
      <div className="h-16 mx-auto ">
        <ul className=" flex flex-shrink-0 gap-4">
          <li>
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className=" text-blue-600 hover:text-blue-800">
              About
            </Link>
          </li>

          <li>
            <Link href="/reviews" className=" text-blue-600 hover:text-blue-800">
              Reviews
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
