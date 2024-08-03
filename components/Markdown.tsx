import ReactMarkdown from "react-markdown";

export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      className="space-y-4"
      components={{
        ul: (props) => <ul className="list-inside list-disc" {...props} />,
        a: (props) => (
          <a className="text-green-500 underline" {...props} target="_blank" />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
