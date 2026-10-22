# Cat API Lab

A plain HTML, CSS and JavaScript SPA demonstrating the Cat Facts API.

## Run locally

1. Extract this ZIP.
2. Open the cat-api-lab folder in VS Code.
3. Use the Live Server extension to open index.html.

Alternatively, with Python installed, run this command from the extracted folder:

    python -m http.server 8000

Then visit http://localhost:8000.

No npm installation or build step is required. Internet access is required for the API and optional Google Fonts.

## Files

- index.html: page structure and explanation dialog.
- style.css: responsive styling.
- app.js: fetch requests, DOM rendering, pagination, error handling and localStorage.

## API endpoints

- GET https://catfact.ninja/fact?max_length=200
- GET https://catfact.ninja/facts?limit=6&page=1&max_length=200
- GET https://catfact.ninja/breeds?limit=6&page=1

Click [?] pointers to learn about requests, JSON, query parameters, pagination, CORS and browser storage. The live inspector shows the last request, HTTP status, client elapsed time, response JSON and fetch code.

Breed search filters the current page locally. Saved facts use localStorage, not a server database. Random facts can repeat. API/network failures are displayed with a retry button.
