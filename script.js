let cmd_content = [];

let installation_corrupted = false;

let dialogue = [];

let delay = 0;

let instal_terminal_window = document.createElement("div");
instal_terminal_window.className = "installation-terminal-window"

let existing_user = false;
if (existing_user) {
    document.body.innerHTML = "";
    // load welcome screen
} else {
    // document.body.innerHTML = "";
    // loadCMD(null);
    installOS();
}

document.addEventListener("keypress", function (e) {
    let key = e.key;
    if (key === "Enter") {
        addCMDContent();
    }
})

function addCMDContent() {
    let command_element = document.querySelectorAll(".terminal-command-input");
    let command = command_element[command_element.length - 1].value;
    let action;
    let value = null;
    if (command === "") {
        loadCMD("empty");
    } else {
        if (command.indexOf(" ") === -1) {
            action = command;
        } else {
            for (let i = 0; i <= command.length; i++) {
                if (command[i] === " ") {
                    action = command.substr(0, i);
                    value = command.substr(i + 1, command.length);
                    break;
                }
            }
        }
        actionCMD(action, value);
    }
}

function actionCMD(act, val) {
    if (act === "cls") {
        clearCMD();
    } else if (act === "color") {
        if (setColor(parseInt(val)) !== "err_invalid_value") {
            instal_terminal_window.style.color = setColor(parseInt(val));
            loadCMD("success");
        } else {
            loadCMD("invalid");
        }
    } else if (act === "bgcolor") {
        if (setColor(parseInt(val)) !== "err_invalid_value") {
            instal_terminal_window.style.backgroundColor = setColor(parseInt(val));
            loadCMD("success");
        } else {
            loadCMD("invalid");
        }
    } else if (act === "title") {
        if (val !== null) {
            document.title = val;
            loadCMD("success");
        } else {
            loadCMD("invalid");
        }
    } else if (act === "echo") {
        if (val !== null) {
            loadCMD("echo", val);
        } else {
            loadCMD("invalid");
        }
    } else if (act === "quit") {
        loadCMD("quit");
        window.setTimeout(function () {
            window.close();
        }, 1000)
    } else if (act === "install") {
        install(val);
    } else if (act === "help") {
        loadCMD("help");
    } else if (act === "mohemmat") {
        loadCMD("mohemmat");
    } else if (act === "bluey") {
        loadCMD("bluey");
    } else if (act === "command") {
        loadCMD("command");
    } else {
        loadCMD("cmd-invalid", act);
    }
}

function loadCMD(action, string) {
    instal_terminal_window.innerHTML = "";
    
    let cmd_guide_text;

    if (!existing_user && action === null) {
        cmd_guide_text = `
            JavaScript OS Installation Process<br>
            Enter "<b>HELP</b>" to see all available commands
        `
    } else if (action === "empty") {
        cmd_guide_text = `
            Please Enter a Valid Command
        `
    } else if (action === "success") {
        cmd_guide_text = `success`;
    } else if (action === "invalid") {
        cmd_guide_text = `INVALID, Please Enter a Valid Value`;
    } else if (action === "echo") {
        cmd_guide_text = string;
    } else if (action === "quit") {
        cmd_guide_text = `Quitting...`;
    } else if (action === "jsos") {
        cmd_guide_text = `installing`;
        installOS();
    } else if (action === "winOS") {
        cmd_guide_text = `Get a life lmao, who still uses windows in 2024`;
    } else if (action === "macOS") {
        cmd_guide_text = `Bro thinks he got a 2000$ apple computer LMAOOO get a life bro`;
    } else if (action === "linux") {
        cmd_guide_text = `Nah you wanna start hacking, well sorry NERD but i aint here for that shit`;
    } else if (action === "help") {
        cmd_guide_text = `
            COMMAND
             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            FUNCTION 
            <br>
            <br>
            <br>

            HELP
             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            DISPLAY THIS MENU
            <br>
            <br>
            COLOR   
             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            CHANGE THE TEXT COLOR [0 - 9] 
            <br>
            <br>
            BGCOLOR   
             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            CHANGE THE BACKGROUND COLOR [0 - 9] 
            <br>
            <br>
            ECHO
             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            DISPLAY A MESSAGE [string] 
            <br>
            <br>
            INSTALL
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            INSTALL OS [winOS | macOS | linux | jsOS]
            <br>
            <br>
            TITLE
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            CHANGE THE SESSION TITLE [string]
            <br>
            <br>
            CLS
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            CLEAR THE COMMAND PROMPT
            <br>
            <br>
            QUIT
             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            CLOSE THE PROMPT
        `;
    } else if (action === "cmd-invalid") {
        cmd_guide_text = `"${string}" is not a valid command, please enter "<b>HELP</b>" to see all available commands `;
    } else if (action === "command") {
        cmd_guide_text = `this is a CMD :D`
    } else if (action === "mohemmat") {
        cmd_guide_text = `ALL HAIL OUR CREATOR, THE MOST POWERFUL, THE MOST BEAUTIFUL, ALL HAIL MOHEMMAT`;
    } else if (action === "bluey") {
        cmd_guide_text = `bluey mentioned :banditdance: :patjamming: :bingoYEAH: :blueythumbsup:`;
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

    cmd_input_label.text = `\n JSOS/:>`;

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
            node_label.innerText = i.label.text;

            let node_input = document.createElement(i.text.element);
            node_input.id = i.text.id;
            node_input.className = i.text.class;
            node_input.type = i.text.type;
            node_input.style.width = `calc(750px - ${node_label.style.width})`

            if (cmd_content.indexOf(i) < cmd_content.length - 1) {
                node_input.disabled = true;
            } else {
                node_input.disabled = false;
            }

            node.appendChild(node_label);
            node.appendChild(node_input);
        }
        
        instal_terminal_window.appendChild(node);
    });
    
    document.body.appendChild(instal_terminal_window);
    instal_terminal_window.scrollTo(0, 999999999999999999999999999999);
}

