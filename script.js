let username;
let password;
let installation_corrupted = false;

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


let desktop_programs = [notepad, paint, calc];

window.onload = function () {
    if (localStorage.getItem("corrupted")) {
        if (localStorage.getItem("corrupted") === "true") {
            installation_corrupted = true;
            document.body.innerHTML = `ERR`;
            document.body.style.color = "white";
        } else {
            desktop_programs = JSON.parse(localStorage.getItem("desktop-data"));
            notepad_saves = JSON.parse(localStorage.getItem("notepad-saving"));
            desktop.style.backgroundColor = localStorage.getItem("bgColor");
            password = localStorage.getItem("password");
            username = localStorage.getItem("username");
            loginPage();
        }
    } else {
        existing_user = false;
        installation_corrupted = false;
        loadCMD(null);
    }
}

let pass_field;
let pass_warning;

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "login") {
        if (pass_field.value === password) {
            createDesktop();
        } else {
            pass_warning.style.display = "block"
        }
    }
})

function loginPage() {
    document.body.innerHTML = "";
    document.body.innerHTML = `
    <div class="initial-setup">
    <div class="window">
    <div class="text setup-intro">Welcome Back, ${username}</div>
    <input type="password" class="login-pass" placeholder="Enter Password" name="login-pass" id="login-pass">
    <div btn="" id="login" class="login">Login</div>
    <div id="password-warning" class="pass-warning">Password is Incorrect</div>
    </div>
    </div>
    `;
    
    pass_warning = document.getElementById("password-warning");
    pass_warning.style.display = "none";

    pass_field = document.getElementById("login-pass");

}

let cmd_content = [];

let running_apps = [];

let dialogue = [];

let setup_percentage = [];

let delay = 1000;

let instal_terminal_window = document.createElement("div");
instal_terminal_window.className = "installation-terminal-window"

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
        cmd_guide_text = `bluey mentioned :banditdance: :chillistare: :bingoYEAH: :blueythumbsup:`;
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
        localStorage.setItem("corrupted", installation_corrupted);
        window.reload();
    }
})

function startInstall() {
    window_.innerHTML = "";
    window_.innerHTML = install_page;

    let info_col = document.getElementById("info-calc");
    let init_setup = document.getElementById("setup-init");
    let framework = document.getElementById("frmwrk");
    let stngs = document.getElementById("settings");
    let ux = document.getElementById("ux");
    setup_percentage.push(info_col);
    setup_percentage.push(init_setup);
    setup_percentage.push(framework);
    setup_percentage.push(stngs);
    setup_percentage.push(ux);

    let bar = document.getElementById("bar");
    bar.width = 0;
    bar.style.width = 0;

    setup_percentage.forEach(element => {
        let time;
        let number = 0;
        if (time !== undefined) {
            return;
        } else {
            time = setInterval(function () {
                if (number < 1) {
                    let increment = Math.random() / 20;
                    number += increment;
                    bar.style.width = `${bar.width += (increment * 950) / 5}px`;
                    element.innerHTML = `(${Math.floor(number * 100)}%)`
                } else {
                    bar.style.width = `930px`;
                    element.innerHTML = `(100%)`
                    clearInterval(time);
                    time = undefined;
                    window.setTimeout(function () {
                        startOS();
                    }, 1000); // remember to change this
                }
            }, delay) // remember to change this
        }
    });
}

function startOS() {
    document.body.innerHTML = ""
    window.setTimeout(function () {
        document.body.appendChild(startup_loading);
    }, 1000) // remember to change this
    window.setTimeout(function () {
        document.body.innerHTML = "";
    }, 2000) // remember to change this
    window.setTimeout(function () {
        window_.innerHTML = user_settings_setup;
        document.body.appendChild(initial_setup);
        userSettings();
    }, 3000) // remember to change this
}

function userSettings() {
    let username_text = document.getElementById("username");
    let new_password_text = document.getElementById("n-pass");
    let check_password = document.getElementById("check-pass");
    let user_error = document.getElementById("user-error");
    document.addEventListener("click", function (e) {
        let targetElement = e.target;
        if (targetElement.id === "confirm-user") {
            if (username_text.value === "" || new_password_text.value === "" || check_password.value === "") {
                user_error.innerText = "Please Fill out All Values"
            } else {
                if (check_password.value !== new_password_text.value) {
                    user_error.innerText = "Passwords Do Not Match"
                } else {
                    password = check_password.value;
                    user_error.innerText = "";
                }
                username = username_text.value;
                existing_user = true;
                window_.innerHTML = `
                    <div class="setup-title wamed">Welcome, ${capitalize(username)}!</div>
                    <div class="setup-subtitle wamed">Please Be Patient while we set up your desktop</div>
                `
                window.setTimeout(function () {
                    document.body.innerHTML = "";
                    createDesktop();
                }, 2000) // remember to change this 
            }
        }
    })
}

