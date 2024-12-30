export const LoadingSpinner = ({ size = 5, color = "white" }) => {
    return (
      <div
        className={`inline-block w-${size} h-${size} border-2 border-t-2 border-r-transparent rounded-full animate-spin`}
        style={{
          borderColor: `${color} transparent transparent transparent`,
        }}
        role="status"
        aria-label="Loading..."
      ></div>
    );
  };
  
  export const LoadingBig = ({ size = 8, color = "white" }) => {
    return (
      <div className="flex space-x-2 justify-center items-center w-[200px] m-auto mt-[300px]">
        <div
          className={`h-${size} w-${size} rounded-full animate-bounce`}
          style={{ backgroundColor: color, animationDelay: "-0.3s" }}
        ></div>
        <div
          className={`h-${size} w-${size} rounded-full animate-bounce`}
          style={{ backgroundColor: color, animationDelay: "-0.15s" }}
        ></div>
        <div
          className={`h-${size} w-${size} rounded-full animate-bounce`}
          style={{ backgroundColor: color }}
        ></div>
      </div>
    );
  };
  
  export const LoadingSmall = ({ size = 4, color = "white" }) => {
    return (
      <div className="flex space-x-2 justify-center items-center">
        <div
          className={`h-${size} w-${size} rounded-full animate-bounce`}
          style={{ backgroundColor: color, animationDelay: "-0.3s" }}
        ></div>
        <div
          className={`h-${size} w-${size} rounded-full animate-bounce`}
          style={{ backgroundColor: color, animationDelay: "-0.15s" }}
        ></div>
        <div
          className={`h-${size} w-${size} rounded-full animate-bounce`}
          style={{ backgroundColor: color }}
        ></div>
      </div>
    );
  };
  