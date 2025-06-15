![App icon should have loaded here](client/public/favicon.svg)

# Minerva

## Desc

Web app for converting Markdown to PDF file with specified layout

![App screenshot should have loaded here](https://i.ibb.co/S7PrRPjn/minerva-screenshot.jpg)

## Localization

- English
- Russian

> Auto-detected from browser language

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details

## TODO

- [ ] Support for italic, bold, and underlined text [High]
- [ ] Numbered and bulleted lists [High]
- [ ] Image support [High]
- [ ] Table support [High]
- [ ] Formula support [High]
- [ ] Page numbering [High]
- [ ] Context menu [High]
- [ ] Table of contents [High]
- [ ] List of sources [High]
- [ ] Pre- and post-filled PDF templates with variables [High]
- [ ] Headers and footers [High]
- [ ] Save documents and styles to account [High]
- [ ] Public styles [High]
- [ ] Keyboard shortcuts [Medium]
- [ ] Spell checker [Medium]
- [ ] Customizable page count progress bar [Low]
- [ ] Import content from .docx [Low]

## Installation & Running

### Windows

#### Requirements

- [Node.js](https://nodejs.org/) or [Chocolatey](https://chocolatey.org/)
- [PowerShell 7+](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.5)

#### Installation

1. Download the latest zip release
2. Extract it to your preferred location
3. Go to `client` folder and run `setup.ps1` (with PowerShell 7+)

#### Running

1. In `client` folder run `run.ps1` (with PowerShell 7+)
2. Go to http://localhost:5173

### Linux

#### Installation

1. Download the latest zip release
2. Extract it to your preferred location
3. Go to `client` directory and run `setup.sh`

#### Running

1. In `client` directory run `run.sh`
2. Open http://localhost:5173

## Stack

- **Frontend**: React, Incrum State Manager, Axios
- **Backend**: Express, Sequelize
- **Database**: PostgreSQL
- **Other**: Vite

More technical information [here](dev.md)
