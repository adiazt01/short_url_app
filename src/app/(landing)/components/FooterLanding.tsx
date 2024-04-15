import Link from "next/link";

export function FooterLanding() {
  return (
    <footer className="rounded-lg shadow m-4">
      <div className="w-full max-w-4xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              ShortBuddy
            </span>
          </a>
          <ul className="flex flex-wrap gap-5 items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="/auth/register">
                Register
              </Link>
            </li>
            <li>
              <Link href="/auth/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <Link href="/" className="hover:underline">
            ShortBuddy
          </Link>
        </span>
      </div>
    </footer>
  );
}
