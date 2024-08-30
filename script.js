let cmd_content = [];

let running_apps = [];

let app_display = document.getElementById("open-apps");

let username;
let password;

let installation_corrupted = false;

let dialogue = [];

let setup_percentage = [];

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

let install_page = `
    <div btn="" class="close-installation" id="abort-installation">X</div>
    <div class="install-title">Installing JavaScript OS</div>
    <div class="install-content">
        <div class="install-bar">
            <ul>
                <li>
                    <span class="install-step-title">Collecting Information</span>
                    <span class="remaining-persent" id="info-calc">(0%)</span>
                </li>
                <li>
                    <span class="install-step-title">Initializing Setup</span>
                    <span class="remaining-persent" id="setup-init">(0%)</span>
                </li>
                <li>
                    <span class="install-step-title">Installing Frameworks</span>
                    <span class="remaining-persent" id="frmwrk">(0%)</span>
                </li>
                <li>
                    <span class="install-step-title">Applying Settings</span>
                    <span class="remaining-persent" id="settings">(0%)</span>
                </li>
                <li>
                    <span class="install-step-title">Improving User Experience</span>
                    <span class="remaining-persent" id="ux">(0%)</span>
                </li>
            </ul>
        </div>
        <div class="install-tips">
            <span>Please Be Patient</span>
            <br>
            <span>DO NOT ABORT OR CANCEL PROCESS AT ALL COSTS</span>
        </div>
    </div>
    <div class="loading-bar">
        <div class="bar" id="bar"></div>
    </div>
`

let user_settings_setup = `
    <div btn="" class="close-installation" id="abort-installation">X</div>
    <div class="setup-title">Welcome, User!</div>
    <div class="setup-subtitle">Please set a username and a password to access the system</div>
    <div class="user-setup">
        <div class="section">
            <label for="username">Username: </label>
            <input type="text" id="username">
        </div>
        <div class="section">
            <label for="n-pass">New Password: </label>
            <input type="password" id="n-pass">
        </div>
        <div class="section">
            <label for="check-pass">Check Password: </label>
            <input type="password" id="check-pass">
        </div>
        <div btn="" id="confirm-user" class="confirm-user">Confirm</div>
        <div id="user-error" class="user-error"></div>
    </div>
`

dialogue.push(installation_startPage);
dialogue.push(instructions);
dialogue.push("installation-loading");

let index = 0;
window_.innerHTML = dialogue[index];

initial_setup.appendChild(window_);

function installOS() {
    // window.setTimeout(function () {
    //     document.body.innerHTML = "";
    // }, delay / 2)
    // window.setTimeout(function () {
    //     document.body.appendChild(startup_loading);
    // }, delay);
    // window.setTimeout(function () {
    //     document.body.innerHTML = "";
    // }, delay * 2)
    // window.setTimeout(function () {
    //     document.body.appendChild(initial_setup);
    // }, delay * 2.5)
}


// document.addEventListener("click", function (e) {
    //     let targetElement = e.target;
    //     if (targetElement.id === "setup-proceed") {
        //         index += 1;
//         if (dialogue[index] === "installation-loading") {
//             startInstall();
//         } else if (dialogue[index] === undefined) {
//             index -= 1;
//         } else {
//             window_.innerHTML = dialogue[index];
//         }
//     } else if (targetElement.id === "abort-installation") {
//         installation_corrupted = true;
//         document.body.innerHTML = `ERR`;
//         document.body.style.color = "white";
//     }
// })

// function startInstall() {
//     window_.innerHTML = "";
//     window_.innerHTML = install_page;

//     let info_col = document.getElementById("info-calc");
//     let init_setup = document.getElementById("setup-init");
//     let framework = document.getElementById("frmwrk");
//     let stngs = document.getElementById("settings");
//     let ux = document.getElementById("ux");
//     setup_percentage.push(info_col);
//     setup_percentage.push(init_setup);
//     setup_percentage.push(framework);
//     setup_percentage.push(stngs);
//     setup_percentage.push(ux);

//     let bar = document.getElementById("bar");
//     bar.width = 0;
//     bar.style.width = 0;

//     setup_percentage.forEach(element => {
//         let time;
//         let number = 0;
//         if (time !== undefined) {
//             return;
//         } else {
//             time = setInterval(function () {
//                 if (number < 1) {
//                     let increment = Math.random() / 20;
//                     number += increment;
//                     bar.style.width = `${bar.width += (increment * 950) / 5}px`;
//                     element.innerHTML = `(${Math.floor(number * 100)}%)`
//                 } else {
//                     bar.style.width = `930px`;
//                     element.innerHTML = `(100%)`
//                     clearInterval(time);
//                     time = undefined;
//                     window.setTimeout(function () {
//                         startOS();
//                     }, 1000); // remember to change this
//                 }
//             }, delay) // remember to change this
//         }
//     });
// }

