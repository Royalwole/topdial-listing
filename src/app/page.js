export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Welcome to Topdial updated
      </h1>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">
          This is a test page to verify Tailwind CSS functionality.
        </p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Test Button
        </button>
      </div>
    </div>
  );
}
