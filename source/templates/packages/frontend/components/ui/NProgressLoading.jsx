import { useNProgress } from "@tanem/react-nprogress";

function NProgressLoading({ isRouteChanging }) {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating: isRouteChanging,
  });

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-[3] transition-opacity ${
          isFinished ? "opacity-0" : "opacity-100"
        } pointer-events-none`}
        style={{
          transitionDuration: `${animationDuration}ms`,
        }}
      >
        <div
          className="absolute top-0 left-0 h-[2.5px] bg-primary-4 transition-all duration-200"
          style={{
            width: "100%",
            marginLeft: `${(-1 + progress) * 100}%`,
          }}
        >
          <div
            className="absolute right-0 w-24 h-full transform rotate-3 translate-y-[-4px] translate-x-0 shadow-[0 0 10px rgba(0,0,0,0.08)]"
          />
        </div>
      </div>
    </>
  );
}

export default NProgressLoading;
