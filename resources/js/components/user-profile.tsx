import { LogOut, Settings, User } from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export const UserProfile = () => {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);

    const user = auth.user;

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition"
                title={user.name}
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline text-sm font-medium text-gray-700">{user.name}</span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b bg-gray-50">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                                <p className="text-sm text-gray-600 truncate">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <nav className="space-y-1 py-2">
                        <a
                            href="/profile"
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            <User size={18} />
                            <span>My Profile</span>
                        </a>

                       {/*  <a
                            href="/orders"
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            <ShoppingHistory size={18} />
                            <span>Order History</span>
                        </a> */}

                        <a
                            href="/settings"
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            <Settings size={18} />
                            <span>Settings</span>
                        </a>

                        <hr className="my-2" />

                        <button
                            onClick={() => {
                                setIsOpen(false);
                                handleLogout();
                            }}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </nav>
                </div>
            )}

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default UserProfile;
