export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex justify-center items-center">
        <svg
          width={50}
          height={50}
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin"
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#ADB3C9"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="80, 200"
          />
        </svg>
      </div>
    </div>
  );
}
