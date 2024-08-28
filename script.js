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

// possible commands to enter: 
// color [hex / name]: change the color of the terminal
// bgcolor [hex / name]: change the background color of the terminal
// title [string]: changes the window title
// echo [string]: just prints a message
// cls: clears the cmd
// install [winOS | JSOS | macOS | Linux]: displays a funny message for each one, but installs legit JSOS
// quit: closes the entire window altogether