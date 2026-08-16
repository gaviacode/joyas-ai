import Link from "next/link";

type LogoProps = {
  className?: string;
  href?: string;
  ariaLabel?: string;
};

export default function Logo({
  className = "",
  href = "/",
  ariaLabel = "Ir al inicio de joyas.ai",
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`group inline-flex shrink-0 items-baseline text-[#a66f08] transition-colors hover:text-[#8f5f06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b97a05] focus-visible:ring-offset-4 ${className}`}
    >
      <span
        className="text-[1.85rem] font-medium leading-none sm:text-[2.15rem] lg:text-[2.35rem]"
        style={{ fontFamily: "Georgia, Cambria, 'Times New Roman', serif" }}
      >
        joyas
      </span>
      <span
        className="ml-0.5 text-[1.25rem] font-semibold leading-none text-[#5f4a24] transition-colors group-hover:text-[#6f4b09] sm:text-[1.45rem] lg:text-[1.6rem]"
        style={{ fontFamily: "Arial, Helvetica, sans-serif", letterSpacing: "0.04em" }}
      >
        .ai
      </span>
    </Link>
  );
}
