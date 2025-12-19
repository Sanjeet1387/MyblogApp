//RTE :- means Real Time Editor

// import React from "react";
// import {Editor} from '@tinymce/tinymce-react'
// import {Controller} from 'react-hook-form'

// export default function RTE({name, control, label, defaultValue=""}){
//     return (
//         <div className="w-full">
//             {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

//             <Controller
//                 name={name || "content"} //name as it is le lenge, nahi toh content le lenge
//                 control={control} //ye control dega parent element ko, jo bhi isko call karega

//                 //now render kaise hoti hai, wo kafi important hai -> for this read docs or go for chatgpt to understand
//                 render={({field: {onChange}}) => ( //it means iss field ke sath kuchh bhi changes hota hai, inform kar dena render k sath
//                     //ab yaha par aata hai, jo field hume render karwana hai, chahe wo Input field ya koi aur ho sakta hai, yaha par Editor hai
//                     <Editor
//                     initialValue={defaultValue}
//                     init={{
//                         initialValue: defaultValue,
//                         height: 500,
//                         menubar: true,
//                         plugins: [
//                             "image",
//                             "advlist",
//                             "autolink",
//                             "lists",
//                             "link",
//                             "image",
//                             "charmap",
//                             "preview",
//                             "anchor",
//                             "searchreplace",
//                             "visualblocks",
//                             "code",
//                             "fullscreen",
//                             "insertdatetime",
//                             "media",
//                             "table",
//                             "code",
//                             "help",
//                             "wordcount",
//                             "anchor",
//                         ],
//                         toolbar:
//                         "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
//                         content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
//                     }}
//                     onEditorChange={onChange} //means Editor me kuchh bhi change ho, toh hamari field govern ho rahi hai onChange se
//                     />
//                 )}
//             />
//         </div>
//     )
// }

import React from "react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <textarea
            className="w-full p-2 border rounded-md"
            rows={10}
            value={value}
            onChange={onChange}
            placeholder="Enter content here..."
          />
        )}
      />
    </div>
  );
}
