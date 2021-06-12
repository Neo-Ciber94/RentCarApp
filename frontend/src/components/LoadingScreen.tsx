import Loader from "react-loader-spinner";

interface LoadingScreenProps {
  size?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ size = 100 }) => {
  return (
    <div
      className={`flex flex-row h-full w-full items-center justify-center bg-black opacity-50 fixed top-0 left-0 overflow-hidden z-30`}
    >
      <Loader type="ThreeDots" color="red" height={size} width={size} />
    </div>
  );
};
