# Linux Terminal Simulator

This project is a React-based simulation of a Linux terminal, featuring a realistic interface with keyboard sound effects and several built-in commands.

## Features

- Simulated Linux terminal interface
- Customizable keyboard sound effects with three different options
- Built-in commands: help, date, echo, clear, fortune
- Sound toggle functionality
- Responsive design using Tailwind CSS

## Prerequisites

- Node.js (v12.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/linux-terminal-simulator.git
   cd linux-terminal-simulator
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Add sound effect files:
   Place three MP3 files for keyboard sounds in the `public` folder:
   - `keyboard-sound-1.mp3`
   - `keyboard-sound-2.mp3`
   - `keyboard-sound-3.mp3`
   - `keyboard-sound-4.mp3`

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

- Type commands in the terminal input and press Enter to execute.
- Use the sound toggle button or the `sound` command to enable/disable keyboard sounds.
- Use the `soundeffect` command to switch between different keyboard sound effects.
- Type `help` to see a list of available commands.

## Available Commands

- `help`: Show available commands
- `date`: Display current date and time
- `date +FORMAT`: Display date in specified format
- `clear`: Clear the terminal
- `echo [text]`: Display a line of text
- `fortune`: Display a random quote
- `sound`: Toggle keyboard sound effects
- `soundeffect [1-3]`: Switch between different keyboard sound effects

## Project Structure

```
linux-terminal-simulator/
│
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   ├── keyboard-sound-1.mp3
│   ├── keyboard-sound-2.mp3
│   └── keyboard-sound-3.mp3
│
├── src/
│   ├── components/
│   │   └── LinuxTerminal.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
│
├── package.json
├── package-lock.json
├── README.md
├── tailwind.config.js
└── postcss.config.js
```

## Customization

- To modify the available commands or add new ones, edit the `processCommand` function in `src/components/LinuxTerminal.js`.
- To change the terminal's appearance, modify the Tailwind CSS classes in the component's JSX.
- To add or change sound effects, replace the MP3 files in the `public` folder and update the `soundEffects` array in `LinuxTerminal.js`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgements

- This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.
- Icons are provided by [Lucide](https://lucide.dev/).
- Sound effects should be credited according to their respective licenses.