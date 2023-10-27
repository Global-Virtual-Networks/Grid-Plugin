(function ($) {
    $.fn.grid_ng = function (config) {
        let og_grid_data;
        let og_schema;
        let grid_data_obj;
        let open_grid_data;
        let save_grid_data;
        let open_schema;
        let save_schema;

        const plugin_dom_obj = this[0];
        const conf = {
            on_row_click: function () {
                alert("h1");
            },
            grid_mode: "pagination",
            style: {
                //css relating to table
                row_color: ["background-color: #ffffff"],
                alt_color: ["background-color: #dddddd"],
                row_hov_color: ["background-color: #679CFB"],
                ultimate_parent_container: [
                    "display: flex;",
                    "justify-content: center;",
                ],
                scroll_mode: ["overflow-y: scroll"],
                grid_container: [
                    "overflow-x: scroll;",
                    "width: 100%;",
                    "background-color: #fff",
                ],
                table: [
                    "font-family: sans-serif;",
                    "border-collapse: collapse;",
                    "width: 100%;",
                ],
                cell: [
                    "border-right: 1px solid #dddddd;",
                    "padding: .8em;",
                    "height: auto;",
                    "font-size: .8em;",
                    "text - align: left;",
                    "overflow: hidden;",
                    "white-space: nowrap;",
                    "text-overflow: ellipsis;",
                ],
                larger_width_cell: ["padding: .5em 1em;", "font-size: .75em;"],
                cutoff_div: [
                    "border: 1px solid black",
                    "background-color: white;",
                    "padding: .5em;",
                    "font-size: .65em;",
                    "line-height: 1.5em;",
                    "position: absolute",
                    "overflow: visible;",
                    "border-radius: .25em",
                    "z-index: 999;",
                ],
                header_cells_ex: [
                    "display: flex;",
                    "align-items: center;",
                    "justify-content: space-between;",
                    "cursor: pointer;",
                    "user-select: none;",
                ],
                img: [
                    "width: 15px;",
                    "height: auto;",
                    "opacity: 0.5;",
                    "margin-left: 1em;",
                ],

                //css relating to header
                header_container: [
                    "width: 100%;",
                    "max-height: 10%;",
                    "display: flex;",
                    "align-items: center;",
                    "justify-content: right;",
                    "margin: 1em;",
                ],
                search_container: [
                    "display: flex;",
                    "align-items: center;",
                    "margin-right: 0",
                ],
                larger_width_search_container: ["margin-right: 2em;"],
                search_bar: [
                    "border: 2px solid black;",
                    "border-left: none;",
                    "width: 10em;",
                    "height: 1em;",
                    "padding: .3em;",
                    "margin-right: .5em",
                    "font-size: .85em",
                ],
                larger_width_search_bar: [
                    "width: 20em;",
                    "height: 1.5em;",
                    "font-size: .75em",
                ],
                search_icon: [
                    "border: 2px solid black;",
                    "border-right: none;",
                    "width: 1em;",
                    "padding: 2.7px 2.5px;",
                ],
                larger_width_search_icon: ["padding: 4.7px 4.5px;"],
                //css relating to footer
                center_child_elems: [
                    "display: flex;",
                    "align-items: center;",
                    "justify-content: center;",
                ],
                footer_container: ["display: block", "flex-direction: row-reverse;"],
                larger_width_footer_container: ["padding: 0.5em"],
                pager_cont: [
                    "display: flex;",
                    "align-items: center;",
                    "font-size: .7em",
                ],
                larger_width_pager_cont: ["font-size: .8em"],
                pager_butts: ["margin-top: .2em;", "width: .75em;", "padding: .4em;"],
                entries_container: [
                    "padding: 0 .5em;",
                    "text-align: center;",
                    "margin: 0 .75em;",
                    "font-size: .9em",
                ],
                larger_width_entries_container: [
                    "text-align: left;",
                    "margin: 0 1em;",
                    "font-size: .9em",
                ],
                pag_tb: [
                    "font-size: 1em",
                    "width: 3em;",
                    "height: .6em;",
                    "padding: 1em;",
                    "margin: 0 .5em;",
                    "border: 1.5px solid black;",
                    "border-radius: .5em;",
                    "text-align: center;",
                ],
                spacing: ["margin: 0 .5em;", " cursor: pointer;"],
                cancel_butt: [
                    "font-size: .8em",
                    "border: 1px solid black",
                    "border-radius: .5em;",
                    "padding: .5em;",
                    "margin: 1em .5em;",
                    "width: auto",
                    "text-align: center;",
                    "background-color: white",
                ],
                save_butt: [
                    "font-size: .8em",
                    "padding: .5em;",
                    "margin: 1em .5em;",
                    "border-radius: .5em",
                    "width: auto;",
                    "text-align: center;",
                    "border: 1px solid black;",
                    "background-color: white",
                ],
                save_butt_hov: ["background-color: #518cfb"],
                //a = add
                a_butt_hov_eff: ["background-color: #dddddd;", " color: #000;"],
                //c = current
                c_butt_hov_eff: ["background-color: black;", " color: #fff"],
                //r = remove
                r_butt_hov_eff: ["background-color: #ffffff;", " color: #000;"],
                bot_row_headers: [
                    "text-align: left;",
                    "padding: 1em;",
                    "font-size: .75em;",
                ],
            },
        };
        ;
        if (arguments.length > 0) {
            $.extend(conf, config);
        }
        //add event listeners that will change the cursor depending on whether the ctrl key is being held or not
        document.addEventListener("keydown", function (event) {
            if (event.key === "Control") {
                css(["cursor: pointer;"], plugin_dom_obj);
            }
        });
        document.addEventListener("keyup", function (event) {
            if (event.key === "Control") {
                css(["cursor: auto;"], plugin_dom_obj);
            }
        });

        //child_el = child element
        const append_child = (child_el, parent, id) => {
            const child = document.createElement(child_el);
            child.setAttribute("id", id);
            parent.appendChild(child);
            return child;
        };

        const grid_mde = () => {
            return {
                set: function (mode) {
                    if (mode === "scroll") {
                        css(conf.style.scroll_mode, plugin_dom_obj);
                        footer_container.style.display = "none";
                    } else if (mode === "pagination") {
                        responsive_design();
                        set_pagination_nums();
                        //set a defined height on the footer
                        footer_container.style.cssText +=
                            "height: " + footer_container.offsetHeight + "px";
                    } else {
                        alert(
                            "Invalid argument object property: Use 'scroll' or 'pagination' instead of '" +
                            mode +
                            "' for grid_mode property."
                        );
                        plugin_dom_obj.removeChild(grid_parent_container);
                    }
                },
            };
        };

        const set_pagination_nums = () => {
            //dataset is displayed correctly, even though first_entry_index is off by one? To prevent further issues, displaying a different variables variable in entries_container
            let fe_idx = first_entry_index;
            //add an ADD operator here that checks to see if pagination or window resize triggered this function
            if (fe_idx != 1) {
                fe_idx = first_entry_index + 1;
            }
            let last_entry_index = first_entry_index + page_len;
            if (first_entry_index + page_len > tabledata_len) {
                last_entry_index = tabledata_len;
            }
            entries_container.innerText =
                fe_idx + " - " + (last_entry_index) + " of " + tabledata_len + " entries";

            //set page number
            tot_pgs.innerText = "of " + num_of_pages;
        };

        const self = this;
        let page_len = 14;
        let curr_page = 1;
        let first_entry_index = 0;
        let last_entry_index;
        let tabledata_len;
        let pag_tb;
        let tot_pgs;
        let entries_container;
        let pager_cont;
        let cancel_butt;
        let save_butt;
        let bef_aft_obj = {};
        let search_bar;
        let reset_butt;
        let export_butt;
        const grid_mode = grid_mde();

        const create_header = () => {
            grid_container = append_child("div", plugin_dom_obj, "grid_container");
            css(conf.style.grid_container, grid_container);
            header_container = append_child(
                "div",
                grid_container,
                "header_container"
            );
            css(conf.style.header_container, header_container);

            create_search_ddl();
            create_search_bar();
        };

        const create_search_ddl = () => { };

        const create_search_bar = () => {
            //add search bar
            const search_container = append_child(
                "div",
                header_container,
                "search_container"
            );
            css(conf.style.search_container, search_container);

            const search_icon = append_child("img", search_container, "search_icon");
            css(conf.style.search_icon, search_icon);
            search_icon.src = "/Scripts/Grid-Plugin-NG/images/search-icon.png";

            search_bar = append_child("input", search_container, "search_bar");
            css(conf.style.search_bar, search_bar);
            //eliminate highlight on focus
            search_bar.addEventListener("focus", function () {
                search_bar.style.outline = "none";
            });
            search_bar.addEventListener("input", function () {
                highlight_on_search();
            });
        };

        const highlight_on_search = () => {
            const typed_text = search_bar.value.toLowerCase();

            const table_rows = plugin_dom_obj.querySelectorAll("table tr");
            const rows = Array.from(table_rows).splice(
                first_entry_index - 1,
                last_entry_index + 1
            );

            let row;

            //set background row color for header row to main row color, not alt_color
            background_count.reset();
            set_row_background_color(rows[0]);

            for (let i = 1; i < rows.length; i++) {
                row = rows[i];
                row.style.display = "";

                const cells = row.querySelectorAll("td");

                let match = false;
                for (let cell of cells) {
                    cell = cell.childNodes[0].childNodes[0];
                    const txt_content = cell.innerText;
                    const index = txt_content.toLowerCase().indexOf(typed_text);

                    //string <mark> tags out
                    cell.innerHTML = txt_content;

                    if (index > -1) {
                        match = true;

                        //add 'highlight' effect by adding <mark> tag around the substring
                        cell.innerHTML =
                            txt_content.substring(0, index) +
                            "<mark>" +
                            txt_content.substring(index, index + typed_text.length) +
                            "</mark>" +
                            txt_content.substring(index + typed_text.length);
                    }
                }
                if (match) {
                    set_row_background_color(row);
                } else if (!match) {
                    row.style.display = "none";
                }
            }
        };

        const is_integer = (str) => {
            // Check if the string contains only numeric characters
            if (/^[0-9]+$/.test(str)) {
                // Parse the string and check if it's a valid integer
                const int_val = parseInt(str);
                return !isNaN(int_val);
            }
            return false;
        };

        const iterate_through_cells = (cells, conf_prop) => {
            for (const cell of cells) {
                const cell_child = cell.children[0];
                css(conf_prop, cell_child);
            }
        };

        const responsive_design = () => {
            const cells = plugin_dom_obj.querySelectorAll("#cell_cont");
            //grid cells media defaults
            iterate_through_cells(cells, conf.style.cell);
            cell_max_width();
            //apply extra css in media query like fashion
            if (plugin_dom_obj.offsetWidth > 414) {
                //footer container media queries
                css(conf.style.larger_width_entries_container, entries_container);
                css(conf.style.larger_width_pager_cont, pager_cont);
                css(conf.style.center_child_elems, footer_container);
                css(conf.style.larger_width_footer_container, footer_container);
                //header container media queries
                css(conf.style.larger_width_search_bar, search_bar);
                css(conf.style.larger_width_search_container, search_container);
                css(conf.style.larger_width_search_icon, search_icon);
                //grid cells media queries
                iterate_through_cells(cells, conf.style.larger_width_cell);
            } else {
                //footer container defaults
                css(conf.style.entries_container, entries_container);
                css(conf.style.pager_cont, pager_cont);
                css(conf.style.footer_container, footer_container);
                //header container defaults
                css(conf.style.search_bar, search_bar);
                css(conf.style.search_container, search_container);
                css(conf.style.search_icon, search_icon);
                //grid cells media defaults
            }

            uncompress_col_headers(cells);
        };

        const uncompress_col_headers = (cells) => {
            // check if any of the headers are cut off, and if so, increase the max-width for that column
            let header_cells = [].slice.call(cells); //convert NodeList to array
            header_cells = header_cells.splice(0, tot_num_cols);
            let compressed_headers = {};
            let idx = 0;
            for (const cell of header_cells) {
                const cell_child = cell.children[0];
                // if any of the headers are cut off, readjust cell max-width here
                do {
                    let max_width = parseInt(cell_child.style.maxWidth);
                    max_width *= 1.1;
                    cell_child.style.maxWidth = max_width + "vw";
                    compressed_headers[idx] = max_width;
                } while (cell_child.scrollWidth > cell_child.parentElement.clientWidth);
                idx++;
            }
            //comp_idx equals compressed indexe
            for (let comp_idx in compressed_headers) {
                comp_idx = parseInt(comp_idx);
                //corr_mw = corrresponding max width
                const corr_mw = compressed_headers[comp_idx];
                for (const row of table.rows) {
                    //iterate through the rows and modify the max_width for cells at index 'i'
                    const des_width = corr_mw + "vw"; // des_width = desired width
                    try {
                        let cell_to_modify =
                            row.cells[comp_idx].querySelector("#cell_cont").children[0];
                        cell_to_modify.style.maxWidth = des_width;
                    } catch {
                        //if the code hits this catch block, it's because the row is bot_row_headers, which does not contain the same child elements as the other rows
                        row.cells[comp_idx].style.maxWidth = des_width;
                    }
                }
            }
            compressed_headers = {};
        };

        const create_footer = (tabledata) => {
            //create footer and append it to table container div
            footer_parent_container = append_child(
                "div",
                grid_container,
                "footer_parent_container"
            );
            css(conf.style.center_child_elems, footer_parent_container);
            footer_container = append_child(
                "div",
                footer_parent_container,
                "footer_container"
            );
            css(["display: block"], footer_container);
            add_pager_divs();
            reset_export();
        };

        let prev_butt;
        let next_butt;
        let first_butt;
        let last_butt;
        let edit_butts_cont;

        const add_pager_divs = () => {
            //create entries div and append it to footer
            entries_container = append_child(
                "div",
                footer_container,
                "entries_container"
            );
            css(conf.style.entries_container, entries_container);

            pager_cont = append_child("div", footer_container, "pager_cont");
            css(conf.style.pager_cont, pager_cont);

            first_butt = append_child("button", pager_cont, "first_butt");
            const fir_butt_img = append_child("img", first_butt);
            fir_butt_img.src = "/Scripts/Grid-Plugin-NG/images/first.gif";
            css(conf.style.pager_butts, fir_butt_img);
            css(conf.style.spacing, first_butt);

            prev_butt = append_child("button", pager_cont, "prev_butt");
            const prev_butt_img = append_child("img", prev_butt);
            prev_butt_img.src = "/Scripts/Grid-Plugin-NG/images/prev.gif";
            css(conf.style.pager_butts, prev_butt_img);
            css(conf.style.spacing, prev_butt);

            const txt = append_child("p", pager_cont);
            txt.innerText = " Page ";

            pag_tb = append_child("input", pager_cont, "pag_tb");
            css(conf.style.pag_tb, pag_tb);
            pag_tb.value = "1";

            tot_pgs = append_child("p", pager_cont, "tot_pgs");

            next_butt = append_child("button", pager_cont, "next_butt");
            const next_butt_img = append_child("img", next_butt);
            next_butt_img.src = "/Scripts/Grid-Plugin-NG/images/next.gif";
            css(conf.style.pager_butts, next_butt_img);
            css(conf.style.spacing, next_butt);

            last_butt = append_child("button", pager_cont, "last_butt");
            const last_butt_img = append_child("img", last_butt);
            last_butt_img.src = "/Scripts/Grid-Plugin-NG/images/last.gif";
            css(conf.style.pager_butts, last_butt_img);
            css(conf.style.spacing, last_butt);

            pag_tb.value = curr_page;

            //add cancel and save buttons
            edit_butts_cont = append_child(
                "div",
                footer_container,
                "edit_butts_cont"
            );
            css(conf.style.center_child_elems, edit_butts_cont);
            edit_butts_cont.style.display = "none";

            cancel_butt = append_child("div", edit_butts_cont, "cancel_butt");
            cancel_butt.innerText = "Cancel";
            css(conf.style.spacing, cancel_butt);
            css(conf.style.cancel_butt, cancel_butt);
            cancel_butt.addEventListener("click", function () {
                //iterate through bef_aft_obj, and for each cell remove the input textbox and add text back to cell
                for (const el_id in bef_aft_obj) {
                    //get the el
                    const el = document.getElementById(el_id);
                    const cell_tb = document.getElementById(el_id + "_tb");
                    cell_tb.style.display = "none";
                    el.innerText = bef_aft_obj[el_id];
                }
                edit_mode_off();
            });

            save_butt = append_child("div", edit_butts_cont, "save_butt");
            save_butt.innerText = "Save";
            css(conf.style.spacing, save_butt);
            css(conf.style.save_butt, save_butt);
            save_butt.addEventListener("click", function () {
                //iterate through bef_aft_obj, and for each cell remove the input textbox and add text back to cell
                for (let el_id in bef_aft_obj) {
                    let row_num = extract_row_num(el_id);
                    //get the needed elements / values
                    const el = document.getElementById(el_id);
                    const cell_tb = document.getElementById(el_id + "_tb");
                    const tb_val = cell_tb.value;
                    //edit the content as needed
                    cell_tb.style.display = "none";
                    el.innerText = tb_val;
                    el.setAttribute("id", row_num + "_" + tb_val);

                    //update rows_arr
                    const row_in_q = rows_arr[row_num];
                    for (let i = 0; i < row_in_q.length; i++) {
                        let elem_in_q = row_in_q[i];
                        if (elem_in_q === bef_aft_obj[el_id]) {
                            //modify the content in rows_arr
                            rows_arr[row_num][i] = tb_val;
                        }
                    }
                }
                edit_mode_off();
            });

        };

        const extract_row_num = function (id) {
            const _idx = id.indexOf("_");
            return parseInt(id.slice(0, _idx));
        }

        const reset_export = function () {
            const container = append_child("div", footer_container, "butts_container");
            css(["margin: 0 1em"], container);
            reset_butt = append_child("button", container, "reset_butt");
            css(["margin: 0 .5em"], reset_butt);

            reset_butt.innerText = "Reset";
            reset_butt.addEventListener("click", function () {
                pagination_active(1);
            })
 /*           export_butt = append_child("button", container, "export_butt");
            export_butt.innerText = "Export";*/
        }

        const edit_mode_off = (clicked_butt) => {
            //since bef_aft_obj will only have 1 property at a time, grab the first key in bef_aft_obj, which will be an integer representing a row number
            const edited_row = document.getElementById(
                "row_" + extract_row_num(Object.keys(bef_aft_obj)[0])
            );
            reset_row_backgrounds(edited_row);
            change_pos("left", edited_row);

            //wipe the object clean
            bef_aft_obj = {};

            edit_mode.set_mode(false);
        };

        const error_handling = () => {
            if (is_integer(pag_tb.value)) {
                //check to see if the page number is in bounds
                const tb_val = parseInt(pag_tb.value);
                if (tb_val >= 1 && tb_val <= num_of_pages) {
                    pagination_active(pag_tb.value);
                    return;
                }
                alert("Input value out of bounds. Please retry.");
            } else {
                alert("Invalid input. Please retry.");
            }
            pag_tb.focus();
        };

        const counter = () => {
            //initialize a static variable
            let count = 0;

            //return a function that can access and modify the static variable
            return {
                get_count: function () {
                    return count;
                },
                set_count: function (new_count) {
                    count = new_count;
                },
                increment: function () {
                    count++;
                },
                decrement: function () {
                    count--;
                },
                reset: function () {
                    count = 0;
                },
            };
        };

        const edit_mde = () => {
            //initialize a static variable
            let edit_mode = false;
            let row;

            //return a function that can access and modify the static variable
            return {
                get_mode: function () {
                    return edit_mode;
                },
                set_mode: function (bool) {
                    edit_mode = bool;
                    if (!edit_mode) {
                        css(["background-color: #fff;"], grid_container);
                    } else {
                        css(conf.style.row_hov_color, grid_container);
                        css(["background-color: #fff;"], bott_row_headers);
                        css(["background-color: #fff;"], search_icon);
                    }
                    edit();
                },
                set_edit_row: function (curr_row) {
                    row = curr_row;
                },
                get_edit_row: function () {
                    return row;
                },
            };
        };

        const window_sze = () => {
            let prev_width, prev_height;

            return {
                set: function (curr_width, curr_height) {
                    prev_width = curr_width;
                    prev_height = curr_height;
                },
                prev_height: function () {
                    return prev_height;
                },
                prev_width: function () {
                    return prev_width;
                },
            };
        };

        let rows_arr = [];
        let excess_cols = [];
        let excess_rows = [];
        let cols_ascending = {};
        let bott_row_headers;
        let table_name;
        let table;
        let grid_container;
        let header_container;
        let footer_parent_container;
        let footer_container;
        let num_of_pages;
        let tot_num_cols;
        let table_cont;
        let tabledata_rows;
        let headers_ord;
        let ord_ro_obj;
        let ord_bind_obj = {};
        let ord_name_obj = {};
        let load_grid_called = false;
        const background_count = counter();
        const compressed_num_of_cols = counter();
        const header_click = counter();
        const window_size = window_sze();
        const edit_mode = edit_mde();
        this.headers_arr;

        //elem = element
        const css = (property, elem) => {
            for (const css of property) {
                elem.style.cssText += css;
            }
        };

        const populate_table = (tabledata_rows, rs, _self) => {
            //remove all rows from table
            const table_rows = table.rows;
            while (table_rows.length > 1) {
                table.removeChild(table_rows[table_rows.length - 1]);
            }

            background_count.set_count(1);
            //break the incoming json down into its seperate parts
            tabledata_len = tabledata_rows.length;
            tabledata_rows = tabledata_rows.slice(
                first_entry_index,
                first_entry_index + page_len
            );
            tabledata_rows.forEach((row, idx) => {
                row = tabledata_rows[idx];
                const row_dobj = add_row(row);
                row_dobj.addEventListener("click", function (event) {
                    if (!event.ctrlKey && !edit_mode.get_mode()) {
                        conf.on_row_click(rs.properties, idx);
                    }
                })
            });
            bot_row_headers();
        };

        const num_invisible_rows = () => {
            let count = 0;
            for (const row of table.rows) {
                if (row.style.display === "none") {
                    count++;
                }
            }
            return count;
        };

        const cell_max_width = () => {
            //determine max-width for each cell
            const headers_row = table.rows[0];
            num_vis_cols = 0;
            let headers_offsetWidth = 0;
            const target_width = grid_container.offsetWidth;

            for (const header of headers_row.cells) {
                num_vis_cols++;
                headers_offsetWidth += header.offsetWidth;
                if (headers_offsetWidth > target_width) {
                    break;
                }
            }

            //for whatever reason, cannot apply a % width to cells, it has to be in 'vw'. So have to calculate vw based off of the width of the plugin parent container
            const plugin_to_window_width =
                (plugin_dom_obj.offsetWidth / document.body.offsetWidth) * 100;
            const max_cell_width = plugin_to_window_width / num_vis_cols;

            conf.style.cell.push("max-width:" + max_cell_width + "vw");
            conf.style.larger_width_cell.push("max-width:" + max_cell_width + "vw");
        };

        const compress_excess_rows = () => {
            excess_rows = [];
            const table_rows = table.rows;
            let bott_row_count = table_rows.length - 2;
            while (grid_container.offsetHeight > plugin_dom_obj.offsetHeight) {
                //make the bottom most row invisible
                const bott_row = table_rows[bott_row_count];
                bott_row.style.display = "none";
                bott_row_count--;
                excess_rows.unshift(bott_row);
            }

            page_len = bott_row_count;
            //update rows_arr
            rows_arr = [];
            for (const row of table_rows) {
                if (row.style.display !== "none") {
                    let row_arr = [];
                    for (const cell of row.cells) {
                        row_arr.push(cell.innerText);
                    }
                    rows_arr.push(row_arr);
                }
            }
            last_entry_index = rows_arr.length - 2;
            num_of_entries = last_entry_index - first_entry_index + 1;
        };

        const bot_row_headers = () => {
            const tr = append_child("tr", table, "bot_row_headers");
            bott_row_headers = tr;
            const headers = table.rows[0];
            for (const header of headers.cells) {
                const th = append_child("th", tr);
                th.innerText = header.innerText;
                css(conf.style.bot_row_headers, th);
            }
        };

        //elem = element
        const set_row_background_color = (elem) => {
            background_count.increment();
            const count = background_count.get_count();
            if (count % 2 != 0) {
                css(conf.style.row_color, elem);
            } else {
                css(conf.style.alt_color, elem);
            }
        };

        const edit = () => {
            if (edit_mode.get_mode()) {
                for (const child of footer_container.children) {
                    child.style.display = "none";
                }
                edit_butts_cont.style.display = "flex";

            } else {
                for (const child of footer_container.children) {
                    child.style.display = "flex";
                }
                edit_butts_cont.style.display = "none";

                //highlight_on_search();
            }
            responsive_design();
        };

        const change_pos = function (position, row) {
            for (const td of row.cells) {
                const cell_cont = td.children[0];
                css(conf.style.center_child_elems, cell_cont);
                css(["justify-content: " + position + ";"], cell_cont);
            }
        }

        const add_inputs_to_row = (el, row_num) => {
            const row = el.parentElement.parentElement.parentElement;
            if (!row.querySelector("input")) {

                edit_mode.set_mode(true);
                reset_row_backgrounds(row);

                for (let i = 0; i < row.cells.length; i++) {
                    if (ord_ro_obj[i]) {
                        continue;
                    }
                    const cell = row.cells[i].children[0].children[0];
                    const id = cell.id;

                    //save cell's content to bef_aft_obj
                    bef_aft_obj[[id]] = cell.innerText;

                    //grab the width of the cell prior to adding in the tb
                    const cell_width = cell.parentElement.offsetWidth * .9;

                    cell.innerText = "";

                    //create, append, and adjust textbox into cell
                    const cell_tb = document.createElement("input");
                    cell_tb.setAttribute("id", id + "_tb");
                    css(["padding: 0;"], cell);
                    css(
                        ["width: " + cell_width + "px", "font-size: inherit;", "height: inherit;"],
                        cell_tb
                    );
                    cell.appendChild(cell_tb);
                    cell_tb.addEventListener("click", function () {
                        cell_tb.select();
                    });
                    cell_tb.value = bef_aft_obj[id];

                    if (id === el.id) {
                        cell_tb.select();
                    }
                }
                change_pos("center", row);
            }
        };

        const edit_cell = (el, row_num) => {
            el.addEventListener("click", function (event) {
                const curr_row = plugin_dom_obj.querySelectorAll("tr")[row_num];
                edit_mode.set_edit_row(curr_row);
                //if edit mode was enabled by the user
                if (entries_container.parentNode == footer_container && event.ctrlKey) {
                    const row = edit_mode.get_edit_row();
                    add_inputs_to_row(el, row, row_num);
                }
            });
        };

        const add_row = (row_arr, headers_arr, rs, _self) => {
            //update rows_arr every time array is added
            const cells = row_arr.cell;
            if (cells) {
                row_arr = cells;
            }

            //rearrange cols to match schema ord
            if (!load_grid_called || headers_arr) {
                const row_arr_copy = Array.from(row_arr);
                for (let i = 0; i < headers_ord.length; i++) {
                    const desired_idx = headers_ord[i];
                    row_arr[i] = row_arr_copy[desired_idx];
                }
            }

            rows_arr.push(row_arr);
            const tr = document.createElement("tr");

            //add cells to 'tr'
            for (let i = 0; i < row_arr.length; i++) {
                //create and add cell to table row
                const td = create_cell(i, row_arr[i], row_arr, headers_arr, tr);
                tr.appendChild(td);
            }
            tr.setAttribute("id", "row_" + (rows_arr.length - 1));
            table.appendChild(tr);
            set_row_background_color(tr);
            row_events(tr);
            return tr;
        };

        const create_cell = (cell_num, cell_text, row_arr, header_row, tr) => {
            const cell = document.createElement("div");
            cell.innerText = cell_text;
            const row_num = rows_arr.length - 1;
            let td;
            if (header_row) {
                td = document.createElement("th");
                cell.setAttribute("id", cell_text);
                const img = add_img_to_header(cell, cell_text);
                header_cell_effects(cell, img);
                cols_ascending[cell_text] = true;
                cell.onclick = handle_click;
            } else {
                cell.setAttribute("id", row_num + "_" + conv_to_snakecase(cell_text.toString()));
                td = document.createElement("td");
                //add a click event listener to every cell inside the grid if ro is false for its corresponding column
                if (!ord_ro_obj[cell_num]) {
                    edit_cell(cell, row_num);
                }
            }
            cell_on_hov_events(td, cell, tr, row_arr);

            return td;
        };

        const header_cell_effects = (icon_cell, icon) => {
            //only do this hover effect if the icon was neutral to begin with
            let icon_cell_click;
            icon_cell.addEventListener("mouseover", function () {
                if (icon.src.includes("images/neutral.png")) {
                    icon.src = "/Scripts/Grid-Plugin-NG/images/ascending.png";
                    icon_cell_click = header_click.get_count();
                }
            });
            icon_cell.addEventListener("mouseout", function () {
                //only return the img src to neutral.png if the user has not triggered the header cell click event
                const h = header_click.get_count();
                if (header_click.get_count() === icon_cell_click) {
                    icon.src = "/Scripts/Grid-Plugin-NG/images/neutral.png";
                }
            });
            icon_cell.addEventListener("click", function () {
                header_click.increment();
            });
        };

        const row_events = (row) => {
            row.addEventListener("mouseover", function () {
                if (!edit_mode.get_mode()) {
                    css(conf.style.row_hov_color, this);
                }
            });
            row.addEventListener("mouseout", function () {
                if (!edit_mode.get_mode()) {
                    reset_row_backgrounds(this);
                }
            });
        };

        const cell_on_hov_events = (td, cell, tr, row_arr) => {
            //initialize variables needed for displaying the text of cells that have been cut off
            let timeout;
            let cutoff_div;
            const cell_cont = append_child("div", td, "cell_cont");
            // css(["position: relative;"], cell_cont);
            cell_cont.appendChild(cell);

            //add a hover event listener to each table row that highlights the rows the cursor is hovering over
            cell.addEventListener("mouseover", function () {
                //check to see if the cell has hidden content and edit mode is off
                if (cell.scrollWidth > cell.clientWidth && !edit_mode.get_mode()) {
                    timeout = setTimeout(function () {
                        //make div appear here
                        if (cutoff_div === undefined) {
                            cutoff_div = append_child("div", cell_cont, "cutoff_div");
                            cutoff_div.innerText = cell.innerText;
                            css(conf.style.cutoff_div, cutoff_div);
                            //if it's a cell in the last column, shift the div to the left
                            if (cell.innerText === row_arr[row_arr.length - 1]) {
                                css(["right: .1em;"], cutoff_div);
                            }
                        } else if (cutoff_div !== undefined) {
                            cutoff_div.style.display = "";
                        }
                    }, 500);
                }
            });
            cell.addEventListener("mouseout", function () {
                //clear cutoff_div if it is visible
                if (cutoff_div !== undefined) {
                    cutoff_div.style.display = "none";
                }

                //clear timeout variable if the mouse leaves before 1s of hover time is reached
                clearTimeout(timeout);
            });
        };

        const reset_row_backgrounds = (tr) => {
            //find out whether you should apply row color or alt color to row
            const all_TRs = plugin_dom_obj.querySelectorAll("table tr");
            let count = 0;
            for (let i = 0; i < all_TRs.length; i++) {
                if (tr === all_TRs[i] && i % 2 === 0) {
                    css(conf.style.row_color, tr);
                } else if (tr === all_TRs[i] && i % 2 !== 0) {
                    css(conf.style.alt_color, tr);
                }
            }
        };

        const are_arrays_eq = (arr1, arr2) => {
            if (arr1.length !== arr2.length) {
                return false;
            }

            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) {
                    return false;
                }
            }
            return true;
        };

        const add_img_to_header = (cell, id) => {
            const img = append_child("img", cell);
            css(conf.style.img, img);
            img.setAttribute("id", id);
            img.src = "/Scripts/Grid-Plugin-NG/images/neutral.png";
            //add extra css to header cells
            css(conf.style.header_cells_ex, cell);
            return img;
        };

        const conv_to_snakecase = (string) => {
            //if argument string > 1 word, make it snakecase
            if (string.includes(" ")) {
                string = string.replace(/ /g, "_");
            }
            return string;
        };

        const conv_to_Title_Case = (str) => {
            return str
                .replace(/(^\w)/g, (g) => g[0].toUpperCase())
                .replace(/([-_]\w)/g, (g) => " " + g[1].toUpperCase())
                .trim();
        };

        function handle_click(event) { }

        const modify_img_in_header = (header_id) => {
            //iterate through header row
            const header_row = table.rows[0];
            const target_cell = document.getElementById(header_id);
            for (let i = 0; i < header_row.cells.length; i++) {
                const header_cell = header_row.cells[i].childNodes[0].childNodes[0];
                const header_img =
                    header_row.cells[i].childNodes[0].childNodes[0].childNodes[1];

                //modify the img_src
                if (header_cell === target_cell) {
                    if (cols_ascending[header_id]) {
                        header_img.src =
                            "/Scripts/Grid-Plugin-NG/images/descending.png";
                    } else {
                        header_img.src = "/Scripts/Grid-Plugin-NG/images/ascending.png";
                    }
                    css(["opacity: 1"], header_img);
                } else {
                    header_img.src = "/Scripts/Grid-Plugin-NG/images/neutral.png";
                    css(conf.style.img, header_img);
                }
            }
        };

        const compress_excess_cols = () => {
            excess_cols = [];
            const table_rows = table.rows;
            //add another condition that ensure cols continue being removed until there is no overlow in the header cells
            while (table_cont.scrollWidth > table_cont.clientWidth) {
                excess_cols.push([]);
                let col_num = excess_cols.length - 1;
                for (let i = 0; i < table_rows.length; i++) {
                    const table_row = table_rows[i].cells;
                    const last_visible_cell =
                        table_row[table_row.length - excess_cols.length];

                    //update table and local scope 'excess_cols' array
                    last_visible_cell.style.display = "none";
                    excess_cols[col_num].push(last_visible_cell);
                    //rows_arr doesn't include bottom row headers, whilst table_rows does. Thus, check if rows_arr[i] is undefined
                    const row_arr = rows_arr[i];
                    if (row_arr !== undefined) {
                        row_arr.pop();
                    }
                }
            }
        };

        const collapsible_div = (row, collapsible_cell) => { };

        const create_grid = function () {
            create_header();
            header_container.style.display = "none";
            table_cont = append_child("div", grid_container, "table_cont");
            table = append_child("table", table_cont, "table1");
            css(conf.style.table, table);
            create_footer();
        };

        const add_headers = (schema) => {
            headers_ord = [];
            self.headers_arr = [];
            for (const schem of schema) {
                headers_ord.push(schem.ord);
                self.headers_arr.push(conv_to_Title_Case(schem.name));
            }

            ord_ro_obj = {};
            for (let i = 0; i < headers_ord.length; i++) {
                const focus_idx = headers_ord[i];
                let focus_schem;
                for (const schem of schema) {
                    if (schem.ord == focus_idx) {
                        ord_ro_obj[focus_idx] = schem.ro;
                        ord_bind_obj[focus_idx] = schem.bind;
                        ord_name_obj[focus_idx] = schem.name;
                        break;
                    }
                }
            }

            add_row(self.headers_arr, true);
            tot_num_cols = self.headers_arr.length;
        };

        const pagination_active = (new_page) => {
            conf.data_adapter.load(getParameters(), function (data) {
                curr_page = new_page;
                first_entry_index = (new_page - 1) * page_len;
                set_pagination_nums();
                pag_tb.value = curr_page;
                populate_table(data.rows);
                responsive_design();
            });
        };

        var getParameters = function () {
            let parameters = {};
            parameters.searchTerm = "";
            parameters.searchField = "name";
            parameters.status = "";
            parameters.orderType = "";
            parameters.passType = "";
            return parameters;
        }


        this.api = {
            grid_mode: function (new_mode) {
                alert(new_mode);
            },
            load_grid: function () {
                conf.data_adapter.load(getParameters(), function (data, th, se) {
                    num_of_pages = Math.ceil(data.rows.length / page_len);
                    add_headers(data.schema);
                    populate_table(data.rows, th, se);
                    grid_mode.set(conf.grid_mode);
                    load_grid_called = true; //this boolean variable is used to rearrange cols to match schema ord
                });
                pag_tb.addEventListener("keydown", function (event) {
                    if (event.key === "Enter") {
                        error_handling();
                    }
                });
                pag_tb.addEventListener("focus", function () {
                    pag_tb.value = "";
                });

                next_butt.addEventListener("click", function () {
                    if (curr_page != num_of_pages) {
                        pagination_active(curr_page + 1);
                    } 
                });
                prev_butt.addEventListener("click", function () {
                    if (curr_page != 1) {
                        pagination_active(curr_page - 1);
                    } 
                });
                first_butt.addEventListener("click", function () {
                    pagination_active(1);
                });
                last_butt.addEventListener("click", function () {
                    pagination_active(num_of_pages);
                });
                try {

                } catch {
                    alert(
                        "Error, invalid data format. Look into plugin documentation for a reference of valid format."
                    );
                }
            },
        };

        create_grid();
        return this;
    };
})(jQuery);
let ls = {
    data_adapter: {
        load: function (parameters) {
            var callback = null;
            if (arguments.length > 1) callback = arguments[1];
            rs = new $.ls.recordSet("Sales.SelectGrid");
            rs.finish = function () {
                data = rs.properties.getRecordset();
                //rs does NOT have a getValue function, so the open function in Main.html does not work
                if (callback) callback(data, this, self);
            }
            rs.open(parameters, function () {
                let data = rs.properties.getRecordset();
                if (callback) callback(data);
            });
            return self;
        }
    },
    on_row_click: self.open_test
}