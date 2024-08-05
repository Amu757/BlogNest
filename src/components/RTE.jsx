import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import "./components.css"
export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="rte-container">
      {label && <label className="">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="y3frfullyteoajw6ry8jwg57ufua7g3tptzrnvp4cpunsu1d"
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,

              plugins: [
                "autolink",
                "lists",
                "link",
                "preview",
                "anchor",
                "searchreplace",
                "fullscreen",
                "insertdatetime",
                "help",
                "wordcount",
                "anchor",
              ],

              
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",

              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
              ],
              ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
