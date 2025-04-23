'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"


const MainNavLinks = ({ role }: { role?: string }) => {

    const links = [
        { lable: "Dashboard", href: "/", adminOnly: false },
        { lable: "Tickets", href: "/tickets", adminOnly: false },
        { lable: "Users", href: "/users", adminOnly: true },
    ]
    const currentPath = usePathname();

    return (
        <div className='flex items-center gap-2'>
            {links.filter((link) => !link.adminOnly || role === "ADMIN").map((link) => (
                <Link href={link.href} className={`navbar-link ${currentPath == link.href && "cursor-default text-primary/70 hover:text-primary/60"}`} key={link.lable}>{link.lable}</Link>
            ))}
        </div>
    )
}

export default MainNavLinks