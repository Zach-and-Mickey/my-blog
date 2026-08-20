const titleInput = document.getElementById("title");
const dateInput = document.getElementById("date");
const slugInput = document.getElementById("slug");
const contentInput = document.getElementById("content");

const wordCount = document.getElementById("word-count");

const publishButton = document.getElementById("publish");
const downloadButton = document.getElementById("download");

const status = document.getElementById("status");


// Set today's date

const today = new Date();

const formattedDate =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");

dateInput.value = formattedDate;



// Generate slug from title

titleInput.addEventListener("input", () => {

    const slug = titleInput.value

        .toLowerCase()

        .trim()

        .replace(/[^a-z0-9\s-]/g, "")

        .replace(/\s+/g, "-")

        .replace(/-+/g, "-");

    slugInput.value = slug;

});



// Word counter

contentInput.addEventListener("input", updateWordCount);


function updateWordCount() {

    const text =
        contentInput.value
            .trim();

    if (!text) {

        wordCount.textContent =
            "0 words";

        return;
    }


    const words =
        text.split(/\s+/).length;


    wordCount.textContent =
        `${words} words`;

}



// Markdown formatting buttons

document
    .querySelectorAll("[data-action]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                handleToolbarAction(
                    button.dataset.action
                );

            }
        );

    });



function handleToolbarAction(action) {

    const start =
        contentInput.selectionStart;

    const end =
        contentInput.selectionEnd;

    const selected =
        contentInput.value.substring(
            start,
            end
        );


    let replacement = "";


    switch (action) {

        case "bold":

            replacement =
                `**${selected || "bold text"}**`;

            break;


        case "italic":

            replacement =
                `*${selected || "italic text"}*`;

            break;


        case "heading":

            replacement =
                `## ${selected || "Heading"}`;

            break;


        case "link":

            replacement =
                `[${selected || "link text"}](https://)`;

            break;


        case "image":

            replacement =
                `![${selected || "image description"}](image-url)`;

            break;


        case "preview":

            previewPost();

            return;

    }


    contentInput.setRangeText(
        replacement,
        start,
        end,
        "end"
    );


    contentInput.focus();

    updateWordCount();

}



// Generate Jekyll post

function generatePost() {

    const title =
        titleInput.value.trim();

    const date =
        dateInput.value;

    const slug =
        slugInput.value.trim();

    const content =
        contentInput.value.trim();


    if (!title) {

        alert(
            "Give the post a title."
        );

        return null;
    }


    if (!date) {

        alert(
            "Select a publish date."
        );

        return null;
    }


    if (!slug) {

        alert(
            "The filename cannot be empty."
        );

        return null;
    }


    if (!content) {

        alert(
            "Your post is currently just a title. Add some content."
        );

        return null;
    }


    const filename =
        `${date}-${slug}.md`;


    const markdown = `---
layout: post
title: "${title}"
date: ${date}
---

${content}
`;


    return {

        filename,
        markdown

    };

}



// Download draft

downloadButton.addEventListener(
    "click",
    () => {

        const post =
            generatePost();

        if (!post) return;


        const blob =
            new Blob(
                [post.markdown],
                {
                    type:
                        "text/markdown"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href =
            url;


        link.download =
            post.filename;


        link.click();


        URL.revokeObjectURL(url);


        status.textContent =
            "Draft downloaded.";

    }
);



// Publish button
//
// We will connect this to GitHub
// once the editor is working.

publishButton.addEventListener(
    "click",
    () => {

        const post =
            generatePost();

        if (!post) return;


        console.log(
            "Ready to publish:",
            post
        );


        status.textContent =
            `Ready to publish: ${post.filename}`;


        alert(
            "The post was generated successfully.\n\n" +
            "Next step: connect this button to GitHub."
        );

    }
);



// Simple preview

function previewPost() {

    const content =
        contentInput.value;


    const previewWindow =
        window.open(
            "",
            "_blank"
        );


    previewWindow.document.write(`

        <html>

        <head>

            <title>Post Preview</title>

            <style>

                body {

                    max-width: 800px;

                    margin: 50px auto;

                    padding: 20px;

                    font-family:
                        Arial,
                        sans-serif;

                    line-height: 1.7;

                }

            </style>

        </head>


        <body>

            <h1>
                ${titleInput.value}
            </h1>

            <pre style="
                white-space: pre-wrap;
                font-family: inherit;
            ">
${content}
            </pre>

        </body>

        </html>

    `);

}
