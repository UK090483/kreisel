import { useEffect, useState } from "react";

interface IKreiselProps {
  className?: string;
}

const path =
  "M97.46 78.546 C92.87 82.73 89.745 85.119 87.555 86.554 85.365 87.989 81.465 90.207 78.888 91.482 76.311 92.757 71.634 94.614 68.494 95.609 65.355 96.604 60.348 97.81 57.368 98.289 54.387 98.768 49.05 99.142 45.507 99.12 41.248 99.094 37.508 98.701 34.468 97.961 31.94 97.345 27.723 95.781 25.098 94.485 22.473 93.189 18.675 90.829 16.658 89.241 14.64 87.653 11.796 84.861 10.338 83.036 8.879 81.212 6.641 77.629 5.364 75.075 4.087 72.521 2.583 68.603 2.021 66.368 1.303 63.51 1 59.98 1 54.468 1 48.318 1.28 45.508 2.304 41.408 3.021 38.535 4.809 33.771 6.278 30.822 7.747 27.873 10.492 23.563 12.377 21.244 14.263 18.925 17.543 15.634 19.667 13.93 21.791 12.226 25.605 9.595 28.143 8.083 30.681 6.571 34.923 4.625 37.569 3.758 40.216 2.891 45.125 1.878 48.48 1.506 53.067 0.998 56.214 0.994 61.17 1.488 64.813 1.851 69.856 2.805 72.446 3.622 75.023 4.434 78.829 6.085 80.904 7.29 82.979 8.496 86.538 11.316 88.814 13.559 91.461 16.168 93.738 19.119 95.136 21.757 96.338 24.025 97.752 27.545 98.279 29.58 98.941 32.138 99.136 34.536 98.91 37.345 98.73 39.579 98.053 42.911 97.404 44.748 96.756 46.585 95.26 49.909 94.079 52.136 92.899 54.362 90.35 57.896 88.415 59.989 86.481 62.082 83.395 64.94 81.559 66.341 79.722 67.741 76.526 69.804 74.455 70.924 72.384 72.043 68.976 73.533 66.883 74.235 64.789 74.936 61.363 75.636 59.269 75.79 55.946 76.034 55.249 75.902 53.781 74.749 52.857 74.023 51.737 72.567 51.293 71.513 50.848 70.46 50.485 68.307 50.485 66.729 50.485 65.151 50.967 62.323 51.557 60.446 52.146 58.568 53.494 55.422 54.552 53.455 55.61 51.487 57.352 48.864 58.422 47.625 60.018 45.776 61.181 45.132 64.9 44.038 68.102 43.096 69.702 42.873 70.353 43.28 70.86 43.597 71.275 44.372 71.275 45.002 71.275 45.632 69.727 48.024 67.835 50.316 65.025 53.72 64.338 54.978 64.088 57.179 63.841 59.352 63.99 60.024 64.858 60.654 65.451 61.083 67.012 61.434 68.329 61.434 69.839 61.434 72.228 60.718 74.805 59.491 77.051 58.423 79.79 56.794 80.893 55.872 81.996 54.95 83.909 52.645 85.145 50.75 86.381 48.854 88.048 45.245 88.85 42.729 89.913 39.392 90.307 36.858 90.307 33.355 90.307 30.442 89.932 27.463 89.354 25.78 88.738 23.989 87.152 21.683 84.877 19.273 82.298 16.54 80.239 15.016 77.193 13.583 74.904 12.507 71.135 11.209 68.817 10.699 66.498 10.189 62.414 9.774 59.739 9.777 57.065 9.779 53.164 10.055 51.071 10.39 48.977 10.724 44.932 11.771 42.081 12.716 39.23 13.66 35.06 15.497 32.814 16.797 30.569 18.097 26.873 20.898 24.601 23.022 22.33 25.146 19.421 28.418 18.136 30.293 16.851 32.168 15.049 35.344 14.132 37.349 13.214 39.355 12.009 42.787 11.453 44.975 10.866 47.288 10.432 51.263 10.416 54.468 10.401 57.501 10.707 61.661 11.095 63.712 11.483 65.763 12.728 69.376 13.861 71.741 15.288 74.719 17.049 77.158 19.588 79.671 21.984 82.043 24.621 83.946 27.2 85.164 29.371 86.189 33.086 87.445 35.457 87.955 38.805 88.675 41.649 88.807 48.2 88.544 54.011 88.312 58.063 87.826 61.227 86.983 63.753 86.31 67.778 84.988 70.17 84.046 72.563 83.104 76.425 81.391 78.754 80.24 81.082 79.088 84.436 77.324 86.206 76.32 87.977 75.316 89.77 74.407 90.191 74.301 90.613 74.194 92.421 75.106 94.209 76.327 L97.46 78.546 Z";

const d = 1100;
const Kreisel: React.FC<IKreiselProps> = (props) => {
  const { className } = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 50);
  }, []);

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={`${className}`}
    >
      <path
        style={{
          strokeDasharray: d,
          strokeDashoffset: show ? 0 : d,
          transition: `stroke-dashoffset 0.5s, fill 0.6s 0.5s`,
        }}
        strokeWidth="1"
        strokeLinecap="round"
        className={`stroke-primary  ${
          show ? "fill-primary" : "fill-transparent"
        }`}
        d={path}
      />
    </svg>
  );
};

export const PureKreisel: React.FC<IKreiselProps> = (props) => {
  const { className } = props;

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className={"w-full fill-current stroke-current " + className}
    >
      <path
        d={path}
        fillOpacity="1"
        strokeWidth="0.5"
        strokeOpacity="1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Kreisel;
