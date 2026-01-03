import { Settings, Mail, Lock, Bell, Shield } from 'lucide-react';
import { useState } from 'react';
import EcommerceLayout from '@/layouts/ecommerce-layout';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        smsNotifications: false,
        orderUpdates: true,
        promotions: true,
        weeklyNewsletter: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNotificationChange = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSaveSettings = () => {
        alert('Settings saved successfully!');
    };

    return (
        <EcommerceLayout>
            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 flex items-center space-x-3">
                        <Settings size={40} className="text-blue-600" />
                        <span>Account Settings</span>
                    </h1>
                    <p className="text-gray-600 mt-2">Manage your account preferences and settings</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-4 space-y-2">
                            <button
                                onClick={() => setActiveTab('general')}
                                className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center space-x-2 ${
                                    activeTab === 'general'
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <Mail size={20} />
                                <span>General</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('password')}
                                className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center space-x-2 ${
                                    activeTab === 'password'
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <Lock size={20} />
                                <span>Password</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('notifications')}
                                className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center space-x-2 ${
                                    activeTab === 'notifications'
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <Bell size={20} />
                                <span>Notifications</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('security')}
                                className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center space-x-2 ${
                                    activeTab === 'security'
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <Shield size={20} />
                                <span>Security</span>
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-3">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            {/* General Settings */}
                            {activeTab === 'general' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-900">General Information</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <button
                                        onClick={handleSaveSettings}
                                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            )}

                            {/* Password Settings */}
                            {activeTab === 'password' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <button
                                        onClick={handleSaveSettings}
                                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                                    >
                                        Update Password
                                    </button>
                                </div>
                            )}

                            {/* Notifications Settings */}
                            {activeTab === 'notifications' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Notification Preferences</h2>

                                    <div className="space-y-4">
                                        {Object.entries(notifications).map(([key, value]) => (
                                            <label key={key} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={value}
                                                    onChange={() => handleNotificationChange(key as keyof typeof notifications)}
                                                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-semibold text-gray-900">
                                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {key === 'emailNotifications' && 'Receive notifications via email'}
                                                        {key === 'smsNotifications' && 'Receive notifications via SMS'}
                                                        {key === 'orderUpdates' && 'Get updates on your orders'}
                                                        {key === 'promotions' && 'Receive promotional offers and deals'}
                                                        {key === 'weeklyNewsletter' && 'Subscribe to our weekly newsletter'}
                                                    </p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>

                                    <button
                                        onClick={handleSaveSettings}
                                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                                    >
                                        Save Preferences
                                    </button>
                                </div>
                            )}

                            {/* Security Settings */}
                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>

                                    <div className="space-y-4">
                                        <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                                            <h3 className="font-semibold text-gray-900 mb-2">Two-Factor Authentication</h3>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Enhance your account security by enabling two-factor authentication
                                            </p>
                                            <button className="bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition">
                                                Enable 2FA
                                            </button>
                                        </div>

                                        <div className="p-4 border border-gray-200 rounded-lg">
                                            <h3 className="font-semibold text-gray-900 mb-2">Active Sessions</h3>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Manage your active login sessions
                                            </p>
                                            <button className="bg-gray-200 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition">
                                                View Sessions
                                            </button>
                                        </div>

                                        <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                                            <h3 className="font-semibold text-gray-900 mb-2">Delete Account</h3>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Permanently delete your account and all associated data
                                            </p>
                                            <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition">
                                                Delete Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </EcommerceLayout>
    );
};

export default SettingsPage;
