const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50">
      <div className="relative flex items-center justify-center">
        <div className="h-20 w-20 rounded-full border-4 border-slate-200"></div>
        <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
      <div className="mt-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-slate-800 animate-pulse">
          Loading
        </h2>
      </div>
    </div>
  );
};

export default LoadingScreen;
