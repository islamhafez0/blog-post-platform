import { TOOLBAR_OPTIONS } from "../../utils/constants";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { containsArabicCharacters } from "../../utils/helpers";
const TextEditor = ({
  value,
  handleQuillChange,
}: {
  value: string;
  handleQuillChange: any;
}) => {
  const iscontainsArabicChars = containsArabicCharacters(value);
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={handleQuillChange}
      modules={{ toolbar: TOOLBAR_OPTIONS }}
      className={`h-full ${iscontainsArabicChars ? "hasArabic" : ""}`}
    />
  );
};

export default TextEditor;
