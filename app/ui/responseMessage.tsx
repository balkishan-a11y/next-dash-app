export default function ResponseMessage({ response }) {
    if (!response || Object.keys(response).length === 0) {
        return null;
    }

    const isError = !!response.error;
    const bgColor = isError ? 'bg-red-500' : 'bg-green-500';
    const message = isError ? response.error : response.msg;

    return (
        <div
            className={`w-full ${bgColor} p-3 mb-2 text-white rounded flex items-center min-h-[3.75rem] animate-fadeIn`}
        >
            <p className="ml-2 font-medium">{message}</p>
        </div>
    );
}