// function startOS() {
//     document.body.innerHTML = ""
//     window.setTimeout(function () {
//         document.body.appendChild(startup_loading);
//     }, 1000) // remember to change this
//     window.setTimeout(function () {
//         document.body.innerHTML = "";
//     }, 2000) // remember to change this
//     window.setTimeout(function () {
//         window_.innerHTML = user_settings_setup;
//         document.body.appendChild(initial_setup);
//         userSettings();
//     }, 3000) // remember to change this
// }

// function userSettings() {
//     let username_text = document.getElementById("username");
//     let new_password_text = document.getElementById("n-pass");
//     let check_password = document.getElementById("check-pass");
//     let user_error = document.getElementById("user-error");
//     document.addEventListener("click", function (e) {
//         let targetElement = e.target;
//         if (targetElement.id === "confirm-user") {
//             if (username_text.value === "" || new_password_text.value === "" || check_password.value === "") {
//                 user_error.innerText = "Please Fill out All Values"
//             } else {
//                 if (check_password.value !== new_password_text.value) {
//                     user_error.innerText = "Passwords Do Not Match"
//                 } else {
//                     password = check_password.value;
//                     user_error.innerText = "";
//                 }
//                 username = username_text.value;
//                 existing_user = true;
//                 window_.innerHTML = `
//                     <div class="setup-title wamed">Welcome, ${capitalize(username)}!</div>
//                     <div class="setup-subtitle wamed">Please Be Patient while we set up your desktop</div>
//                 `
//                 window.setTimeout(function () {
//                     document.body.innerHTML = "";
//                     desktop();
//                 }, 2000) // remember to change this 
//             }
//         }
//     })
// }

function capitalize(string) {
    return string[0].toUpperCase() + string.substr(1, string.length - 1);
}

let desktop = document.createElement("div")
desktop.className = "desktop";

//////////////////////////////INITIATE DESKTOP///////////////////////////////
// same as usual, desltop contents are loaded from a variable
// each program / file there is, will be loaded onto the desktop from an array where it is saved
// each program will have an id, marking their location on the desktop / start menu
// each program / file will have another special id, that will mark what the data stored inside them is

// each open program will appear on the task bar, clicking the minimize btn or the icon on the task bar
// will cause the program to toggle visibility
// list of possible programs i can make from this:
// 1- notepad
// 2- paint
// 3- calculator
// 4- settings
// 5- cmd 
// 6- file explorer
// creating a folder means creating an array, same way as file explorer will work.
// right click to create a folder, rename one, or delete one.
// deleting anything will cause its permanent death forever

desktop.innerHTML = `
    <div class="main-screen">
        <div class="os-desktop">JavaScript OS</div>
        <div class="desktop-icons" id="desktop-programs">
            
        </div>
    </div>
    <div class="taskbar">
        <div class="start-menu-btn" id="open-start">Start</div>
        <div class="dt">
            <div class="time" id="time">12:60 PM</div>
            <div class="date" id="date">8/6/2024</div>
        </div>
    </div>
    <div class="start-menu" id="start">
        <div id="container">
            <div class="menu-section">
                <div class="start-icon">F</div>
                <div class="text">File explorer</div>
            </div>
            <div class="menu-section">
                <div class="start-icon">F</div>
                <div class="text">File explorer</div>
            </div>
            <div class="menu-section">
                <div class="start-icon">F</div>
                <div class="text">File explorer</div>
            </div>
        </div>
        <div btn="" class="menu-btn" id="shutdown">Shutdown</div>
    </div>
`

let notepad_saves = [];

// notepad save:
// add item to desktop programs
// add content to a seperate array
// when running, get the index
// calculate the index in the seperate array
// load content

let notepad = new Object({
    program: "notepad",
})

let paint = new Object({
    program: "paint",
})

let calc = new Object({
    program: "calc",
})

let settings = new Object({
    program: "settings",
})

let cmd = new Object({
    program: "cmd",
})

let exp = new Object({
    program: "exp",
})

let desktop_programs = [exp, notepad, paint, calc];
let start_programs = [cmd, settings, exp, notepad, paint, calc];

createDesktop();

