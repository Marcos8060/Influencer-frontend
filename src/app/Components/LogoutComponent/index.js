
import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { FaUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";



export default function LogoutComponent() {
    const menuLeft = useRef(null);
    const items = [
        {
            items: [
                {
                    label: 'Logout',
                    template: (item, options) => (
                        <div className="w-full text-center flex items-center justify-center cursor-pointer font-semibold">
                            <TbLogout className="mr-2" />
                            <span>{item.label}</span>
                        </div>
                    )
                }
            ]
        }
    ];

    return (
        <div className="flex justify-content-center">
            <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
            <Button label={<FaUserCircle className='text-2xl' />} className="mr-2" onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />
        </div>
    )
}
        