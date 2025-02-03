import { usePathname } from 'next/navigation';

const SubMenu = ({ menuItem }) => {
    const pathName = usePathname();

    return (
        <nav>
            <ul className="
                flex flex-col items-start gap-4
                w-full
                p-4 pb-0 md:pb-4
                bg-primary
                rounded-b
            ">
                {menuItem.submenu.map((subItem) => (
                    <li key={subItem.id} className="list-none">
                        <a
                            href={subItem.url}
                            className={`
                                text-sm text-white
                                hover:no-underline flex
                                hover:text-secondary ${pathName.includes(subItem.uid) ? 'text-tertiary' : ''}
                                gap-4
                            `}
                        >
                            {subItem.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SubMenu;