function createDesktop() {
    document.body.appendChild(desktop);
    
    let start_menu = document.getElementById("start");
    start_menu.style.display = "none";
    
    let start_menu_programs = document.getElementById("container");
    start_menu_programs.innerHTML = "";

    let desktop_shortcuts = document.getElementById("desktop-programs");
    desktop_shortcuts.innerHTML = "";

    start_programs.forEach(item => {
        let shortcut = document.createElement("div");
        shortcut.className = "menu-section";
        shortcut.setAttribute("program", "");
        shortcut.id = item.program;
        shortcut.innerHTML = `
            <div class="start-icon">${capitalize(item.program[0])}</div>
            <div class="text">${capitalize(item.program)}</div>
        `
        start_menu_programs.appendChild(shortcut);
    });
    
    desktop_programs.forEach(item => {
        let shortcut = document.createElement("div");
        shortcut.className = "icon";
        shortcut.id = item.program;
        shortcut.setAttribute("program", "");
        shortcut.innerHTML = `
            <div>${capitalize(item.program[0])}</div>
            <div class="subfile-name">${capitalize(item.program)}</div>
        `
        desktop_shortcuts.appendChild(shortcut);
    });

    document.addEventListener("click", function (e) {
        let targetElement = e.target;
        if (targetElement.hasAttribute("program")) {
            startApp(targetElement);
        }
    })

    let start_btn = document.getElementById("open-start");
    let toggle_start_menu = 0; 

    start_btn.onclick = function () {
        if (toggle_start_menu === 0) {
            toggle_start_menu = 1;
            start_menu.style.display = "block";
        } else if (toggle_start_menu === 1) {
            toggle_start_menu = 0;
            start_menu.style.display = "none";
        }
    }
}

let initialX = 0;
let initialY = 0;

function startApp(element) {
    let window_obj;

    if (running_apps.indexOf(element) < 0) {
        
        window_obj = new Object({
            window_name: element.id,
            posX: initialX,
            posY: initialY,
            drag: false,
        })

        running_apps.push(window_obj);
        
        loadApps();
    }
}

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "close") {
        let window = targetElement.getAttribute("window-name");
        for (let i = 0; i < running_apps.length; i++) {
            if (running_apps[i].window_name === window) {
                running_apps.splice(i, 1);
            }
        }
        loadApps();
    } else if (targetElement.id === "save") {
        for (let i = 0; i < running_apps.length; i++) {
            if (running_apps[i].window_name === "notepad") {
                saveNotePad();
            }
        }
    }
})

let drag;
let mouseX;
let mouseY;

function loadApps() {
    app_display.innerHTML = "";
    for (let i = 0; i < running_apps.length; i++) {
        let window_content = document.createElement("div");
        window_content.className = "app-window";
        window_content.setAttribute("window-name", running_apps[i].window_name);
        window_content.setAttribute("draggable", "true");
        window_content.innerHTML = `
            <div class="opt-bar" id="${running_apps[i].window_name}">
                <div class="window-title" id="window-title">
                    ${capitalize(running_apps[i].window_name)}
                </div>
                <div class="opt">
                    <div class="opt-btn opt-close" id="close" window-name="${running_apps[i].window_name}">X</div>
                </div>
            </div>
            <div class="app">
                <div class="action-bar">
                    <div class="save" id="save">Save</div>
                </div>
                <div class="app-function" id="function">
                    ${addFunction(running_apps[i])}
                </div>
            </div>
        `

        window_content.style.top = running_apps[i].posY;
        window_content.style.left = running_apps[i].posX;

        window_content.onclick = function (e) {
            window_content.style.zIndex += 9;
        }
        
        window_content.addEventListener('mousedown', function (e) {
            offsetX = e.clientX - window_content.getBoundingClientRect().left;
            offsetY = e.clientY - window_content.getBoundingClientRect().top;
            running_apps[i].drag = true;
            window_content.style.zIndex += 9;
        });

        document.addEventListener('mousemove', function (e) {
            if (running_apps.length > 0) {
                if (running_apps[i].drag) {
                    running_apps[i].posX = `${e.clientX - offsetX}px`;
                    running_apps[i].posY = `${e.clientY - offsetY}px`;
                    window_content.style.left = running_apps[i].posX;
                    window_content.style.top = running_apps[i].posY;
                }
            }
        });
        
        window_content.addEventListener('mouseup', function () {
            running_apps[i].drag = false;
        });

        app_display.appendChild(window_content);
    }
}

function saveNotePad() {
    let textarea = document.getElementById("notepad_write");
    let notepad_file = new Object({
        program: `notepad-save-${desktop_programs.length - 4}`,
    })
    notepad_saves.push(textarea.value);
    desktop_programs.push(notepad_file);
    createDesktop();
}

function addFunction(type) {
    if (type.window_name === "notepad") {
        return `
            <textarea name="notepad" id="notepad_write" class="notepad" rows="20">
            
            </textarea>
        `;
    } else if (type.window_name.indexOf("notepad-save") > -1) {
        let notepad_content;

        for (let i = 0; i < desktop_programs.length; i++) {
            if (type.window_name === desktop_programs[i].program) {
                notepad_content = notepad_saves[i - 4];
            }
        }

        return `
            <textarea name="notepad" id="notepad_write" class="notepad" rows="20">
                ${notepad_content}
            </textarea>
        `;
    }
    // exp
    // calc
    // notepad
    // cmd
    // paint
    // settings
}