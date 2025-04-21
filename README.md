![This should have been the app's logo](client/public/favicon.svg)

# Minerva

## Desc

Web app for converting Markdown to PDF file with specified layout

## Stack

- **Frontend**: React, Incrum State Manager, Axios
- **Backend**: Express, Sequelize
- **Database**: PostgreSQL
- **Other**: Vite, Quill

More technical information [here](dev.md)

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details

## Installation & Running

### Client

1. Clone the repository to your preferred directory

```
git clone https://github.com/Br00wnie/Minerva.git
```

2. Navigate to the client folder and install dependencies

```
cd client
npm install
```

3. Run the application and open its page in the browser

```
npm run dev
```

### Server

To successfully start the server application (`npm run dev`):

- install npm packages in the server folder,
- create a database in PostgreSQL,
- link the database to the application by specifying your DB parameters in .env

## TODO

- [ ] Formula support
- [ ] Collaboration system with commenting
- [ ] Customizable progress bar for page count