function clearCMD() {
    instal_terminal_window.innerHTML =  "";
    cmd_content = [];
    loadCMD(null);
}

function install(string) {
    if (string === "winOS") {
        loadCMD("winOS");
    } else if (string === "macOS") {
        loadCMD("macOS");
    } else if (string === "linux") {
        loadCMD("linux");
    } else if (string === "jsOS") {
        loadCMD("jsos");
    } else {
        loadCMD("invalid");
    }
}

function setColor(i) {
    let color;
    switch(i) {
        default:
            color = "err_invalid_value";
            break;
        case 1:
            color = "white";
            break;
        case 2:
            color = "red";
            break;
        case 3:
            color = "green";
            break;
        case 4:
            color = "blue";
            break;
        case 5:
            color = "yellow";
            break;
        case 6:
            color = "orange";
            break;
        case 7:
            color = "pink";
            break;
        case 8:
            color = "purple";
            break;
        case 9:
            color = "lightblue";
            break;
        case 0:
            color = "black";
            break;
    }
    return color;
}

////////////////////////////////INSTALLATION BEGINS////////////////////////////////////////////

// GUIDE TO INSTALLATION:
//  a loading menu replica of the windows 10 installation will be shown
// install speed will be determined randomly
// install page containes: loading bar, currently downloading, instructions.
// when download is completed, the boring loading page is shown
// user greeted, making settings (username, password, background, profile, etc)
// one last click before user has full access to the system

let startup_loading = document.createElement("div");
startup_loading.className = "os";
startup_loading.innerHTML = 
`
    <div class="os-logo">
        JavaScript OS
    </div>
    <div class="loading">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
    </div>
`

let initial_setup = document.createElement("div");
initial_setup.className = "initial-setup"

let window_ = document.createElement("div");
window_.className = "window";
let installation_startPage = `
<div btn="" class="close-installation" id="abort-installation">X</div>
<span class="text setup-intro">Welcome to JavaScript OS Setup Process</span>
<div btn="" class="setup-btn" id="setup-proceed">Proceed</div>
`

let instructions = `
    <div btn="" class="close-installation" id="abort-installation">X</div>
    <span class="text setup-instructions">INSTRUCTIONS</span>
    <span class="text-instructions">
        PLEASE READ CAREFULLY BEFORE PROCEEDING: <br>
        CLICKING "PROCEED" WITHOUT READING COULD POTENTIALLY HARM YOUR SYSTEM <br>
        <br>
        1- After clicking "proceed", JavaScriptOS will be automatically installed on your device,
        it will be the only accessible OS on your device, and you CAN'T replace it with any other OS
        <br><br>
        2- The installation process may take some time ranging from a couple of minutes, to almost 24 hours
        <br><br>
        3- If the installation process is interrupted for any reason, your device might be corrupted beyond maintenance
        <br><br>
        4- After the installation process terminates, you will be prompted to set a username, a password,
        a profile picture, and a background image, you can fully customize your OS user anyway you like
        <br><br>
        5- You will need to remember your password as you will be required to enter it everytime you want to sign in, 
        forgetting the password could lead to all your data being deleted off the system
        <br><br>
        6- You will be required to pay us a total of 100$ or its equivalent based on your local currency for every action you make on the system, 
        you will not be able to shut down your system without paying that fee
        <br><br>
        7- Only click "PROCEED" if you are completely aware of the terms listed above, otherwise
        please click the "CLOSE" button at the top left of your screen
    </span>
    <div btn="" class="setup-btn" id="setup-proceed">Proceed</div>
`;

dialogue.push(installation_startPage);
dialogue.push(instructions);
dialogue.push("installation-loading");

let index = 0;
window_.innerHTML = dialogue[index];

initial_setup.appendChild(window_);

function installOS() {
    window.setTimeout(function () {
        document.body.innerHTML = "";
    }, delay / 2)
    window.setTimeout(function () {
        document.body.appendChild(startup_loading);
    }, delay);
    window.setTimeout(function () {
        document.body.innerHTML = "";
    }, delay * 2)
    window.setTimeout(function () {
        document.body.appendChild(initial_setup);
    }, delay * 2.5)
}

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "setup-proceed") {
        index += 1;
        if (dialogue[index] === "installation-loading") {
            startInstall();
        } else if (dialogue[index] === undefined) {
            index -= 1;
        } else {
            window_.innerHTML = dialogue[index];
        }
    } else if (targetElement.id === "abort-installation") {
        installation_corrupted = true;
        document.body.innerHTML = `ERR`;
        document.body.style.color = "white";
    }
})

function startInstall() {
    
}