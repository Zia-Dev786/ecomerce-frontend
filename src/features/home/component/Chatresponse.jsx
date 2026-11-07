import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MarkdownRenderer({ content = "" }) {
  return (
    <div className="markdown-content min-w-0 break-words text-sm leading-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-3 mt-2 text-xl font-bold">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="mb-2 mt-4 text-lg font-bold">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="mb-2 mt-3 text-base font-bold">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="mb-3 last:mb-0">{children}</p>
          ),

          ul: ({ children }) => (
            <ul className="mb-3 ml-5 list-disc space-y-1">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="mb-3 ml-5 list-decimal space-y-1">
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="pl-1">{children}</li>
          ),

          strong: ({ children }) => (
            <strong className="font-bold text-gray-900">
              {children}
            </strong>
          ),

          em: ({ children }) => (
            <em className="italic">{children}</em>
          ),

          blockquote: ({ children }) => (
            <blockquote className="my-3 border-l-4 border-blue-500 pl-3 text-gray-600">
              {children}
            </blockquote>
          ),

          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-blue-600 underline"
            >
              {children}
            </a>
          ),

          pre: ({ children }) => (
            <pre className="my-3 max-w-full overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs leading-5 text-slate-100">
              {children}
            </pre>
          ),

          code: ({ className, children, ...props }) => {
            const isBlock = Boolean(className);

            return isBlock ? (
              <code className={className} {...props}>
                {children}
              </code>
            ) : (
              <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-pink-600">
                {children}
              </code>
            );
          },

          table: ({ children }) => (
            <div className="my-3 max-w-full overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                {children}
              </table>
            </div>
          ),

          th: ({ children }) => (
            <th className="border border-gray-300 bg-slate-100 px-3 py-2 font-bold">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="border border-gray-300 px-3 py-2">
              {children}
            </td>
          ),

          hr: () => <hr className="my-4 border-gray-200" />,
        }}
      >
        {typeof content === "string" ? content : ""}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer;