// GUIDE TO BUILD THE INSTALLATION TERMINAL
// set a value for preperation (get it from local storage if user is created)
// if the value is (not installed yet) then load the terminal
// if not then load the sign in screen
// for now there is no sign in screen so it is just the terminal
// load the installation terminal content
// the terminal "dir and command writing spot" will be stored in an object
// for now there is no dir change
// the input field is automatically activated
// when user presses "enter" it checks for the input field
// if input field is empty then display "please enter a valid command"
// display another dir and command spot, activate the text input, add all those to an array
// each time the enter button is pressed, the terminal is emptied out, 
// and the needed items are put inside an array
// the terminal will load all the content

let cmd_content = [];

let instal_terminal_window = document.createElement("div");
instal_terminal_window.className = "installation-terminal-window"

let existing_user = false;
if (existing_user) {
    document.body.innerHTML = "";
    // load welcome screen
} else {
    document.body.innerHTML = "";
    loadCMD();
}

function loadCMD() {
    let cmd_guide_text
    let error = null;

    if (!existing_user && error === null) {
        cmd_guide_text = `
            JavaScript OS Installation Process<br>
            Enter "<b>HELP</b>" to see all available commands
        `
    } else {
        cmd_guide_text = `
            Welcome
        `
    }

    let cmd_guide = new Object({
        element: "div",
        class: "cmd-guide-content",
        text: cmd_guide_text,
        type: "text",
    });

    let cmd_input = new Object({
        element: "div",
        class: "terminal-input",
        type: "input",
    });
    
    let cmd_input_text = new Object({
        element: "input",
        type: "text",
        id: "text", 
        class: "terminal-command-input", 
    });

    let cmd_input_label = new Object({
        element: "label",
        for: cmd_input_text.id,
        class: "terminal-cmd-dir",
    });

    cmd_input_label.text = "JSOS/:>";

    cmd_input.label = cmd_input_label;
    cmd_input.text = cmd_input_text;

    cmd_content.push(cmd_guide);
    cmd_content.push(cmd_input);

    cmd_content.forEach(i => {
        let node = document.createElement(i.element);
        node.className = i.class;
        if (i.type === "text") {
            node.innerHTML = i.text;
        } else if (i.type === "input") {
            let node_label = document.createElement(i.label.element);
            node_label.className = i.label.class;
            node_label.for = i.label.for;

            let node_input = document.createElement(i.text.element);
            node_input.id = i.text.id;
            node_input.className = i.text.class;
            node_input.type = i.text.type;
            node.appendChild(node_label);
            node.appendChild(node_input);
        }
        
        instal_terminal_window.appendChild(node);
        console.log(i);
    });
    
    document.body.appendChild(instal_terminal_window);
}

// possible commands to enter: 
// color [hex / name]: change the color of the terminal
// bgcolor [hex / name]: change the background color of the terminal
// title [string]: changes the window title
// echo [string]: just prints a message
// cls: clears the cmd
// install [winOS | JSOS | macOS | Linux]: displays a funny message for each one, but installs legit JSOS
// quit: closes the entire window altogether