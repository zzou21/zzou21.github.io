// this JS allows the website to let user copy a text after clicking on it 

function clickToCopy(button, replacementText) {
    const text = document.getElementById("textToCopyOnClick").textContent

    // Copy the text inside the text field
    navigator.clipboard.writeText(text)
    .then(() =>{
        button.textContent = "Copied";
        setTimeout(() => (button.textContent = replacementText), 1500);
    })
}
