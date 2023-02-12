import { Html, useProgress } from "@react-three/drei";

export function CustomLoader() {
  const { progress } = useProgress();
  return (
    <Html
      center
      className="flex h-screen w-screen items-center justify-center bg-black bg-opacity-50"
    >
      <div>
        <div className="h-32 w-32 animate-spin rounded-full border-b-8 border-white"></div>
        <span className="text-xl  font-bold text-white">
          {progress.toFixed(0)} % loaded
        </span>
      </div>
    </Html>
  );
}
