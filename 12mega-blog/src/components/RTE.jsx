import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import "./tinymce-setup";

// Rich text editor wired into react-hook-form via <Controller>.
// Usage: <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
const RTE = ({ name, control, label, defaultValue = "" }) => {
    return (
        <div className="w-full">
            {label && <label className="mb-1 inline-block pl-1">{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Editor
                        licenseKey="gpl"
                        initialValue={defaultValue}
                        value={value}
                        onEditorChange={onChange}
                        onBlur={onBlur}
                        init={{
                            height: 500,
                            menubar: true,
                            skin: "oxide-dark",
                            content_css: "dark",
                            plugins: [
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "help",
                                "wordcount",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | " +
                                "alignleft aligncenter alignright alignjustify | " +
                                "bullist numlist outdent indent | removeformat | help",
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                    />
                )}
            />
        </div>
    );
};

export default RTE;
