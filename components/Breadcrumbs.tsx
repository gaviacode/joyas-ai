import Link from "next/link";
import type { LinkItem } from "@/lib/site-content";

export default function Breadcrumbs({ items, homeLabel = "Inicio", homeHref = "/" }: { items: LinkItem[]; homeLabel?: string; homeHref?: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[#7c7064]">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href={homeHref} className="font-medium text-[#9a6b08] hover:text-[#17120b]">
            {homeLabel}
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
          <li key={item.href} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {isLast ? (
              <span aria-current="page" className="font-medium text-[#625746]">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="font-medium text-[#9a6b08] hover:text-[#17120b]">
                {item.label}
              </Link>
            )}
          </li>
          );
        })}
      </ol>
    </nav>
  );
}
