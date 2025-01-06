import { usePathname } from 'next/navigation';

const SubMenu = ({ menuItem }) => {

    const pathName = usePathname();

    return (
        <nav>
            <ul className="flex flex-col items-start bg-primary p-4 rounded-b gap-4 pb-0 md:pb-4 w-full">
                {menuItem.submenu.map((subItem) => (
                    <li key={subItem.id} className="list-none">
                        <a
                            href={subItem.url}
                            className={`text-sm text-white hover:text-secondary hover:no-underline ${pathName.includes(subItem.uid) ? 'text-black' : ''}`}
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