import { FC, PropsWithChildren } from "react";

export const Waves: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <div className="relative w-screen">
        <div className="absolute bottom-0 left-0 z-[1000] h-[100px] w-full animate-[wave_4s_linear_infinite] bg-[url('/wave.png')] bg-[length:1000px_100px] opacity-100"></div>
        <div className="absolute bottom-2.5 left-0 z-[999] h-[100px] w-full animate-[wave2_4s_linear_infinite] bg-[url('/wave.png')] bg-[length:1000px_100px] opacity-50"></div>
        <div className="absolute bottom-[15px] left-0 z-[998] h-[100px] w-full animate-[wave_2s_linear_infinite] bg-[url('/wave.png')] bg-[length:1000px_100px] opacity-20"></div>
        <div className="absolute bottom-5 left-0 z-[999] h-[100px] w-full animate-[wave2_2s_linear_infinite] bg-[url('/wave.png')] bg-[length:1000px_100px] opacity-70"></div>
      </div>
    </>
  );
};
