"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function NavigationWrapper({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            <div className="flex min-w-0 flex-1 flex-col">
                <Header onMenuClick={() => setMobileOpen(true)} />
                {children}
            </div>
        </>
    );
}
