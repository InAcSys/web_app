import { Bold, Italic, Underline } from "lucide-react";
import "./text-style.css";
import { useState } from "react";

type styles = "bold" | "italic" | "underline" | "";

interface Props {
  text: string;
  setText: (value: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export const TextStyle = ({ text, setText, textareaRef }: Props) => {
  const [option, setOption] = useState<styles>("");

  const handleBold = () => {
    // handleSelectOption("bold");
    if (!textareaRef) return;
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = text.slice(start, end);
    const wrapped = `**${selected}**`;
    setText(text.slice(0, start) + wrapped + text.slice(end));
  };

  const handleItalic = () => {
    // handleSelectOption("italic");
    if (!textareaRef) return;
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = text.slice(start, end);
    const wrapped = `*${selected}*`;
    setText(text.slice(0, start) + wrapped + text.slice(end));
  };

  const handleUnderline = () => {
    // handleSelectOption("underline");
    if (!textareaRef) return;
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = text.slice(start, end);
    const wrapped = `<u>${selected}</u>`;
    setText(text.slice(0, start) + wrapped + text.slice(end));
  };

  const handleSelectOption = (style: styles) => {
    if (style !== option) setOption(style);
    else setOption("");
  };

  return (
    <div className="text-style-component flex-row-center">
      <button
        className={`text-style-button flex-column-center ${
          option === "bold" ? "is-clicked" : ""
        }`}
        onClick={handleBold}
      >
        <Bold />
      </button>
      <button
        className={`text-style-button flex-column-center ${
          option === "italic" ? "is-clicked" : ""
        }`}
        onClick={handleItalic}
      >
        <Italic />
      </button>
      <button
        className={`text-style-button flex-column-center ${
          option === "underline" ? "is-clicked" : ""
        }`}
        onClick={handleUnderline}
      >
        <Underline />
      </button>
    </div>
  );
};
