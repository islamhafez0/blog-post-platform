import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { useAuth } from "../hooks/useAuth";
import TextEditor from "../components/layout/TextEditor";
import { Spinner } from "../components/common/Spinner";
import { containsArabicCharacters } from "../utils/helpers";

const AddPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    tags: "",
    imageURL:
      "https://cdn.prod.website-files.com/639ac663a95e0ede3aa1ceb8/63e379fab480b8fbd40aa3dd_Thumbnail-p-1080.png",
    category: "",
    body: "",
  });
  const [formErrors, setFormErrors] = useState({
    title: "",
    tags: "",
    imageURL: "",
    category: "",
    body: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const handleQuillChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      body: value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      body: "",
    }));
  };

  const validateForm = (): boolean => {
    let valid = true;
    let newErrors = { ...formErrors };
    const { title, imageURL, category, body, tags } = formData;
    if (!title.trim()) {
      newErrors.title = "Title is required";
      valid = false;
    }
    if (!tags.trim()) {
      newErrors.tags = "Tags are required. One tag at least.";
    }
    if (!imageURL.trim()) {
      newErrors.imageURL = "Image URL is required";
      valid = false;
    }
    if (!category.trim()) {
      newErrors.category = "Category is required";
      valid = false;
    }
    if (!body.trim()) {
      newErrors.body = "Body is required";
      valid = false;
    }
    setFormErrors(newErrors);
    return valid;
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (validateForm()) {
        const ref = collection(db, "posts");
        const doc = await addDoc(ref, {
          ...formData,
          createdAt: serverTimestamp(),
          authorName: user?.displayName,
          authorId: user?.uid,
        });
        setFormData({
          title: "",
          excerpt: "",
          tags: "",
          imageURL: "",
          category: "",
          body: "",
        });
        navigate(`/blog/posts/${doc.id}`);
      }
    } catch (error) {
      console.error("Error adding post: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 bg-white min-h-screen">
      <h2 className="flex items-center gap-2 text-3xl font-medium">
        <img src="/assets/icons/add-post.svg" alt="" />
        Add Post
      </h2>
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col w-full mb-8 relative text-gray-500 group">
            <label
              className={`
              text-gray-300 absolute top-1/2 -translate-y-1/2 left-2 text-sm px-1 pointer-events-none select-none group-focus-within:!-top-0.5 group-focus-within:text-gray-600 group-focus-within:bg-white _transition
              ${formData["title"].trim() && "!-top-0.5 text-gray-600 bg-white"}
              `}
              htmlFor={"title"}
            >
              Title
            </label>
            <input
              onChange={handleInputChange}
              value={formData.title}
              dir={containsArabicCharacters(formData.title) ? "rtl" : "ltr"}
              className={`
              bg-transparent border-gray-300 border px-2.5 py-1 rounded-sm outline-none  transition-all duration-200 ease-in-out group-focus-within:border-gray-600
              ${formData["title"].trim() && "border-gray-600"}
              `}
              type="text"
              name="title"
              id="title"
            />
            {formErrors.title && (
              <p className="absolute -bottom-5 text-red-500 text-sm">
                {formErrors.title}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full mb-8 relative text-gray-500 group">
            <label
              className={`
              text-gray-300 absolute top-1/2 -translate-y-1/2 left-2 text-sm px-1 pointer-events-none select-none group-focus-within:!-top-0.5 group-focus-within:text-gray-600 group-focus-within:bg-white _transition
              ${
                formData["excerpt"].trim() && "!-top-0.5 text-gray-600 bg-white"
              }
              `}
              htmlFor={"excerpt"}
            >
              Subtitle (Optional)
            </label>
            <input
              onChange={handleInputChange}
              value={formData.excerpt}
              dir={containsArabicCharacters(formData.excerpt) ? "rtl" : "ltr"}
              className={`bg-transparent border-gray-300 border px-2.5 py-1 rounded-sm outline-none  transition-all duration-200 ease-in-out group-focus-within:border-gray-600 ${
                formData["excerpt"].trim() && "border-gray-600"
              }`}
              type="text"
              name="excerpt"
              id="excerpt"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-4">
          <div className="flex flex-col w-full mb-8 relative text-gray-500 group">
            <label
              className={`text-gray-300 absolute top-1/2 -translate-y-1/2 left-2 text-sm px-1 pointer-events-none select-none group-focus-within:!-top-0.5 group-focus-within:text-gray-600 group-focus-within:bg-white _transition ${
                formData["tags"].trim() && "!-top-0.5 text-gray-600 bg-white"
              }`}
              htmlFor={"tags"}
            >
              Tags (separted by comma)
            </label>
            <input
              onChange={handleInputChange}
              value={formData.tags}
              dir={containsArabicCharacters(formData.tags) ? "rtl" : "ltr"}
              className={`bg-transparent border-gray-300 border px-2.5 py-1 rounded-sm outline-none  transition-all duration-200 ease-in-out group-focus-within:border-gray-600 ${
                formData["tags"].trim() && "border-gray-600"
              }`}
              type="text"
              name="tags"
              id="tags"
            />
            {formErrors.tags && (
              <p className="absolute -bottom-5 text-red-500 text-sm">
                {formErrors.tags}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full mb-8 relative text-gray-500 group">
            <label
              className={`text-gray-300 absolute top-1/2 -translate-y-1/2 left-2 text-sm px-1 pointer-events-none select-none group-focus-within:!-top-0.5 group-focus-within:text-gray-600 group-focus-within:bg-white _transition ${
                formData["imageURL"].trim() &&
                "!-top-0.5 text-gray-600 bg-white"
              }`}
              htmlFor={"imageURL"}
            >
              Image URL
            </label>
            <input
              onChange={handleInputChange}
              value={formData.imageURL}
              className={`bg-transparent border-gray-300 border px-2.5 py-1 rounded-sm outline-none  transition-all duration-200 ease-in-out group-focus-within:border-gray-600 ${
                formData["imageURL"].trim() && "border-gray-600"
              }`}
              type="text"
              name="imageURL"
              id="imageURL"
            />
            {formErrors.imageURL && (
              <p className="absolute -bottom-5 text-red-500 text-sm">
                {formErrors.imageURL}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full mb-8 relative text-gray-500 group">
            <label
              className={`text-gray-300 absolute top-1/2 -translate-y-1/2 left-2 text-sm px-1 pointer-events-none select-none group-focus-within:!-top-0.5 group-focus-within:text-gray-600 group-focus-within:bg-white _transition
              ${
                formData["category"].trim() &&
                "!-top-0.5 text-gray-600 bg-white"
              }
              `}
              htmlFor={"category"}
            >
              Category
            </label>
            <input
              onChange={handleInputChange}
              value={formData.category}
              dir={containsArabicCharacters(formData.category) ? "rtl" : "ltr"}
              className={`bg-transparent border-gray-300 border px-2.5 py-1 rounded-sm outline-none  transition-all duration-200 ease-in-out group-focus-within:border-gray-600 ${
                formData["category"].trim() && "border-gray-600"
              }`}
              type="text"
              name="category"
              id="category"
            />
            {formErrors.category && (
              <p className="absolute -bottom-5 text-red-500 text-sm">
                {formErrors.category}
              </p>
            )}
          </div>
        </div>
        <div className="relative flex flex-col w-full mb-8">
          <TextEditor
            value={formData.body}
            handleQuillChange={handleQuillChange}
          />
          {formErrors.body && (
            <p className="absolute -bottom-5 text-red-500 text-sm">
              {formErrors.body}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="grid place-content-center text-white bg-blue-600 px-4 h-8 rounded-sm hover:bg-blue-500 active:bg-blue-600 transition-all duration-200 ease-in-out outline-none disabled:bg-blue-400 mt-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex gap-2 items-center">
              Processing... <Spinner classNames={["h-4", "w-4"]} />
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
