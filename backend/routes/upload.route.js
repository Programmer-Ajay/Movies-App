import { Router } from "express";

const router=Router();
import path from "path";
import express from 'express'
import multer from "multer";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads");
    },
    filename:(req,file,cb)=>{
        const extname=path.extname(file.originalname);
        cb(null,`${file.fieldname}-${Date.now()}${extname}`)
    }
    // path.extname is taking after the . in the file  like .jpg .png

});

const  fileFilter =(req,file,cb)=>{
    const filetypes = /jpe?g|png|webp/;
      const mimetypes = /image\/jpe?g|image\/png||image\/webp/;
       const extname = path.extname(file.originalname);
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({storage,fileFilter});
const uploadSingleImage=upload.single("image");

router.route("/").post((req,res)=>{
    //multer middleWARE
    uploadSingleImage(req,res,(err)=>{
        if(err){
              res.status(400).send({ message: err.message });
        }else if(req.file){
          console.log("File:",req.file);
          res.status(200).send({
            message:"Images uploaded successfully",
            image:`/${req.file.path}`,
          });
        }else{
            res.status(400).send({ message: "No image file provided" });
        }
    })
})






/*
MIME stands for Multipurpose Internet Mail Extensions.

📌 It is a standard way to describe the type of content being sent over the internet.

It tells the browser (or server) what kind of file or data is being handled, so it knows how to process or display it.
*/
export default router;






/*
What is cb() in Multer?
In multer.diskStorage(), both destination and filename are functions that receive a callback function cb() as their third argument.

That cb() is used to tell Multer:

✅ Where to store the file

✅ What filename to save it as

Multer internally waits for you to call cb() to proceed.

✅ Let’s break your code line-by-line:
js
Copy
Edit
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
🔍 What’s happening here:
destination function is called by Multer for each file being uploaded.

It takes 3 arguments:

req: the HTTP request object

file: metadata about the file (like name, mimetype, etc.)

cb: a callback function you must call with:

First argument: null (no error)

Second argument: the path to the upload folder ("uploads/")

⏱ When it runs: Right when Multer receives the uploaded file, before it writes the file to disk, it calls this function to ask:

“Hey, where should I save this file?”



-------------------------------------
 What is a Callback Function?
A callback function is a function that is passed as an argument to another function, and it is called (executed) later, usually after some task is done.

Think of it as saying: “Hey function, when you're done, call this other function to finish the job.”

🧠 Basic Difference
Feature	Normal Function	Callback Function
Definition	A standalone function you call directly	A function passed as an argument to another function
Who calls it?	You call it	Another function calls it when needed
Used for...	General logic	Handling async tasks, event responses, or post-actions

🧪 Example 1: Normal Function
js
Copy
Edit
function greet() {
  console.log("Hello, Ajay!");
}

greet();  // You call it directly
🧪 Example 2: Callback Function
js
Copy
Edit
function greetUser(name, callback) {
  console.log("Hi " + name);
  callback(); // Call the function passed in as a callback
}

function sayBye() {
  console.log("Goodbye!");
}

greetUser("Ajay", sayBye);
✅ Output:
nginx
Copy
Edit
Hi Ajay
Goodbye!
sayBye is passed into greetUser and called later = callback

📦 Real-World Use: File Upload Example with Multer
js
Copy
Edit
destination: (req, file, cb) => {
  cb(null, "uploads/");
}
Here:

cb is a callback function.

You don’t define cb. Multer gives it to you.

You just call it to tell Multer what to do next.

So cb() is like saying:

“Hey Multer, I’m done, and here's the folder where you can save the file.”

⚙️ Why Callbacks Are Useful
Handle asynchronous operations (like uploading, reading files, databases)

React to events (button click, data load, etc.)

Allow more flexible and reusable functions

🔁 Visual Analogy
Imagine you're ordering food:

You tell the restaurant: “Call me back when it’s ready”

Your phone number = callback function

The restaurant = Multer or some async task

They call you later = call the callback

Let me know if you'd like to see examples with arrow functions, async/await, or how callbacks differ from Promises!



---------------------------------------

🔁 What's Happening in This Code?
🚨 You are doing:
A POST request comes to the server at /.

You handle that request using an arrow function:

t
(req, res) => { ... }
Inside that, you call uploadSingleImage(req, res, callback).

This is a middleware function from Multer.

It processes the file upload.

Once the upload is done, Multer calls another function (the callback):

js
Copy
Edit
(err) => { ... }
✅ Why Use Nested Functions?
This is how asynchronous operations are handled in Node.js using callbacks.

Here’s a simplified explanation:

js
Copy
Edit
// Outer function = handles the HTTP request
(req, res) => {

  // Inner function = handles the result of uploadSingleImage (callback)
  uploadSingleImage(req, res, (err) => {

    // This part only runs AFTER the file is uploaded
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({ message: "Image uploaded", image: req.file.path });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });

}
*/