import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-green-50 to-blue-50 pt-6 sm:justify-center sm:pt-0">
            <div className="mb-6 text-center">
                <Link href="/" className="flex flex-col items-center">
                    <ApplicationLogo className="h-16 w-16 text-green-600 mb-3" />
                    <h1 className="text-2xl font-bold text-gray-800">OmahIoT</h1>
                    <p className="text-sm text-gray-600">Smart Home Management System</p>
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-8 shadow-xl border border-gray-100 sm:max-w-md sm:rounded-xl">
                {children}
            </div>
        </div>
    );
}
