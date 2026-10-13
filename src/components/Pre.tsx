import { type HTMLAttributes, useRef, useState } from "react";

export const EnhancedPreElement = ({
  children,
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
      <pre {...props} ref={snippetRef} className="pointer-events-none">
        {children}
      </pre>
      <button
        className="text-sm text-isabelline bg-surface-dark rounded absolute top-4 right-4 px-2 invisible group-hover:visible hover:cursor-pointer"
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
