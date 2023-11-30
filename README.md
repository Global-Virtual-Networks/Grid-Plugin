# Grid-Plugin

A powerful and flexible jQuery grid plugin for displaying and editing tabular data.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Components](#components)

## Features

- Display tabular data in a flexible grid layout
- Pagination for handling large datasets
- Easily tailor the CSS to suit your styling choices
- Zero external dependencies
- Connect a dataset using a data adapter
  
## Demo

For a live demonstration, visit our [Demo Page](https://global-virtual-networks.github.io/Grid-Plugin/).

## Installation

1. Clone or Download the project
2. Create a data adapter
3. Customize the row click event listener and CSS according to your preferences
4. You're all set!

## Components

1. Data adapter is the property that instructs the plugin how to get the grid data. There are two ways to do this(check index.html for the syntax):
    - Restful API Call
    - Supplying Local Data
      
2. Grid Data Structure. Must be an object that include these 3 properties(Reference grid_data.json in source code for a visual):
   - count: specifies the # of rows
   - rows: an array of objects that holds the data for each row
   - schema: an array of objects that defines the behaviors of the columns, by listing these properties:
     - name: The name for the column header. Define it using snakecase naming convention, and the plugin will use the Title Case version for the grid(birth_year => Birth Year)
     - ord: the index position of the column
     - ro: read-only. If set to true, column is non-editable. If set to false, column is editable
     - type: the data type that the values in said column must be(int, date, etc.)



