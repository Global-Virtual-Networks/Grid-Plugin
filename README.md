<div align="center">

# NimbleGrid

[Features](#featurs) | [Demo](https://global-virtual-networks.github.io/Grid-Plugin/) | [Installation](#installation) 

</div>

## Features
1. Optimized Encapsulation: Dynamically create icons, render HTML, and apply CSS styles for optimized encapsulation. The plugin seamlessly adapts to various environments without requiring manual adjustments.
2. Pagination: Effortlessly handle large datasets with built-in pagination functionality.
3. Column Sorting: Enable column sorting by simply clicking on a header cell, providing users with an intuitive way to organize data.
4. Flexible Data Connection: Easily connect your data, whether stored internally or externally, through the versatile data adapter.
5. Overflow Handling: Automatically place ellipses on overflowing cells, allowing users to view the entire content of a cell by hovering over it. This ensures a seamless and user-friendly experience.

## Installation

1. Link JavaScript File To Your Project:

   ```<script src="path/to/NimbleGrid.js"></script>```

2. Create an object that instructs NimbleGrid how to get and display your data(View index.html file for object syntax)

3. Initialize your NimbleGrid:

   ```const grid = $("#someId").NimbleGrid(object);```
   
4. Render your NimbleGrid on the browser:

   ```grid.api.load_grid();```


