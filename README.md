<div align="center">

# NimbleGrid

[Features](#featurs) | [Demo](#demo) | [Installation](#installation) | [API](#api)

</div>

## Features

1. Optimized Encapsulation: Dynamically create icons, render HTML, and apply CSS styles for optimized encapsulation. The plugin seamlessly adapts to various environments without requiring manual adjustments.
2. Pagination: Effortlessly handle large datasets with built-in pagination functionality.
3. Column Sorting: Enable column sorting by simply clicking on a header cell, providing users with an intuitive way to organize data.
4. Flexible Data Connection: Easily connect your data, whether stored internally or externally, through the versatile data adapter.
5. Overflow Handling: Automatically place ellipses on overflowing cells, allowing users to view the entire content of a cell by hovering over it. This ensures a seamless and user-friendly experience.

## Demo

For a live demonstration, click [here](https://global-virtual-networks.github.io/Grid-Plugin/).

## Installation

1. Include JavaScript Source:

   `<script src="path/to/NimbleGrid.js"></script>`

2. Create an object that instructs NimbleGrid how to get and display your data:

```
let ajax = {
    rtd: 13,
    data_adapter: {
      columns: [
        {
          display: "Id",
          name: "id",
          width: 5,
          align: "center",
        },
        {
          display: "Name",
          name: "name",
          width: 12,
          align: "left",
        },
        {
          display: "Country of Origin",
          name: "country_of_origin",
          width: 15,
          align: "left",
        },
        {
          display: "Email",
          name: "email",
          width: 15,
          align: "left",
        },
        {
          display: "Fav Num",
          name: "favorite_number",
          width: 8,
          align: "center",
        },
        {
          display: "BY",
          name: "birth_year",
          width: 8,
          align: "center",
        },
        {
          display: "Portfolio",
          name: "portfolio",
          width: 30,
          align: "left",
        },
      ],
      load: function (callback) {
        // Define the URL of the file you want to fetch
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
      schema: [
        {
          name: "id",
          type: "int",
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "country_of_origin",
          type: "string",
        },
        {
          name: "email",
          type: "string",
        },

        {
          name: "favorite_number",
          type: "float",
        },
        {
          name: "birth_year",
          type: "datetime",
        },
        {
          name: "portfolio",
          type: "string",
        },
      ],
    },
    on_row_click: function (row_num) {
      alert("Clicked on row #" + parseInt(row_num));
    },
    style: {
      alt_color: ["background-color: lightblue;"],
    },
  };

```

Syntax Breakdown:

- rtd: rows to display
- columns(display): The text that will appear inside header cell
- columns(name): Should match corresponding name property in schema
- columns(width): Optional. Fixed with on column(px)
- columns(align): Text-align property on content within cells of said column
- load: Instructs NimbleGrid how to access your data. In this case, an AJAX call is provided. View .json file in project to view expected syntax of data
- schema(name): Connects the schema with the columns section
- schema(type): The SQL data type the column content will be
- on_row_click: Optional. Click event listener for each row
- style: Modify css of the NimbleGrid by modifying properties of the 'style' object within the plugin

3. Initialize your NimbleGrid:

   `const grid = $("#someId").NimbleGrid(object);`

## API

1. Render your NimbleGrid on the browser:

   `grid.api.load_grid();`
