"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { AnchorHTMLAttributes, MouseEvent, ReactNode, useEffect, useState } from "react";
import { startRouteLoader } from "@/components/route-loader";

type LoadingLinkProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode;
  };

export function LoadingLink({ href, onClick, children, ...props }: LoadingLinkProps) {
  const pathname = usePathname();
  const [pending, setPending] = useState(false);
  const className = typeof props.className === "string" ? props.className : "";
  const isButtonLink = className.includes("btn-");

  useEffect(() => {
    setPending(false);
  }, [pathname]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const target = typeof href === "string" ? href : "";
    if (!target.startsWith("#") && target !== pathname) {
      setPending(true);
      startRouteLoader();
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
      {pending && isButtonLink ? <span className="button-spinner ml-2" /> : null}
    </Link>
  );
}
