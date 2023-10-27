# Grid-Plugin

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A powerful and flexible jQuery grid plugin for displaying and editing tabular data.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)

## Features

- Display tabular data in a flexible grid layout.
- Edit rows inline with built-in editing capabilities.
- Pagination for handling large datasets.
- Zero external dependencies
- Connect to a server-side data source using a data adapter
  
## Demo

For a live demonstration, visit our [Demo Page](https://global-virtual-networks.github.io/Grid-Plugin/).

## Installation

1. Link jQuery and the plugin file into your HTML file:
   ```ruby
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="grid-plugin.js"></script>
    ```


2. Format a data adapter. There are two ways to do this:
  - Restful API Call:
    ```ruby
      let restful_api = {
    data_adapter: {
      load: function (callback) {
        // Define the URL of the file/url you want to call
        var url = "grid_data.json";

        // Make the API call using the fetch API
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.text(); // Or use response.json() for JSON data
          })
          .then((data) => {
            // Handle the data returned from the file
            callback(JSON.parse(data));
          })
          .catch((error) => {
            // Handle any errors that occurred during the API call
            console.error("API call failed:", error);
          });
      },
    },
    on_row_click: null,
  };
  
```

  - Supplying Local Data:
```ruby
  let client = {
    data_adapter: {
      load: function (callback) {
        callback({
          count: 30,
          rows: [
            {
              id: "0",
              cell: [
                "1",
                "Brandon Smith",
                "Sierra Leone",
                "victor58@example.net",
                "2011",
                "http://www.burnett.com/",
              ],
            },
            {
              id: "0",
              cell: [
                "2",
                "James Dillond",
                "Guatemala",
                "joseph26@example.com",
                "2004",
                "http://www.hammond.com/",
              ],
            },
            {
              id: "0",
              cell: [
                "3",
                "Tim Merritt",
                "Gambia",
                "charles09@example.net",
                "1982",
                "https://www.pierce.com/",
              ],
            },
            {
              id: "0",
              cell: [
                "4",
                "Kylie Austin",
                "Hong Kong",
                "stephaniestark@example.net",
                "2011",
                "http://www.turner-kennedy.biz/",
              ],
            },
            {
              id: "0",
              cell: [
                "5",
                "Sandra Cross",
                "Burundi",
                "benjaminstanley@example.net",
                "1971",
                "http://newman.biz/",
              ],
            }
          ],
          schema: [
            {
              bind: true,
              len: 0,
              name: "id",
              ord: 0,
              ro: true,
              type: "numeric",
            },
            {
              bind: false,
              len: 0,
              name: "name",
              ord: 1,
              ro: false,
              type: "string",
            },
            {
              bind: false,
              len: 0,
              name: "country_of_origin",
              ord: 4,
              ro: true,
              type: "string",
            },
            {
              bind: true,
              len: 0,
              name: "email",
              ord: 3,
              ro: false,
              type: "string",
            },
            {
              bind: true,
              len: 0,
              name: "birth_year",
              ord: 2,
              ro: false,
              type: "date",
            },
            {
              bind: true,
              len: 0,
              name: "portfolio",
              ord: 5,
              ro: false,
              type: "string",
            },
          ],
        });
      },
    },
    on_row_click: null,
  };
 ```

3. Call the plugin on a DOM object and supply the data adapter to the plugin as an argument:
```ruby
let grid = $("#some_dom_object").grid_ng([data_adapter](#data_adapter));
```

5. Load the grid using the api the plugin returns
```ruby
grid.api.load_grid();
```
