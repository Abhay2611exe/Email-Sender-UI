import React, { useState } from "react";
import toast from "react-hot-toast";
import { sendEmail } from "../services/email.service";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

function EmailSender() {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const editorRef = useRef(null);

  function handleFieldChange(event, name) {
    setEmailData({ ...emailData, [name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      emailData.to == "" ||
      emailData.subject == "" ||
      emailData.message == ""
    ) {
      toast.error("Invalid Fields");
      return;
    }

    //Sending email using API
    try {
      setSending(true);
      await sendEmail(emailData);
      toast.success("Email sent successfully !");
      toast.success("Send another email...");
      sendEmailData({
        to: "",
        subject: "",
        message: "",
      });
      editorRef.current.getContent("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send email. Please try again later.");
    } finally {
      setSending(false);
    }
    console.log(emailData);
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="email_card md:w-1/2 w-full p-4 rounded border shadow">
        <h1 className="text-gray-900 dark:text-white font-semibold text-2xl">
          Email-Sender
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Create your own mail & send to your favourite person with your App
        </p>

        <form action="" onSubmit={handleSubmit}>
          {/* For Recipient's Email Input-Field */}
          <div className="input_fields mt-7 relative">
            <label
              for="floating_recipient_email"
              className="block font-medium peer-focus:font-medium absolute text-sm text-gray-900 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-700 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 mb-auto"
            >
              Recipient's Email:
            </label>

            <input
              value={emailData.to}
              onChange={(event) => handleFieldChange(event, "to")}
              type="email"
              name="floating_email"
              id="floating_email"
              className="block  font-medium py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
          </div>

          {/* For Mail Subject Input-Field */}
          <div className="input_fields mt-4 relative ">
            <label
              for="floating_subject"
              className="font-medium peer-focus:font-medium absolute text-sm text-gray-900 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Mail Subject:
            </label>

            <input
              value={emailData.subject}
              onChange={(event) => handleFieldChange(event, "subject")}
              type="text"
              name="floating_email"
              id="floating_email"
              className="block font-medium py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
          </div>

          {/* For Body of the Mail  */}
          <div className="input_fileds mt-4 relative">
            <label
              for="message"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your message
            </label>

            {/* <textarea
              value={emailData.message}
              onChange={(event) => handleFieldChange(event, "message")}
              id="message"
              rows="7"
              className="block p-2.5 w-full text-sm font-medium text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-blue-600 peer-focus:font-medium focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600"
              placeholder="Write your Message here..."
            ></textarea> */}
            <Editor

            onEditorChange={(event) => {
              setEmailData({...emailData, message: editorRef.current.getContent()});
            }}
              onInit={(evt, editor) => {editorRef.current = editor}}
              apiKey="f90b7rqd2sgc38gynjbkywfa5gup42k1pk2uuck1di2m2db1"
               initialValue="<p>This is the initial content of the editor.</p>"
              
               init={{
                plugins: [
                  // Core editing features
                  'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                  // Your account includes a free trial of TinyMCE premium features
                  // Try the most popular premium features until Jan 26, 2025:
                  'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                  { value: 'First.Name', title: 'First Name' },
                  { value: 'Email', title: 'Email' },
                ],
                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
              }}
            />
          </div>

          {/* Loader  */}
          {sending && (
            <div className="loader flex-col gap-2 items-center flex justify-center mt-4">
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
              <h1 className="text-lg dark:text-white">Sending Email....</h1>
            </div>
          )}

          {/* For Buttons */}
          <div className="form_buttons mt-4 flex justify-center gap-4">
            <button
              disabled={sending}
              type="submit"
              className="font-medium text-white px-4 py-2 rounded bg-blue-600 hover:bg-blue-900"
            >
              Send Email
            </button>
            <button className="font-medium text-white px-4 py-2 rounded bg-red-600 hover:bg-red-900">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmailSender;
