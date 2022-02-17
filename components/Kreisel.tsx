import { useEffect, useState } from "react";

interface IKreiselProps {
  className?: string;
}

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
      viewBox="11 11 158 159"
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
        d="M82.5 168.915 C78.1 168.874 71.8 168.248 68.5 167.523 65.2 166.799 60.248 165.345 57.495 164.292 54.742 163.239 49.567 160.837 45.995 158.953 41.911 156.8 36.52 152.553 31.474 147.514 25.268 141.317 22.487 137.572 19.21 131 16.879 126.325 14.196 119.35 13.249 115.5 12.179 111.153 11.521 104.52 11.513 98 11.506 92.225 12.064 84.218 12.754 80.207 13.444 76.195 15.371 69.38 17.036 65.062 18.701 60.744 21.905 54.362 24.156 50.88 26.407 47.397 31.23 41.45 34.874 37.663 38.518 33.876 44.27 28.793 47.656 26.367 51.043 23.942 57.568 20.215 62.156 18.085 66.745 15.954 73.841 13.465 77.925 12.554 82.688 11.491 89.873 10.897 97.967 10.897 105.462 10.897 113.814 11.539 118.542 12.48 123.002 13.368 130.016 15.786 134.5 17.982 138.9 20.137 144.75 23.765 147.5 26.045 150.25 28.324 154.364 32.447 156.643 35.206 158.921 37.966 161.963 42.629 163.402 45.568 164.841 48.508 166.743 53.738 167.628 57.191 168.698 61.37 169.035 65.39 168.635 69.214 168.305 72.374 167.097 77.781 165.95 81.23 164.803 84.678 162.121 90.46 159.99 94.078 157.859 97.695 154.006 103.002 151.428 105.869 148.849 108.737 144.179 113.054 141.05 115.462 137.92 117.87 132.466 121.413 128.93 123.335 125.393 125.258 119.415 127.769 115.645 128.915 111.874 130.062 106.422 131 103.53 131 99.738 131 97.541 130.427 95.659 128.946 94.223 127.817 92.523 125.139 91.881 122.996 91.231 120.826 90.951 116.529 91.251 113.3 91.546 110.11 92.848 104.906 94.144 101.735 95.44 98.564 98.525 92.939 101 89.235 105.223 82.915 105.9 82.362 112 80.263 115.575 79.033 119.58 78.133 120.899 78.263 122.219 78.394 123.767 79.249 124.34 80.164 125.167 81.486 124.571 82.789 121.441 86.5 119.273 89.07 116.47 92.643 115.211 94.442 113.951 96.24 112.668 99.273 112.358 101.182 111.945 103.727 112.27 105.127 113.579 106.436 114.955 107.812 116.458 108.114 120.157 107.759 122.794 107.506 127.83 105.881 131.349 104.149 134.983 102.36 139.565 99.026 141.958 96.43 144.275 93.916 147.521 88.974 149.171 85.448 150.821 81.922 152.802 76.666 153.574 73.768 154.345 70.871 154.982 65.769 154.988 62.432 154.995 59.094 154.311 54.041 153.468 51.204 152.38 47.539 150.313 44.292 146.336 39.997 142.318 35.656 138.727 32.988 133.619 30.547 129.703 28.676 123.575 26.55 120 25.822 116.425 25.095 108.949 24.565 103.386 24.644 96.912 24.737 90.255 25.541 84.886 26.88 80.274 28.031 72.45 30.981 67.5 33.437 62.55 35.893 56.025 39.946 53 42.443 49.975 44.94 45.336 49.575 42.69 52.742 40.045 55.909 36.137 62.1 34.006 66.5 31.875 70.9 29.427 77.265 28.566 80.644 27.625 84.338 27 91.061 27 97.5 27 103.998 27.618 110.597 28.571 114.276 29.436 117.611 31.464 122.957 33.078 126.155 34.693 129.354 38.383 134.34 41.279 137.236 44.244 140.201 49.427 143.92 53.141 145.749 56.769 147.535 63.003 149.734 66.995 150.635 72.645 151.911 77.159 152.144 87.376 151.689 95.757 151.315 103.274 150.36 108.176 149.047 112.398 147.916 120.18 145.223 125.469 143.063 130.759 140.902 139.613 136.606 145.146 133.516 155.205 127.897 155.205 127.897 160.71 131.689 166.216 135.481 166.216 135.481 161.358 139.904 158.686 142.337 153.347 146.391 149.494 148.914 145.641 151.436 138.424 155.384 133.458 157.687 128.491 159.99 121.069 162.818 116.964 163.972 112.859 165.125 105.225 166.726 100 167.529 94.775 168.331 86.9 168.955 82.5 168.915 Z"
      />
    </svg>
  );
};

export default Kreisel;
