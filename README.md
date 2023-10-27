# Grid-Plugin

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A powerful and flexible jQuery grid plugin for displaying and editing tabular data.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)

## Features

- Display tabular data in a flexible grid layout.
- Edit rows inline with built-in editing capabilities(Ctrl + Click on a row)
- Pagination for handling large datasets
- Zero external dependencies
- Connect to a data source using a data adapter
  
## Demo

For a live demonstration, visit our [Demo Page](https://global-virtual-networks.github.io/Grid-Plugin/).

## Installation

1. Link jQuery and the plugin file into your HTML file:
   ```ruby
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="grid-plugin.js"></script>
    ```
2. Format grid data into an object with these 3 properties
   - count: specifies the # of rows
   - rows: an array of objects that holds the data for each row
   - schema: an array of objects that defines the behaviors of the columns, by listing properties such as:
     - bind(not in use)
     - len(not in use)
     - name: The name for the column header. Define it in snakecase, and the plugin will use the Title Case version for the grid(birth_year => Birth Year)
     - ord: the index position of the column
     - ro: read-only. If set to true, column is non-editable. If set to false, column is editable
     - type: the data type that the values in said column must be(int, date, etc.)

2. Format a data adapter. There are two ways to do this(check index.html for the syntax):
  - Restful API Call
  - Supplying Local Data

3. Call the plugin on a DOM object and supply the data adapter to the plugin as an argument:
    ```ruby
    let grid = $("#some_dom_object").grid_ng(your_data_adapter);
    ```

5. Load the grid using the api the plugin returns
    ```ruby
    grid.api.load_grid();
    ```
