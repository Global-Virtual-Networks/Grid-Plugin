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

2. Format a data adapter. There are two ways to do this(Check index.html for the syntax):
  - Restful API Call:
  - Supplying Local Data

3. Call the plugin on a DOM object and supply the data adapter to the plugin as an argument:
    ```ruby
    let grid = $("#some_dom_object").grid_ng(your_data_adapter);
    ```

5. Load the grid using the api the plugin returns
    ```ruby
    grid.api.load_grid();
    ```
