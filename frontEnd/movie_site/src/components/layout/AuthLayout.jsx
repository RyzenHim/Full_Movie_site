import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="pt-24">
            <Outlet />
        </div>
    );
}