function capitalize(string) {
    return string[0].toUpperCase() + string.substr(1, string.length - 1);
}

let desktop = document.createElement("div")
desktop.className = "desktop";

//////////////////////////////INITIATE DESKTOP///////////////////////////////

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

let start_programs = [settings, notepad, paint, calc];

let app_display = document.createElement("div");
app_display.className = "open-apps";
app_display.id = "open-apps";

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.hasAttribute("program")) {
        startApp(targetElement);
    }
})

function updateTime(t, d) {
    let time = new Date();
    let hr = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    let yr = time.getFullYear();
    let mnth = time.getMonth();
    let date = time.getDate();
    let day = time.getDay();
    let h;
    switch (day) {
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        case 7:
            day = "Sunday";
            break;
    }
    if (hr > 11) {
        h = "PM";
    } else {
        h = "AM";
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    t.innerHTML = `${hr}:${min}:${sec} ${h}`;
    d.innerHTML = `${day} ${date} / ${mnth + 1} / ${yr}`;
}

function createDesktop() {
    document.body.innerHTML = "";
    document.body.appendChild(app_display);
    document.body.appendChild(desktop);

    let time_display = document.getElementById("time");
    let date_display = document.getElementById("date");

    window.setInterval(updateTime, 1000, time_display, date_display)

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
            id: running_apps.length,
        })

        running_apps.push(window_obj);
        loadApps();
    }
}

let calculatorOutput;

let warned = false;

let numA;
let numB;
let op;

let new_user_txt;
let bg_color_input;
let warning_msg;

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "close") {
        let selectedWindow = targetElement.getAttribute("window-name");
        if (selectedWindow === "calc") {
            numA = undefined;
            numB = undefined;
            op = undefined;
        }
        closeWindow(selectedWindow);
    } else if (targetElement.id === "save") {
        for (let i = 0; i < running_apps.length; i++) {
            if (running_apps[i].window_name === "notepad") {
                saveNotePad();
            }
        }
    } else if (targetElement.className === "number" ||
        targetElement.className === "operation"
    ) {
        calculatorOutput.innerText = "";
        calculatorOutput.innerText += targetElement.innerText;
        if (targetElement.className === "number") {
            if (numA === undefined) {
                numA = parseInt(targetElement.innerText);
                console.log(numA);
            } else if (numB === undefined) {
                numB = parseInt(targetElement.innerText);
                console.log(numB);
            }
        } else if (targetElement.className === "operation") {
            op = targetElement.id;
            console.log(op);
        }
        if (numA !== undefined && numB !== undefined && op != undefined) {
            calculatorOutput.innerText = calculate(numA, numB, op);
            numA = undefined;
            numB = undefined;
            op = undefined;
        }
    } else if (targetElement.id === "confirm-change") {
        changeSettings();
    } else if (targetElement.id === "del-data") {
        if (!warned) {
            warning_msg.style.display = "block";
            warned = true;
        } else {
            deleteData();
        }
    } else if (targetElement.id === "shutdown") {
        shutdown();
    }
})

function shutdown() {
    installation_corrupted = false;

    localStorage.setItem("corrupted", JSON.stringify(installation_corrupted));
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("bgColor", desktop.style.backgroundColor);
    localStorage.setItem("desktop-data", JSON.stringify(desktop_programs));
    localStorage.setItem("notepad-saving", JSON.stringify(notepad_saves));

    document.body.innerHTML = "";

    document.body.innerHTML = `
        <div class="initial-setup">
            <div class="window">
                <span class="text setup-intro">Shutting Down</span>
            </div>
        </div>
    `

    window.setTimeout(function () {
        document.body.innerHTML = "";
    }, 3000); // change this
    window.setTimeout(function () {
        window.close();
        console.log("window-closed");
    }, 6000); // change this
}

function deleteData() {
    localStorage.clear();
}

function changeSettings() {
    username = new_user_txt.value;
    desktop.style.backgroundColor = bg_color_input.value;
}

function calculate(n1, n2, o) {
    switch (o) {
        case "add":
            return n1 + n2;
        case "subtract":
            return n1 - n2;
        case "multiply":
            return n1 * n2;
        case "divide":
            if (n2 === 0) {
                return "ERR"
            } else {
                return n1 / n2;
            }
        default:
            return "ERR"
    }
}

