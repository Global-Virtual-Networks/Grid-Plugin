<div align="center">

# NimbleGrid

[Demo](https://global-virtual-networks.github.io/NimbleGrid/) | [Features](#features) | [Installation](#installation)

</div>

## Demo

For a live demonstration, click [here](https://global-virtual-networks.github.io/NimbleGrid/).

## Features

1. Encapsulation: The plugin is containerized, encompassing dynamic icon creation, HTML rendering, and application of CSS styles. This ensures that NimbleGrid seamlessly adjusts to diverse environments without the need for manual adjustments.
2. Pagination: Efficiently manage extensive datasets through integrated pagination features.
3. Column Sorting: The capability to organize data is facilitated through client-side handling, empowering users with an instinctive method to arrange information.
4. Flexible Data Connection: Easily connect your data, whether stored internally or externally, through the versatile data adapter.
5. Overflow Handling: Ellipses are automatically placed on overflowing cells, allowing users to view the entire content of a cell by hovering over it. This ensures a seamless and user-friendly experience.

## Installation

1. Link JavaScript File To Your Project:

   `<script src="path/to/NimbleGrid.js"></script>`

2. Create an object that communicates to NimbleGrid the columns to display, how to get the data, and the variable types of each column(View index.html file for object syntax)

3. Initialize your NimbleGrid:

   `const grid = $("#someId").NimbleGrid(object);`

4. Render your NimbleGrid on the browser:

   `grid.api.load_grid();`
