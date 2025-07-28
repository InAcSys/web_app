import { Link, List, Table } from "lucide-react";
import { Option } from "./components/buttons/option/Option";
import "./markdown-editor.css";
import { TextStyle } from "./components/text-style/TextStyle";
import { useRef } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

export const MarkdownEditor = ({ value, setValue }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null!);

  return (
    <div className="markdown-editor-component">
      <div className="markdown-editor-header flex-row-center-start">
        <TextStyle text={value} setText={setValue} textareaRef={textareaRef} />
        <div className="markdown-editor-header-options flex-row-center">
          <Option
            icon={List}
            handleClick={() => {
              const area = textareaRef.current;
              if (!area) return;
              const start = area.selectionStart;
              const end = area.selectionEnd;
              const selected = value.slice(start, end);
              const list = selected
                .split("\n")
                .map((line) => `- ${line}`)
                .join("\n");
              setValue(value.slice(0, start) + list + value.slice(end));
            }}
          />
          <Option
            icon={Table}
            handleClick={() => {
              const area = textareaRef.current;
              if (!area) return;
              const start = area.selectionStart;
              const table = `| Col 1 | Col 2 | Col 3 |\n|-------|-------|-------|\n| Val 1 | Val 2 | Val 3 |\n`;
              setValue(value.slice(0, start) + table + value.slice(start));
            }}
          />
          <Option
            icon={Link}
            handleClick={() => {
              const area = textareaRef.current;
              if (!area) return;
              const start = area.selectionStart;
              const end = area.selectionEnd;
              const selected = value.slice(start, end) || "Texto";
              const link = `[${selected}](https://url.com)`;
              setValue(value.slice(0, start) + link + value.slice(end));
            }}
          />
        </div>
      </div>
      <div className="markdown-editor-text-section">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="markdown-editor-textarea"
          name="markdown-editor-textarea"
          id="markdown-editor-textarea"
        />
        <div
          onClick={() => textareaRef.current?.focus()}
          className="markdown-editor-view text-break"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(marked.parse(value)),
          }}
        />
      </div>
    </div>
  );
};