function closeWindow(id) {
    for (let i = 0; i < running_apps.length; i++) {
        if (running_apps[i].id === parseInt(id)) {
            running_apps.splice(i, 1);
        }
    }
    loadApps();
}

function loadApps() {
    app_display.innerHTML = "";
    for (let i = 0; i < running_apps.length; i++) {
        let window_content = document.createElement("div");
        window_content.id = running_apps[i].id;
        window_content.className = "app-window";
        window_content.setAttribute("window-name", running_apps[i].window_name);
        window_content.innerHTML = `
            <div class="opt-bar">
                <div class="window-title" id="window-title">
                    ${capitalize(running_apps[i].window_name)}
                </div>
                <div class="opt">
                    <div class="opt-btn opt-close" id="close" window-name="${running_apps[i].id}">X</div>
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

        window_content.style.top = `calc(calc(${i * 10}px + 30px) * 3)`;
        window_content.style.left = `calc(calc(${i * 10}px + 30px) * 3)`;

        app_display.appendChild(window_content);

        if (running_apps[i].window_name === "paint") {
            let canvas = document.getElementById("canvas");
            let ctx = canvas.getContext("2d");
            let brushSize = 5;

            canvas.width = 500;
            canvas.height = 300;
            
            let drawing = false;
            
            function startLine(e) {
                drawing = true;
                line(e)
            };
            
            function finishLine() {
                drawing = false;
                ctx.beginPath();
            };
            
            function line(e) {
                if (drawing) {
                    ctx.strokeStyle = "black";
                    ctx.lineCap = "round";
                    ctx.lineWidth = brushSize;
                    ctx.lineTo(e.clientX - 90, e.clientY - 145);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(e.clientX - 90, e.clientY - 145);
                }
            }

            canvas.onmousedown = startLine;
            canvas.onmouseup = finishLine;
            canvas.onmousemove = line;
        } else if (running_apps[i].window_name === "calc") {
            calculatorOutput = document.getElementById("output");
        } else if (running_apps[i].window_name === "settings") {
            new_user_txt = document.getElementById("change-username");
            bg_color_input = document.getElementById("change-bgcolor");
            warning_msg = document.getElementById("del-warning");
        }
    }
}

function saveNotePad() {
    let textarea = document.getElementById("notepad_write");
    let notepad_file = new Object({
        program: `notepad-save-${desktop_programs.length - 3}`,
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
                notepad_content = notepad_saves[i - 3];
            }
        }

        return `
            <textarea name="notepad" id="notepad_write" class="notepad" rows="20">
                ${notepad_content}
            </textarea>
        `;
    } else if (type.window_name === "paint") {
        return `
            <canvas id="canvas" width="500" height="300" class="canvas">

            </canvas>
        `
    } else if (type.window_name === "calc") {
        return `
        <div class="calc">
            <div class="output" id="output">000</div>
            <div class="input">
                    <div class="number" id="one">1</div>
                    <div class="number" id="two">2</div>
                    <div class="number" id="three">3</div>
                    <div class="operation" id="add">+</div>
                    <div class="number" id="four">4</div>
                    <div class="number" id="five">5</div>
                    <div class="number" id="six">6</div>
                    <div class="operation" id="subtract">-</div>
                    <div class="number" id="seven">7</div>
                    <div class="number" id="eight">8</div>
                    <div class="number" id="nine">9</div>
                    <div class="operation" id="divide">÷</div>
                    <div class="number" id="zero">0</div>
                    <div class="operation" id="equal">=</div>
                    <div class="operation" id="multiply">×</div>
            </div>
        </div>
        `
    } else if (type.window_name === "settings") {
        return `
            <div class="settings">
                <div class="settings-title">Settings</div>
                <div class="settings-section">
                    <label for="change-username">Change Username:</label>
                    <input type="text" id="change-username" placeholder="New Username">
                </div>
                <div class="settings-section">
                    <label for="change-bgcolor">Change Background Color:</label>
                    <input type="color" id="change-bgcolor">
                </div>
                <div btn="" class="confirm-settings" id="confirm-change">Apply Changes</div>
                <div class="settings-section">
                    <label>Reset System:</label>
                    <div btn="" class="del-data" id="del-data">Delete All Data</div>
                    <div class="del-warning" id="del-warning">YOU WILL LOSE ALL YOUR DATA, CONTINUE?</div>
                </div>
            </div>
        `
    }
}

// done :D