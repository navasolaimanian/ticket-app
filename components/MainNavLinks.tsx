'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"


const MainNavLinks = () => {

    const links = [
        { lable: "Dashboard", href: "/" },
        { lable: "Tickets", href: "/tickets" },
        { lable: "Users", href: "/users" },
    ]
    const currentPath = usePathname();

    return (
        <div className='flex items-center gap-2'>
            {links.map((link) => (
                <Link href={link.href} className={`navbar-link ${currentPath == link.href && "cursor-default text-primary/70 hover:text-primary/60"}`} key={link.lable}>{link.lable}</Link>
            ))}
        </div>
    )
}

export default MainNavLinks