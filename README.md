<div align="center">

# ls-grid - THE Grid Web Component

[Demo](https://global-virtual-networks.github.io/ls-grid/) | [Features](#features) | [Installation](#installation)

</div>

## Demo

For a live demonstration, click [here](https://global-virtual-networks.github.io/ls-grid/).

## Features

1. Encapsulation: ls-grid seamlessly adjusts to diverse environments without the need for major adjustments.
2. Pagination: Efficiently manage extensive datasets through integrated pagination features.
3. Column Sorting: Their is freedom to choose between client or server side sorting, empowering users with an instinctive method to arrange information.
4. Flexible Data Connection: Easily connect your data, whether stored internally or externally, through the versatile data adapter.
5. Overflow Handling: Ellipses are automatically placed on overflowing cells, allowing users to view the entire content of a cell by hovering over it. This ensures a seamless and user-friendly experience.

## Installation

1. Link JavaScript File To Your Project:

   `<script src="path/to/ls-grid.js"></script>`

2. The ls-grid needs information for maximum functionality. Create a configuration object to communicate the needed information. View index.html file for configuration object details.

3. Add web component to an HTML file:

   `<ls-grid></ls-grid>`

4. Display data using ls-grid api:

   `document.querySelector("ls-grid").api.load_grid(config)`
