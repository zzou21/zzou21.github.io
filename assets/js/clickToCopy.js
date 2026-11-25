// this JS allows the website to let user copy a text after clicking on it 


function clickToCopy(button, replacementText) {
    // the "replacementText" parameter holds the text that the click to copy button should use to replace "Copied" with after a few seconds

    // to use this function, example
    //   <p>Reach me at: <i><span id="textToCopyOnClick">zou.z.zhihui@gmail.com</span></i> <button onclick="clickToCopy(this, 'Copy email')" class="cursorpointer">Copy email</button></p> 
    
    const text = document.getElementById("textToCopyOnClick").textContent

    // Copy the text inside the text field
    navigator.clipboard.writeText(text)
    .then(() =>{
        button.textContent = "Copied";
        setTimeout(() => (button.textContent = replacementText), 1500);
    })
}
