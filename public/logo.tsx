import Image from "next/image";
import { useTheme } from "next-themes";

export default function Logo() {
  const { theme } = useTheme();

  return (
    <div className="flex items-center translation-y-[2px]">
      <Image
        src={theme === "dark" ? "/logo_dark.png" : "/logo.png"}
        alt="Logo"
        width={130}
        height={130}
        className="w-[100px] h-auto md:w-[130px]"
      />
    </div>
  );
}
