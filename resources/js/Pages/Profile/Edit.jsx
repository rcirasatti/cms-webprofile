import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Simple header with back button */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <ApplicationLogo className="w-8 h-8 text-primary" />
                                <span className="ml-2 text-xl font-bold text-gray-800">
                                    OmahIoT CMS
                                </span>
                            </Link>
                        </div>
                        <Link
                            href={route('dashboard')}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-secondary-foreground bg-secondary hover:bg-secondary/90 hover:shadow-lg hover:scale-105 focus:outline-none transition-all duration-300"
                        >
                            <svg 
                                className="w-5 h-5 mr-2" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </header>
            
            <Head title="Profile" />

            <div className="py-6">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Profile Settings
                        </h2>
                        <p className="text-gray-600 mt-1">Manage your account settings and password</p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 shadow-sm rounded-lg border border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        <div className="bg-white p-6 shadow-sm rounded-lg border border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Update Password</h3>
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>

                        <div className="bg-white p-6 shadow-sm rounded-lg border border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Account</h3>
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
