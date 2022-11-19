import Link from 'next/link'

export default function Header() {
  return (
    <header className="text-gray-600 body-font h-20">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href={'/'} passHref>
            <h1 className="ml-3 text-xl">RY Tech Blog</h1>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <div className="mr-5hover:text-gray-900">Profile</div>
        </nav>
      </div>
    </header>
  )
}