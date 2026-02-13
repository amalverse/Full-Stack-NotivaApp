import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../redux/features/notes/noteSlice";
import { FaListUl, FaAlignLeft, FaPlus, FaTimes } from "react-icons/fa";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("text"); // 'text' or 'checklist'
  const [text, setText] = useState("");
  const [checklist, setChecklist] = useState([
    { text: "", isCompleted: false },
  ]);
  const [isExpanded, setIsExpanded] = useState(false); // To expand the form on focus

  const dispatch = useDispatch();

  // Add a new empty item to the checklist
  const handleAddItem = () => {
    setChecklist([...checklist, { text: "", isCompleted: false }]);
  };

  // Update the text of a specific checklist item
  const handleChecklistChange = (index, value) => {
    const newChecklist = [...checklist];
    newChecklist[index].text = value;
    setChecklist(newChecklist);
  };

  // Remove an item from the checklist
  const handleRemoveItem = (index) => {
    const newChecklist = checklist.filter((_, i) => i !== index);
    setChecklist(newChecklist);
  };

  // Handle form submission to create a new note
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate that there is some content
    if (
      !title &&
      !text &&
      type === "checklist" &&
      checklist.every((i) => !i.text)
    )
      return;

    // Filter empty checklist items
    const validChecklist = checklist.filter((item) => item.text.trim() !== "");

    // Dispatch addNote action
    dispatch(
      addNote({
        title,
        type,
        text: type === "text" ? text : "",
        checklist: type === "checklist" ? validChecklist : [],
        isPinned: false,
      }),
    );

    // Reset form state
    setTitle("");
    setText("");
    setChecklist([{ text: "", isCompleted: false }]);
    setIsExpanded(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 transition-all duration-300 relative overflow-hidden group max-w-2xl mx-auto mb-8"
    >
      {/* Expanded Form */}
      <div className={`space-y-4 ${isExpanded ? "block" : "hidden"}`}>
        {/* Type Toggle */}
        <div className="flex gap-4 border-b border-gray-100 pb-2">
          <button
            type="button"
            onClick={() => setType("text")}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              type === "text"
                ? "text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <FaAlignLeft /> Text
          </button>
          <button
            type="button"
            onClick={() => setType("checklist")}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              type === "checklist"
                ? "text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <FaListUl /> Checklist
          </button>
        </div>

        {/* Title Section */}
        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-lg font-bold placeholder-gray-400 border-none outline-none bg-transparent focus:ring-0"
        />
      </div>

      {/* Content Area */}
      <div onClick={() => setIsExpanded(true)} className="min-h-[40px] mt-4">
        {type === "text" ? (
          <textarea
            placeholder={isExpanded ? "Take a note..." : "Take a note..."}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`w-full resize-none border-none outline-none bg-transparent placeholder-gray-500 text-gray-700 focus:ring-0 ${
              isExpanded ? "min-h-[100px]" : "min-h-[40px]"
            }`}
          />
        ) : (
          <div className="space-y-3">
            {/* Checklist Header */}
            {isExpanded && (
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium pb-2 border-b border-gray-100">
                <FaListUl className="text-blue-500" />
                <span>Checklist Items</span>
              </div>
            )}

            {/* Checklist Items */}
            <div className="space-y-2">
              {checklist.map((item, index) => (
                <div key={index} className="flex items-center gap-3 group/item">
                  <input
                    type="checkbox"
                    disabled
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 cursor-not-allowed"
                  />
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) =>
                      handleChecklistChange(index, e.target.value)
                    }
                    placeholder={`Item ${index + 1}`}
                    className="flex-1 border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 focus:ring-0 py-1"
                    autoFocus={index === checklist.length - 1 && isExpanded}
                  />
                  {checklist.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="opacity-0 group-hover/item:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1 rounded hover:bg-red-50"
                      title="Remove item"
                    >
                      <FaTimes size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Item Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleAddItem();
              }}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium mt-3 px-2 py-1 rounded-lg hover:bg-blue-50 transition-all"
            >
              <FaPlus size={12} /> Add item
            </button>
          </div>
        )}
      </div>

      {/* Actions */}
      {isExpanded && (
        <div className="flex justify-end pt-4 border-t border-gray-100 mt-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
            }}
            className="text-gray-500 hover:text-gray-700 font-medium px-4 py-2 text-sm mr-2"
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            Create
          </button>
        </div>
      )}
    </form>
  );
};

export default CreateNote;
