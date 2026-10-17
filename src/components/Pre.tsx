import { type HTMLAttributes, useRef, useState } from "react";
import { cn } from "~/lib/utils";

export const EnhancedPreElement = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLPreElement>) => {
  const snippetRef = useRef<HTMLPreElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [hasBeenCopiedRecently, setHasBeenCopiedRecently] =
    useState<boolean>(false);

  const buttonText = hasBeenCopiedRecently ? "Copied!" : "Copy";

  const copyToClipboard = async () => {
    let snippet = snippetRef.current;
    let snippetText = snippet?.innerText ?? "";
    await navigator.clipboard.writeText(snippetText);

    setHasBeenCopiedRecently(true);

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setHasBeenCopiedRecently(false);
    }, 1000);
  };

  return (
    <div className="relative group text-start">
      <pre
        {...props}
        ref={snippetRef}
        className={cn(
          "pointer-events-none border-indigo dark:border-indigo-dark border-8",
          className,
        )}
      >
        {children}
      </pre>
      <button
        className="text-sm text-parchment dark:text-parchment-dark bg-surface dark:bg-surface-dark rounded absolute top-8 right-4 px-2 invisible group-hover:visible hover:cursor-pointer"
        onClick={() => {
          if (timeoutRef.current) {
            return false;
          } else {
            copyToClipboard();
          }
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};
