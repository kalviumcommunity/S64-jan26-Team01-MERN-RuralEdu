export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#18659e"
            strokeWidth="2"
            className="mx-auto"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[#153b52] mb-2">
          You're Offline
        </h1>
        <p className="text-gray-600 mb-6">
          No internet connection. Don't worry! You can still access downloaded courses.
        </p>
        <a
          href="/home"
          className="inline-block px-6 py-2 bg-[#18659e] text-white rounded hover:bg-[#153b52] transition"
        >
          Go to My Courses
        </a>
      </div>
    </div>
  );
}
