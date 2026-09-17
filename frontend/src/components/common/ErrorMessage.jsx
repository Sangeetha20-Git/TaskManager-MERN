export default function ErrorMessage({
    error,
    setError
}) {

    if (!error) {
        return null;
    }

    return (

        <div className="mb-5 flex items-center justify-between bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">

            <div className="flex items-center gap-3">

                <span>
                    ⚠
                </span>

                <span className="text-sm font-medium">
                    {error}
                </span>

            </div>

            <button
                onClick={() =>
                    setError("")
                }
                className="text-red-400 hover:text-red-700"
            >
                ✕
            </button>

        </div>

    );

}