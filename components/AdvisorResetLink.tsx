"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const resetAdvisorEvent = "joyas-ai:reset-advisor";

type AdvisorResetLinkProps = {
  href: string;
  className: string;
  children: ReactNode;
};

export default function AdvisorResetLink({ href, className, children }: AdvisorResetLinkProps) {
  const pathname = usePathname();
  const targetPathname = href.split("#")[0] || "/";

  return (
    <Link
      href={href}
      className={className}
      onClick={(event) => {
        if (pathname !== targetPathname) {
          return;
        }

        const resetEvent = new Event(resetAdvisorEvent, { cancelable: true });
        const hasResetResults = !window.dispatchEvent(resetEvent);
        if (!hasResetResults) {
          return;
        }

        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {children}
    </Link>
  );
}

export { resetAdvisorEvent };
