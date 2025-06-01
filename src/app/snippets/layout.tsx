import { ReactNode } from "react";

export default function SnippetsLayout({ children }: { children: ReactNode }) {
  return <div className="relative">{children}</div>;
}
