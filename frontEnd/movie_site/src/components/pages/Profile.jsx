import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { toggleTheme } from "../../redux/themeSlice";
import { FaUserCircle, FaEdit, FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

export default function Profile() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const theme = useSelector((state) => state.theme.mode);

    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [email] = useState(user?.email || "");

    const saveProfile = () => {
        // TODO: send API request
        user.name = name; // local update
        setEditing(false);
        alert("Profile updated!");
    };

    return (
        <div className="min-h-screen pt-24 px-10 flex justify-center">

            {/* Profile Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-2xl animate-fadeIn">

                {/* Avatar */}
                <div className="flex flex-col items-center">
                    <FaUserCircle className="text-7xl text-gray-300 mb-4" />

                    <h2 className="text-3xl font-bold">{user?.name}</h2>
                    <p className="text-gray-400 mb-6">{email}</p>

                    {/* Edit Button */}
                    <button
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl shadow text-white"
                    >
                        <FaEdit /> Edit Profile
                    </button>
                </div>

                {/* Divider */}
                <div className="border-b border-white/10 my-10" />

                {/* SETTINGS */}
                <div className="space-y-6">

                    {/* Theme */}
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Theme</h3>
                        <button
                            onClick={() => dispatch(toggleTheme())}
                            className="bg-white/10 px-6 py-2 rounded-xl border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
                        >
                            {theme === "dark" ? (
                                <>
                                    <FaSun className="text-yellow-300" /> Light Mode
                                </>
                            ) : (
                                <>
                                    <FaMoon className="text-blue-400" /> Dark Mode
                                </>
                            )}
                        </button>
                    </div>

                    {/* Logout */}
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Logout</h3>
                        <button
                            onClick={() => dispatch(logout())}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-xl shadow text-white"
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>
            </div>


            {/* EDIT PROFILE MODAL */}
            {editing && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50">

                    <div className="bg-white/10 border border-white/20 p-8 rounded-3xl shadow-xl w-full max-w-md">

                        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/20 text-white mb-4"
                        />

                        <button
                            onClick={saveProfile}
                            className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-xl text-white font-semibold"
                        >
                            Save Changes
                        </button>

                        <button
                            onClick={() => setEditing(false)}
                            className="w-full mt-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl text-white"
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            )}

        </div>
    );
}
