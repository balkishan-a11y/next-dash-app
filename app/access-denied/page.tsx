export default function AccessDenied() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold">
                    Access Denied
                </h1>

                <p className="mt-3 text-gray-600">
                    You don't have permission to access this page.
                </p>
            </div>
        </div>
    );
}