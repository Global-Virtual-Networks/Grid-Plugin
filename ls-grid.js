class ls_grid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const ls_grid_container = document.createElement("div");
    this.shadowRoot.append(ls_grid_container);
    window.addEventListener("DOMContentLoaded", () => {
      ls_grid_container.style.cssText = this.getAttribute("style");
      this.removeAttribute("style");
    });

    const self = this;
    let headerIdx = null;
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
    let search_container;
    let search_ddl;
    let search_icon;
    let reset_butt;
    let export_butt;
    let sf_idx;
    let default_sf = "All"; //sf equals search filter
    let prev_butt;
    let next_butt;
    let first_butt;
    let last_butt;
    let edit_butts_cont;
    let ogLsGridWidth;
    let rows_arr = [];
    let excess_cols = [];
    let excess_rows = [];
    let cols_ascending = {};
    let bott_row_headers;
    let table_name;
    let table;
    let grid_container;
    let header_container;
    let footer_container;
    let num_of_pages;
    let tot_num_cols;
    let table_cont;
    let tabledata_rows;
    let ord_bind_obj = {};
    let ord_name_obj = {};
    let sortedBy_icon;
    let headers_arr;
    let header_info = {};
    let table2;
    let rtd;
    let condensedDivs = [];
    let headerCells = new Map(); //using Map class because it allows HTML elements to exist as keys
    let visCondensedRows = [];
    let rowClickEvent = true;

    let conf = {
      icons: {
        ascending:
          "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAMAAAB1GNVPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADNQTFRF1NTUfX190dHRtLS0l5eXQEBAR0dH1dXVREREr6+v2dnZn5+fbGxseXl5RkZGzMzM////BUSGAAAAABF0Uk5T/////////////////////wAlrZliAAAAJklEQVR42mIQEBBgA2IGAQEORh4QzcrLycwtwMDHwsTPwMUOEGAAFi0BOZt2IEwAAAAASUVORK5CYII=",
        descending:
          "data:image/png;base64,  iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAMAAAB1GNVPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADBQTFRFfX19xMTEbW1ttLS0jo6OREREr6+vycnJj4+Pubm5jIyMlpaWsLCwoKCg1NTU////gVMa/AAAABB0Uk5T////////////////////AOAjXRkAAAAmSURBVHjaYmBl4GLhZeNh4Gfi5mTn42fg5+dg5OMH0fzMQAwQYAAQZgEsd9uAdAAAAABJRU5ErkJggg==",
        neutral:
          "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFJJREFUWEft08EVABAMBNHRGZVTmqtDrqzDKCA2/2Ub4dfC/2MABb4UmEC/1I4FjHN2JRAPcGn5euyXN6CAAvEaxgN4AwooEK9hPIA3oIACTwU2v58MIZifSLoAAAAASUVORK5CYII=",
        next: "data:image/png;base64, R0lGODlhEAAQAMQRACRIkChNli1TnjNZpjhgrz9otx1m9S9kzy9l0zBiyD5z2yRq8ixx7jRy6ERvwEp1yE970P///1OA1lOE3VWF3liH30+K9k+J/VeH4F+M4Wec+2ic+YWu/4iu/6K9/6W//yH5BAEAABEALAAAAAAQABAAAAU2YCSOZGmeqIilppSxJPS9cPRoX1U7F/dRsMJF0/FMWASGRaOADRaNQ01gSNQiAcQ1Ath6v7UQADs=",
        prev: "data:image/png;base64, R0lGODlhEAAQAMQfAF+M4aW//1WF3lOE3Sxx7h1m9S9kz4iu/y1Tnk970CRq8jhgr6K9/0+K9oWu/yRIkC9l0zBiyERvwD5z20p1yDNZpliH31OA1leH4D9ot2ib/TRy6Gic+UeE+yhNlv///yH5BAEAAB8ALAAAAAAQABAAAAU34CeOZGmeaImlJXCxIxAk8GcFGgULgdNIrAHjwOlkYBNOg7CoGTaKSu0TKSCmH4gH+3lwv2BTCAA7",
        last: "data:image/png;base64, R0lGODlhEAAQAMQNACRIkC1TnjNZpj9otyxm2Dhu3D913Sxx7kRvwEJt1Ep1yEh630574f///1OA1lGD4VaE6V+L4GCM5GiU5W+W7G2Z5mec+3Ga536f7oKg542r8Iiu/5a076G+8KK9/6rE7yH5BAEAAA0ALAAAAAAQABAAAAVZYCOOZGme52Ve2WRWUVl9jzl58Th1jil5m8RIwumVIhyLRdiIaBSmh8ZyIAgaDwzCtLhUAaIFZWAyPAhgkYFyLRUSaVFB0iahSwRIwETgM+IoInCAgYWGDSEAOw==",
        first:
          "data:image/png;base64, R0lGODlhEAAQAMQNACRIkC1TnjNZpj9otyxm2Dhu3D913Sxx7kRvwEJt1Ep1yEh630574f///1OA1lGD4VaE6V+L4GCM5GiU5W+W7G2Z5mec+3Ga536f7oKg542r8Iiu/5a076G+8KK9/6rE7yH5BAEAAA0ALAAAAAAQABAAAAVWYCOOZGme55RdJls+X1VGcul0Exl5uc1Jo8TGAywpNBFRwmLhJEsIzKMhIBwsmmlpQFmIANaLtySgGEbgx5ksKZAACXcpACGUwCYAw17iv+EogYKDJCEAOw==",
      },
      grid_mode: "pagination",
      style: {
        //css relating to table
        row_color: ["background-color: #ffffff"],
        alt_color: ["background-color: #ededed"],
        row_hov_color: ["background-color: #c7dafe"],
        ultimate_parent_container: [
          "display: flex;",
          "justify-content: center;",
        ],
        scroll_mode: ["overflow-y: scroll"],
        grid_container: [
          "background-color: #fff",
          "overflow-x: auto;",
          "width: 100%;",
          "height: 100%;",
          "min-height: 100px",
          "position: relative",
        ],
        table: [
          "font-family: sans-serif;",
          "border-collapse: collapse;",
          "table-layout: fixed;",
          "width: 100%;",
        ],
        cell: [
          "padding: 3.5px 0;",
          "font-size: 12px;",
          "overflow: hidden;",
          "white-space: nowrap;",
          "text-overflow: ellipsis;",
          "position: relative;",
        ],
        header_cell_icons: [
          "position: absolute;",
          "top: 0;",
          "left: 50%;",
          "visibility: hidden;",
        ],
        larger_width_cell: [],
        context_menu: [
          "background-color: white;",
          "z-index: 999;",
          "border: 1px solid black;",
        ],
        // context_menu_opt: ["padding: .75em;", "font-size: .75em;"],
        cutoff_div: [
          "border: 1px solid black",
          "background-color: white;",
          "padding: 5px;",
          "font-size: 10px;",
          "line-height: 15px;",
          "position: absolute",
          "overflow: visible;",
          "z-index: 999;",
        ],
        // header_img: [
        //   "width: 15px;",
        //   "height: auto;",
        //   "opacity: 0.5;",
        //   "margin-left: 1em;",
        // ],

        //css relating to header
        header_container: [
          "max-height: 10%;",
          "display: flex;",
          "align-items: center;",
          "justify-content: right;",
          "padding: 0 8px 4px 8px;",
          "background-color: #b6b6b6",
        ],
        search_ddl: ["cursor: pointer;", "border: 2px solid black;"],
        sddl_opt: ["cursor: pointer;"],
        larger_width_search_container: [],
        search_bar: ["border: 2px solid black;", "border-radius: 0;"],
        larger_width_search_bar: [],
        label: ["margin: 0;", "font-size: 12px;"],
        container: ["margin: 0 10px;"],
        larger_width_search_icon: [],
        //css relating to footer
        center_child_elems: [
          "display: flex;",
          "align-items: center;",
          "justify-content: center;",
        ],
        footer_container: [
          "display: flex;",
          "padding: 6px 18px;",
          "background-color: #b6b6b6",
          "padding : 3px 0",
          "position: absolute",
          "bottom: 0",
          "width: 100%",
        ],
        pager_cont: [
          "display: flex;",
          "align-items: center;",
          "font-size: 12px",
        ],
        larger_width_pager_cont: [],
        pager_butts: ["width: 10px;"],
        entries_container: ["text-align: center;", "font-size: 12px"],
        larger_width_entries_container: [],
        pag_tb: [
          "font-size: 12px",
          "width: 30px;",
          "height: 8px;",
          "padding: 3px 6px;",
          "margin: 0 6px;",
          "border: 1.5px solid black;",
          "border-radius: 5px;",
          "text-align: center;",
        ],
        reset_butt: ["font-size: 12px;"],
        spacing: [
          "margin: 0 6px;",
          " cursor: pointer;",
          "border: none",
          "background: none",
        ],
        cancel_butt: [
          // "font-size: .8em",
          // "border: 1px solid black",
          // "border-radius: .5em;",
          // "padding: .5em;",
          // "margin: 1em .5em;",
          // "width: auto",
          // "text-align: center;",
          // "background-color: white",
        ],
        save_butt: [
          // "font-size: .8em",
          // "padding: .5em;",
          // "margin: 1em .5em;",
          // "border-radius: .5em",
          // "width: auto;",
          // "text-align: center;",
          // "border: 1px solid black;",
          // "background-color: white",
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
          "padding: 5px 10px;",
          "font-size: 12px;",
        ],
      },
    };

    //add event listeners that will change the cursor depending on whether the ctrl key is being held or not
    document.addEventListener("keydown", function (event) {
      if (event.key === "Control") {
        css(["cursor: pointer;"], ls_grid_container);
      }
    });
    document.addEventListener("keyup", function (event) {
      if (event.key === "Control") {
        css(["cursor: auto;"], ls_grid_container);
      }
    });

    const condenseCols = function () {
      while (ls_grid_container.offsetWidth >= screen.width) {
        let headerCell;
        const rows = table.rows;

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const cells = row.cells;

          const condensedCell = cells[cells.length - 1];

          if (i === 0) {
            headerCells = new Map([
              [condensedCell.cloneNode(true), condensedCell.offsetWidth],
              ...headerCells,
            ]); //add element to beginning of array

            ls_grid_container.style.width =
              ls_grid_container.offsetWidth - condensedCell.offsetWidth + "px";
          }

          row.removeChild(condensedCell);

          condensedCell.style.cssText = "width: auto; margin: 5px;";
          condensedCell.querySelector("#cell_cont").style.cssText =
            "border: none;";

          if (i === 0) {
            headerCell = condensedCell;
            continue;
          }

          const condensedCol = document.createElement("div");
          condensedCol.style.cssText = "display: none; align-items: center;";
          row.parentElement.insertBefore(condensedCol, row.nextElementSibling);

          const rowCell1 = row.cells[0];

          if (!rowCell1.querySelector("img")) {
            const condColsIcon = document.createElement("img");
            condColsIcon.src = conf.icons.ascending;
            condColsIcon.style.transform = "rotate(90deg)";
            rowCell1.insertBefore(condColsIcon, rowCell1.children[0]);
            rowCell1.style.cssText =
              "display: flex; align-items: center; justify-content: space-between;";
            rowCell1.addEventListener("click", function (e) {
              const parentTR = this.parentElement;
              let elem = parentTR.nextElementSibling;

              while (elem.localName !== "tr") {
                if (elem.style.display === "none") {
                  elem.style.display = "flex";
                  condColsIcon.style.transform = "rotate(180deg)";
                  if (!visCondensedRows.includes(parentTR.id))
                    visCondensedRows.push(parentTR.id);
                } else {
                  elem.style.display = "none";
                  condColsIcon.style.transform = "rotate(90deg)";
                  visCondensedRows.splice(
                    visCondensedRows.indexOf(parentTR.id),
                    1
                  );
                }
                elem = elem.nextElementSibling;
              }
            });
          }

          condensedCol.appendChild(headerCell.cloneNode(true));
          condensedCol.appendChild(condensedCell);

          condensedDivs.push(condensedCol);
        }

        table_cont.style.height =
          "calc(100% - " +
          (header_container.offsetHeight + footer_container.offsetHeight) +
          "px)"; //added 20 for whitespace at bottom of HTML element

        rowClickEvent = false;
      }

      //display any previously visible condensed columns
      if (!rowClickEvent) {
        for (const idx of visCondensedRows) {
          const tr = table.rows[parseInt(idx) + 1];
          const cell1Icon = tr.cells[0].querySelector("img");
          let elem = tr.nextElementSibling;

          while (elem.localName !== "tr") {
            if (elem.style.display === "none") {
              elem.style.display = "flex";
              cell1Icon.style.transform = "rotate(180deg)";
            }
            elem = elem.nextElementSibling;
          }
        }
      } else visCondensedRows = [];
    };

    //child_el = child element
    const append_child = (child_el, parent, id) => {
      const child = document.createElement(child_el);
      parent.appendChild(child);
      if (typeof id != "undefined") {
        child.setAttribute("id", id);
      }
      return child;
    };

    const grid_mde = () => {
      return {
        set: function (mode) {
          if (mode === "scroll") {
            css(conf.style.scroll_mode, ls_grid_container);
            footer_container.style.display = "none";
          } else if (mode === "pagination") {
            set_pagination_nums();
          } else {
            alert(
              "Invalid argument object property: Use 'scroll' or 'pagination' instead of '" +
                mode +
                "' for grid_mode property."
            );
            ls_grid_container.removeChild(grid_parent_container);
          }
        },
      };
    };

    const grid_mode = grid_mde();

    const set_pagination_nums = () => {
      //dataset is displayed correctly, even though first_entry_index is off by one? To prevent further issues, displaying a different variables variable in entries_container
      let fe_idx = first_entry_index;
      //add an ADD operator here that checks to see if pagination or window resize triggered this function
      if (fe_idx != 1) {
        fe_idx = first_entry_index + 1;
      }
      let last_entry_index = first_entry_index + conf.rtd;
      if (first_entry_index + conf.rtd > tabledata_len) {
        last_entry_index = tabledata_len;
      }
      entries_container.innerText =
        fe_idx + " - " + last_entry_index + " of " + tabledata_len + " entries";

      //set page number
      tot_pgs.innerText = "of " + num_of_pages;
    };

    const mode = function () {
      let mode = false;

      return {
        set: function (bool) {
          mode = bool;
        },
        get: function () {
          return mode;
        },
      };
    };

    const search_mode = mode();

    function Search(grid_container, headers_arr) {
      var self = this; //have to use 'var' as variable type because it wasn't available in the public methods otherwise
      this.ddls = [];
      const container_div = grid_container;

      let raw_data = [];
      //get a copy of raw data from data adapter
      conf.data_adapter.load(function (data) {
        raw_data = data.rows;
      });
      let ddl_filtrations = raw_data;

      //create all components of header EXCEPT ddl(s)
      const header_container = document.createElement("div");
      header_container.setAttribute("id", "header_container");
      grid_container.prepend(header_container);
      css(conf.style.header_container, header_container);

      //make header_container invisible until data comes back from async call
      header_container.style.visibility = "hidden";

      //create search bar
      const search_container = append_child(
        "div",
        header_container,
        "search_container"
      );
      css(conf.style.label_container, search_container);

      const search_label = append_child("h3", search_container, "search_label");
      search_label.innerText = "Search:";
      css(conf.style.header_container_labels, search_label);

      search_bar = append_child("input", search_container, "search_bar");
      css(conf.style.search_bar, search_bar);
      //eliminate highlight on focus
      search_bar.addEventListener("focus", function () {
        search_bar.style.outline = "none";
      });
      search_bar.addEventListener("input", function () {
        if (this.value.length > 0) {
          search_mode.set(true);
        } else {
          search_mode.set(false);
        }
        ddl_filtration(ddl_filtrations);
      });

      function deepEqual(obj1, obj2) {
        if (obj1 === obj2) return true;

        if (!(obj1 instanceof Object) || !(obj2 instanceof Object))
          return false;

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) return false;

        return keys1.every((key) => deepEqual(obj1[key], obj2[key]));
      }

      const find_matching_elements = function (array1, array2) {
        let smaller_array, larger_array;
        let res = [];
        if (array1.length < array2.length) {
          smaller_array = array1;
          larger_array = array2;
        } else {
          smaller_array = array2;
          larger_array = array1;
        }

        for (const element of smaller_array) {
          if (
            larger_array.find((obj) => deepEqual(obj, element)) !== undefined
          ) {
            res.push(element);
          }
        }
        return res;
      };

      const ddl_options = function (ddl, unique_data) {
        if (!Array.isArray(unique_data)) {
          unique_data = Object.keys(unique_data);
        }

        for (const option of unique_data) {
          const sddl_option = append_child("option", ddl, option + "_option");
          sddl_option.innerText = option;
        }

        //add 'all' option to ddl
        // const all_option = document.createElement("option");
        // all_option.setAttribute("id", "all_option");
        // all_option.innerText = "All";
        // ddl.insertBefore(all_option, ddl[0]);
        // ddl.selectedIndex = 0;
      };

      const ddl = function (unique_data, ddl_label) {
        const ddl_container = append_child("div", header_container);
        css(conf.style.label_container, ddl_container);

        const label = append_child("h3", ddl_container);
        css(conf.style.header_container_labels, label);
        label.innerHTML = ddl_label + ": ";
        const ddl = append_child("select", ddl_container);
        css(conf.style.search_ddl, ddl);
        ddl.addEventListener("change", function () {
          if ((ddl.value = "All")) {
          }

          ddl_filtrations = find_matching_elements(
            ddl_filtrations,
            unique_data[ddl.value]
          );
          ddl_filtration(ddl_filtrations);
        });
        ddl_options(ddl, unique_data);

        self.ddls.push(ddl);
        return ddl;
      };

      this.ddl = function (header_index, ddl_label) {
        conf.data_adapter.load(function (data) {
          let unique_data = { All: raw_data };
          const rows = data.rows;

          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const cell = row.cell[header_index];

            // if (!unique_data.includes(cell)) {
            //   unique_data.push(cell);
            // }

            if (!unique_data.hasOwnProperty(cell)) {
              unique_data[cell] = [];
            }
            unique_data[cell].push(row);
          }

          const new_ddl = ddl(unique_data, ddl_label);
          new_ddl.selectedIndex = 0;
        });
      };

      this.header_on = function () {
        header_container.style.visibility = "visible";
      };

      this.header_off = function () {
        header_container.style.visibility = "hidden";
      };

      //create default ddl
      let headers_obj = { All: raw_data };
      for (const header of headers_arr) {
        headers_obj[header] = raw_data;
      }
      const default_ddl = ddl(headers_obj, "Column");

      return this;
    }

    const create_header = () => {
      //create header
      grid_container = append_child("div", ls_grid_container, "grid_container");
      css(conf.style.grid_container, grid_container);
      header_container = append_child(
        "div",
        grid_container,
        "header_container"
      );
      css(conf.style.header_container, header_container);

      //make header_container invisible until data comes back from async call
      header_container = header_container;
      header_container.style.visibility = "hidden";

      //create default ddl
      const ddl_container = append_child("div", header_container);
      css(conf.style.container, ddl_container);

      const ddl_label = append_child("h3", ddl_container);
      ddl_label.innerHTML = "Column:";
      css(conf.style.label, ddl_label);

      search_ddl = append_child("select", ddl_container, "search_ddl");
      css(conf.style.search_ddl, search_ddl);

      search_ddl.addEventListener("change", function () {
        default_sf = this.value;
        //if there is a search currently in the textbox, need to call highight_on_search function for an accurate response/filter
        if (search_mode.get()) {
          self.filter_rows();
        }
      });

      const sddl_option = append_child("option", search_ddl, default_sf);
      sddl_option.innerText = default_sf;

      //create search bar
      search_container = append_child(
        "div",
        header_container,
        "search_container"
      );
      css(conf.style.container, search_container);

      search_icon = append_child("h3", search_container, "search_icon");
      search_icon.innerText = "Search:";
      css(conf.style.label, search_icon);
      // search_icon = append_child(
      //   "img",
      //   search_container,
      //   "search_icon"
      // );
      // search_icon.setAttribute("src", conf.icons.search);

      search_bar = append_child("input", search_container, "search_bar");
      css(conf.style.search_bar, search_bar);
      //eliminate highlight on focus
      search_bar.addEventListener("focus", function () {
        search_bar.style.outline = "none";
      });
      search_bar.addEventListener("input", function () {
        if (this.value.length > 0) {
          search_mode.set(true);
        } else {
          search_mode.set(false);
        }
        self.filter_rows();
      });
    };

    this.filter_rows = () => {
      const col = header_info[headerIdx];
      let p = {};
      if (col) {
        p = {
          orderBy: col.name,
          sortOrder: col.ascending ? "ASC" : "DESC",
        };
      }
      conf.data_adapter.load(p, function (data) {
        if (!self.schema) self.schema = data.schema;
        if (!table.querySelector("th")) {
          //here if a null dataset came back when first call on ls_grid function occurred
          add_headers(conf.data_adapter.columns, data.schema);
          header_container.style.visibility = "visible";
          footer_container.style.visibility = "visible";
        }

        //filter rows based on search bar value
        const typed_text = search_bar.value.toLowerCase();
        const rows = data.rows;
        let search_matches = [];
        let row;

        sf_idx = headers_arr.indexOf(default_sf); //sf equals search filter

        for (let i = 0; i < rows.length; i++) {
          row = rows[i];
          const cell = row.cell[sf_idx];
          if (sf_idx > -1) {
            let index;
            try {
              index = cell.toString().toLowerCase().indexOf(typed_text);
            } catch {}

            if (index > -1 || typed_text === "") {
              search_matches.push(row);
            }
          } else {
            for (let cell of row.cell) {
              let index;
              try {
                index = cell.toString().toLowerCase().indexOf(typed_text);
              } catch {}

              if (index > -1 || typed_text === "") {
                search_matches.push(row);
                break;
              }
            }
          }
        }
        num_of_pages = Math.ceil(search_matches.length / conf.rtd);

        //return condensed columns back to table in the standard format
        ls_grid_container.style.width = ogLsGridWidth + "px";
        table_cont.style.height = "auto";
        rowClickEvent = true;

        for (const div of condensedDivs) div.parentElement.removeChild(div);
        condensedDivs = [];

        //add columns back in the correct order
        for (const [cell, width] of headerCells)
          table.rows[0].appendChild(cell);
        headerCells.clear();
        //return condensed columns back to table in the standard format

        populate_table(search_matches);

        condenseCols();
      });
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
          max_width = Math.ceil(max_width * 1.1);
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
      footer_container = append_child(
        "div",
        grid_container,
        "footer_container"
      );
      css(conf.style.center_child_elems, footer_container);
      css(conf.style.footer_container, footer_container);

      //make footer invisible until data comes back from async call
      footer_container = footer_container;
      footer_container.style.visibility = "hidden";

      // css(["display: block"], footer_container); //used for mobile responsive design
      add_pager_divs();
      reset_export();
    };

    const paginate_listeners = function (element, callback) {
      element.addEventListener("mouseover", function () {
        this.style.background = "";
      });
      element.addEventListener("mouseout", function () {
        this.style.background = "none";
      });
      element.addEventListener("click", callback);
    };

    const add_pager_divs = () => {
      //create entries div and append it to footer
      entries_container = append_child(
        "div",
        footer_container,
        "entries_container"
      );
      css(conf.style.entries_container, entries_container);
      css(conf.style.larger_width_entries_container, entries_container);

      pager_cont = append_child("div", footer_container, "pager_cont");
      css(conf.style.pager_cont, pager_cont);
      css(conf.style.larger_width_pager_cont, pager_cont);

      first_butt = append_child("button", pager_cont, "first_butt");
      const fir_butt_img = append_child("img", first_butt);
      fir_butt_img.setAttribute("src", conf.icons.first);
      css(conf.style.pager_butts, fir_butt_img);
      css(conf.style.spacing, first_butt);
      paginate_listeners(first_butt, function () {
        pagination_active(1);
      });

      prev_butt = append_child("button", pager_cont, "prev_butt");
      const prev_butt_img = append_child("img", prev_butt);
      prev_butt_img.setAttribute("src", conf.icons.prev);
      css(conf.style.pager_butts, prev_butt_img);
      css(conf.style.spacing, prev_butt);
      paginate_listeners(prev_butt, function () {
        if (curr_page != 1) {
          pagination_active(curr_page - 1);
        }
      });

      const txt = append_child("p", pager_cont);
      txt.innerText = " Page ";

      pag_tb = append_child("input", pager_cont, "pag_tb");
      css(conf.style.pag_tb, pag_tb);
      pag_tb.value = "1";
      pag_tb.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          error_handling();
        }
      });
      pag_tb.addEventListener("focus", function () {
        pag_tb.select();
      });

      tot_pgs = append_child("p", pager_cont, "tot_pgs");

      next_butt = append_child("button", pager_cont, "next_butt");
      const next_butt_img = append_child("img", next_butt);
      next_butt_img.setAttribute("src", conf.icons.next);
      css(conf.style.pager_butts, next_butt_img);
      css(conf.style.spacing, next_butt);
      paginate_listeners(next_butt, function () {
        if (curr_page != num_of_pages) {
          pagination_active(curr_page + 1);
        }
      });

      last_butt = append_child("button", pager_cont, "last_butt");
      const last_butt_img = append_child("img", last_butt);
      last_butt_img.setAttribute("src", conf.icons.last);
      css(conf.style.pager_butts, last_butt_img);
      css(conf.style.spacing, last_butt);
      paginate_listeners(last_butt, function () {
        pagination_active(num_of_pages);
      });

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
        const focus_row = edit_mode.get_edit_row();
        for (let i = 0; i < focus_row.children.length; i++) {
          const cell = focus_row.children[i];
          const el = cell.firstChild.firstChild;
          const cell_tb = el.firstChild;
          cell_tb.style.display = "none";
          el.innerText = bef_aft_obj[el.id];
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
    };

    const reset_export = function () {
      const container = append_child(
        "div",
        footer_container,
        "butts_container"
      );
      css(["margin: 0 10px"], container);
      reset_butt = append_child("button", container, "reset_butt");
      css(conf.style.reset_butt, reset_butt);

      reset_butt.innerText = "Reset";
      reset_butt.addEventListener("click", function () {
        search_mode.set(false);
        default_sf = "All";

        //set textbox in header_container to blank value
        const textboxs = header_container.querySelectorAll("input");
        for (const tb of textboxs) {
          tb.value = "";
        }
        //trigger input event listener for one textbox
        const inputEvent = new Event("input", { bubbles: true });
        if (textboxs.length > 0) {
          textboxs[0].dispatchEvent(inputEvent);
        }

        var checkboxes = header_container.querySelectorAll(
          'input[type="checkbox"]'
        );
        // Uncheck all checkboxes except the first one
        checkboxes.forEach(function (checkbox, index) {
          if (index !== 0) {
            checkbox.checked = false;
          } else {
            checkbox.checked = true;
          }
        });

        //set all ddls in header_container to 'All' option
        const ddls = header_container.querySelectorAll("select");
        for (const ddl of ddls) {
          ddl.selectedIndex = 0;
        }
        //trigger change event listener for one ddl
        const changeEvent = new Event("change", { bubbles: true });
        if (ddls.length > 0) {
          ddls[0].dispatchEvent(changeEvent);
        }

        for (const header in header_info) {
          header_info[header].ascending = false;
        }
        if (sortedBy_icon) {
          sortedBy_icon.style.visibility = "hidden";
          sortedBy_icon = undefined;
        }
        headerIdx = null;
        rows_arr = [];
        pagination_active(1);
      }); /*           export_butt = append_child("button", container, "export_butt");
                        export_butt.innerText = "Export";*/
    };

    const edit_mode_off = () => {
      const edited_row = edit_mode.get_edit_row();
      reset_row_backgrounds(edited_row);
      change_alignment("left", edited_row);

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

    const background_count = counter();
    const compressed_num_of_cols = counter();
    const header_click = counter();

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
          if (!edit_mode) css(["background-color: #fff;"], grid_container);
          else css(conf.style.row_hov_color, grid_container);
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

    const edit_mode = edit_mde();

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

    const window_size = window_sze();

    //elem = element
    const css = (property, elem) => {
      for (const css of property) {
        elem.style.cssText += css;
      }
    };

    const float = function (arg) {
      arg = int(arg);
      return parseFloat(arg.toFixed(2));
    };

    const int = function (arg) {
      arg = parseInt(arg);
      if (isNaN(arg)) {
        return 0;
      }
      return parseInt(arg);
    };

    function extractTime(str) {
      // Regular expression to match "HH:MM", "H:M", "HH:MM:SS", or "H:M:S" format
      const timeRegex = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/;

      // Check if the input string matches the time format
      const match = str.match(timeRegex);

      if (match) {
        return parseInt(match[0].replace(/:/g, ""));
      } else {
        // Return null or another meaningful value for invalid input
        return null;
      }
    }

    const populate_table = (tabledata_rows) => {
      //remove all rows from table
      const table_rows = table.rows;
      while (table_rows.length > 1) {
        table.removeChild(table_rows[table_rows.length - 1]);
      }

      background_count.set_count(1);
      tabledata_len = tabledata_rows.length;

      //client side sorting algorithm below
      const rows = tabledata_rows;
      if (headerIdx !== null && conf.client_sort) {
        let switching, i, x, y, shouldSwitch;
        switching = true;
        const column_info = header_info[headerIdx];

        while (switching) {
          switching = false;

          for (i = 0; i < rows.length - 1; i++) {
            shouldSwitch = false;
            x = rows[i].cell[headerIdx];
            y = rows[i + 1].cell[headerIdx];
            if (column_info.type === "int") {
              //int method includes precautions in case x or y is NaN(not a number)
              x = int(x);
              y = int(y);
            } else if (column_info.type === "float") {
              //float method includes precautions in case x or y is a whole number
              x = float(x);
              y = float(y);
            } else {
              // Use a regular expression to remove HTML tags(if they exist)
              x = x.replace(/<\/?[^>]+(>|$)/g, "").toLowerCase();
              y = y.replace(/<\/?[^>]+(>|$)/g, "").toLowerCase();

              let x_time = extractTime(x);
              let y_time = extractTime(y);
              if (x_time && y_time) {
                x = x_time;
                y = y_time;
              }
            }
            //using a conditional operator to determine whether the rows need to be shifted

            let condition = column_info.ascending ? x > y : x < y;
            if (condition) {
              shouldSwitch = true;
              break;
            }
          }
          if (shouldSwitch) {
            var tmp = rows[i];
            rows[i] = rows[i + 1];
            rows[i + 1] = tmp;
            switching = true;
          }
        }
      }

      //in case current page doesn't exist after filters are applied
      if (first_entry_index > tabledata_len) {
        pagination_active(1);
      }
      tabledata_rows = rows.slice(
        first_entry_index,
        first_entry_index + conf.rtd
      );

      tabledata_rows.forEach((row, idx) => {
        const row_dobj = add_row.call(this, row);
        set_row_background_color(row_dobj);
        row_dobj.addEventListener("click", function (event) {
          const cell1 = this.cells[0];
          if (
            !rowClickEvent &&
            (cell1 == event.target || cell1.contains(event.target))
          )
            return; //do NOT activate event listener if condensed cols exist AND cell 1 within the row is clicked

          if (!event.ctrlKey && !edit_mode.get_mode()) {
            if (typeof conf.on_row_click === "function") {
              let obj = {};
              const row = this.cells;
              const cols = conf.data_adapter.columns;
              for (let i = 0; i < row.length; i++) {
                const key = cols[i].name.toLowerCase();
                let value = row[i].textContent;
                obj[key] = value;
              }
              conf.on_row_click.call(this, obj);
            }
          }
        });
      });
      set_pagination_nums();

      //iterate through table and set background colors on rows
      background_count.reset();
      for (const row of table.rows) {
        set_row_background_color(row);
      }
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
        (ls_grid_container.offsetWidth / document.body.offsetWidth) * 100;
      const max_cell_width = plugin_to_window_width / num_vis_cols;

      conf.style.cell.push("max-width:" + max_cell_width + "vw");
      conf.style.larger_width_cell.push("max-width:" + max_cell_width + "vw");
    };

    const compress_excess_rows = () => {
      excess_rows = [];
      const table_rows = table.rows;
      let bott_row_count = table_rows.length - 2;
      while (grid_container.offsetHeight > ls_grid_container.offsetHeight) {
        //make the bottom most row invisible
        const bott_row = table_rows[bott_row_count];
        bott_row.style.display = "none";
        bott_row_count--;
        excess_rows.unshift(bott_row);
      }

      conf.rtd = bott_row_count;
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
      }
    };

    const change_alignment = function (position, row) {
      for (const td of row.cells) {
        const cell_cont = td.children[0];
        css(conf.style.center_child_elems, cell_cont);
        css(["justify-content: " + position + ";"], cell_cont);
      }
    };

    const add_row = function (row_arr, headers_arr) {
      //update rows_arr every time array is added
      const cells = row_arr.cell;
      if (cells) {
        row_arr = cells;
      }

      rows_arr.push(row_arr);
      const tr = document.createElement("tr");

      if (!headers_arr) {
        const id = table.rows.length + (curr_page - 1) * conf.rtd - 1;
        tr.setAttribute("id", id); //tr id is the row number, includes quite a bit of calculation because it takes pagination into account
        tr.__row_nbr = id;
        row_events(tr);
      }

      //add cells to 'tr', if they are included in the listed columns of the 'columns' property in the config object
      const cols_obj = conf.data_adapter.columns;
      for (let i = 0; i < cols_obj.length; i++) {
        //create and add cell to table row
        let txt = row_arr[i];
        if (txt || txt == 0) {
          txt = txt.toString();
        } else {
          txt = "";
        }
        const td = create_cell.call(this, i, txt, row_arr, headers_arr, tr);
        td.style.width = cols_obj[i].width + "px"; //apply cell width from corresponding column object
        td.style.textAlign = cols_obj[i].align; //apply align from corresponding column object
        tr.appendChild(td);
      }
      table.appendChild(tr);
      return tr;
    };

    const create_cell = function (
      cell_num,
      cell_text,
      row_arr,
      header_row,
      tr,
      col_obj
    ) {
      const cell = document.createElement("div");
      css(conf.style.cell, cell);
      if (screen.offsetWidth > 414) {
        css(conf.style.larger_width_cell, cell);
      }
      const row_num = rows_arr.length - 1;
      cell.innerText = cell_text;
      let td;
      //determine whether it is a header cell or not, and execute the corresponding code
      if (header_row) {
        td = document.createElement("th");
        cell.setAttribute("id", header_info[cell_num].name);
        css(["cursor: pointer;", "user-select: none;"], cell);

        const ascending_icon = document.createElement("img");
        ascending_icon.setAttribute("src", conf.icons.ascending);
        css(conf.style.header_cell_icons, ascending_icon);
        cell.appendChild(ascending_icon);

        const descending_icon = document.createElement("img");
        descending_icon.setAttribute("src", conf.icons.descending);
        css(conf.style.header_cell_icons, descending_icon);
        cell.appendChild(descending_icon);

        cell.addEventListener("click", function () {
          const header_row = table.rows[0].cells;
          for (let i = 0; i < header_row.length; i++) {
            const header_cell = header_row[i].children[0].children[0];
            if (this === header_cell) {
              headerIdx = i;
              const sort_ord_asc = header_info[i].ascending;
              if (sort_ord_asc) {
                ascending_icon.style.visibility = "hidden";
                descending_icon.style.visibility = "visible";
                sortedBy_icon = descending_icon;
              } else {
                ascending_icon.style.visibility = "visible";
                descending_icon.style.visibility = "hidden";
                sortedBy_icon = ascending_icon;
              }
              header_info[i].ascending = !header_info[i].ascending;
            } else {
              header_info[i].ascending = false;
              //hide icons in other headers when a new header is clicked
              for (const icon of header_cell.children) {
                icon.style.visibility = "hidden";
              }
            }
          }
          self.filter_rows();
        });
        cell.addEventListener("mouseover", function () {
          //hide icons in active headers when a new header is hovered over
          const header_row = table.rows[0].cells;
          for (let i = 0; i < header_row.length; i++) {
            const header_cell = header_row[i].children[0].children[0];
            for (const icon of header_cell.children) {
              if (icon.style.visibility === "visible") {
                sortedBy_icon = icon;
              }
              //if the cell the cursor is hovering over does NOT contain the currently visible icon
              if (!cell.contains(sortedBy_icon)) {
                icon.style.visibility = "hidden";
              }
            }
          }
          if (ascending_icon.style.visibility === "hidden") {
            ascending_icon.style.visibility = "visible";
            descending_icon.style.visibility = "hidden";
          } else {
            descending_icon.style.visibility = "visible";
            ascending_icon.style.visibility = "hidden";
          }
        });
        cell.addEventListener("mouseout", function () {
          const header_row = table.rows[0].cells;
          for (let i = 0; i < header_row.length; i++) {
            const header_cell = header_row[i].children[0].children[0];
            if (this === header_cell) {
              if (headerIdx !== i) {
                //hide icon if its corresponding header cell has not been clicked
                ascending_icon.style.visibility = "hidden";
                descending_icon.style.visibility === "hidden";
              } else {
                //if the grid is sorted by the header the cursor just stopped hovering over AND there's a mismatch between the visible icon and the sort order
                if (
                  header_info[i].ascending &&
                  descending_icon.style.visibility === "visible"
                ) {
                  descending_icon.style.visibility = "hidden";
                  ascending_icon.style.visibility = "visible";
                } else if (
                  !header_info[i].ascending &&
                  ascending_icon.style.visibility === "visible"
                ) {
                  descending_icon.style.visibility = "visible";
                  ascending_icon.style.visibility = "hidden";
                }
              }
            }
          }
          if (typeof sortedBy_icon !== "undefined") {
            sortedBy_icon.style.visibility = "visible";
          }
        });
      } else {
        //add 'highlight' effect by adding <mark> tag around the substring
        const txt_content = cell_text.toLowerCase();
        const typed_text = search_bar.value.toLowerCase();
        const index = txt_content.indexOf(typed_text);

        if (
          (index > -1 && cell_num === sf_idx && typed_text !== "") ||
          (index > -1 && default_sf === "All" && typed_text !== "")
        ) {
          cell.innerHTML =
            cell_text.substring(0, index) +
            "<mark>" +
            cell_text.substring(index, index + typed_text.length) +
            "</mark>" +
            cell_text.substring(index + typed_text.length);
        }

        cell.setAttribute("id", conv_to_snakecase(cell_text.toString()));
        td = document.createElement("td");

        // if (this.schema[cell_num]) {
        //   cell.addEventListener("click", function (event) {
        //     const row = this.parentElement.parentElement.parentElement;
        //     if (!edit_mode.get_mode() && event.ctrlKey) {
        //       if (!row.querySelector("input")) {
        //         edit_mode.set_mode(true);
        //         edit_mode.set_edit_row(row);
        //         reset_row_backgrounds(row);

        //         for (let i = 0; i < row.cells.length; i++) {
        //           const cell = row.cells[i].children[0].children[0];
        //           const id = cell.id;

        //           //save cell's content to bef_aft_obj
        //           bef_aft_obj[[id]] = cell.innerText;

        //           //grab the width of the cell prior to adding in the tb
        //           const cell_width = cell.parentElement.offsetWidth * 0.9;

        //           cell.innerText = "";

        //           //create, append, and adjust textbox into cell
        //           const cell_tb = document.createElement("input");
        //           cell_tb.setAttribute("id", id + "_tb");
        //           css(["padding: 0;"], cell);
        //           css(
        //             [
        //               "width: " + cell_width + "px",
        //               "font-size: inherit;",
        //               "height: inherit;",
        //             ],
        //             cell_tb
        //           );
        //           cell.appendChild(cell_tb);
        //           cell_tb.addEventListener("click", function () {
        //             cell_tb.select();
        //           });
        //           cell_tb.value = bef_aft_obj[id];

        //           if (id === row.id) {
        //             cell_tb.select();
        //           }
        //         }
        //         change_alignment("center", row);
        //       }
        //     }
        //   });
        // }
      }
      //set class attribute on td dom object and add right click event listeners to it
      // td.setAttribute("class", "column" + cell_num);
      //   td.addEventListener("contextmenu", function (event) {
      //     event.preventDefault();
      //     //make sure edit mode is not on and no other right click context menus exists before creating one
      //     if (
      //       !edit_mode.get_mode() &&
      //       ls_grid_container.querySelectorAll("#context_menu").length === 0
      //     ) {
      //       const context_menu = append_child(
      //         "div",
      //         ls_grid_container,
      //         "context_menu"
      //       );
      //       css(conf.style.context_menu, context_menu);
      //       context_menu.style.position = "absolute";
      //       context_menu.style.top = event.clientY + "px";
      //       context_menu.style.left = event.clientX + "px";

      //       const delete_opt = context_menu_opt("Delete Column", context_menu);
      //       delete_opt.addEventListener("click", function () {});

      //       const add_opt = context_menu_opt("Add Column", context_menu);

      //       // Remove the context menu when user clicks anywhere else
      //       window.addEventListener("click", function (e) {
      //         if (e.target !== context_menu) {
      //           ls_grid_container.removeChild(context_menu);
      //         }
      //       });
      //     }
      //     const col_cells = ls_grid_container.querySelectorAll("." + this.className);
      //   });

      //add more event listeners to cells
      cell_on_hov_events(td, cell, tr, row_arr);
      //return td for add_row function to use
      return td;
    };

    const context_menu_opt = function (text, parent_elem) {
      const opt = append_child("div", parent_elem);
      opt.innerText = text;
      css(conf.style.context_menu_opt, opt);

      opt.addEventListener("mouseover", function () {
        css(["background-color: #ddd;", "cursor: pointer"], this);
      });
      opt.addEventListener("mouseout", function () {
        css(["background-color: #fff"], this);
      });
      return opt;
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
      css(["border-right: 1px solid #ddd;"], cell_cont);
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
      const all_TRs = ls_grid_container.querySelectorAll("table tr");
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

    function handle_click(event) {}

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
            header_img.setAttribute("src", conf.icons.descending);
          } else {
            header_img.setAttribute("src", conf.icons.ascending);
          }
          css(["opacity: 1"], header_img);
        } else {
          header_img.setAttribute("src", conf.icons.neutral);

          css(conf.style.header_img, header_img);
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

    const collapsible_div = (row, collapsible_cell) => {};

    const create_grid = function () {
      create_header();
      table_cont = append_child("div", grid_container, "table_cont");
      table_cont.style.overflowY = "auto";
      table = append_child("table", table_cont, "table1");
      css(conf.style.table, table);
      create_footer();
    };

    const add_headers = (columns, schema) => {
      headers_arr = [];
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        let schem = schema ? schema[i] : null;
        header_info[i] = {
          name: column.name,
          type: schem ? schem.type : null,
          ascending: false,
        };
        const header = column.display;
        headers_arr.push(header);

        //add header to search_ddl
        const sddl_opt = append_child("option", search_ddl, header);
        sddl_opt.innerText = header;
      }

      add_row.call(this, headers_arr, true);
      tot_num_cols = headers_arr.length;
    };

    const pagination_active = (new_page) => {
      curr_page = new_page;
      first_entry_index = (new_page - 1) * conf.rtd;
      pag_tb.value = curr_page;
      self.filter_rows();
    };

    const calc_rtd = function (length) {
      let row_height;
      const screenWidth = window.innerWidth;

      if (screenWidth <= 1024) {
        //phone & tablet
        conf.style.cell.push("padding: 10px 0;");
        row_height = 36;
      } else {
        //laptop+
        conf.style.cell.push("padding: 3.5px 0;");
        row_height = 23;
      }

      let grid_space =
        ls_grid_container.parentElement.offsetHeight -
        header_container.offsetHeight -
        footer_container.offsetHeight;
      rtd = Math.floor(grid_space / row_height) - 2; //subtracting by 2 to account for header row and padding between bottom row and footer
      return Math.ceil(length / rtd);
    };

    const extend = function () {
      const extended = {};
      var deep = false;
      var i = 0;

      if (typeof arguments[0] == "boolean") {
        deep = arguments[0];
        i++;
      }

      const merge = function (obj) {
        for (const prop in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            if (
              deep &&
              Object.prototype.toString.call(obj[prop]) === "[object Object]"
            ) {
              extended[prop] = extend(true, extended[prop], obj[prop]);
            } else {
              extended[prop] = obj[prop];
            }
          }
        }
      };

      for (; i < arguments.length; i++) {
        const obj = arguments[i];
        merge(obj);
      }

      return extended;
    };

    this.api = {
      load_grid: function (config) {
        if (config) {
          conf = extend(true, conf, config);
          conf.data_adapter.load({}, function (data) {
            num_of_pages = Math.ceil(data.rows.length / conf.rtd);
            self.schema = data.schema;
            add_headers(config.data_adapter.columns, data.schema);
            populate_table(data.rows);
            ogLsGridWidth = ls_grid_container.offsetWidth;
            grid_mode.set(conf.grid_mode);

            //to account for NO specified height with absolute positioning
            footer_container.style.position = "static";
            ls_grid_container.style.height =
              ls_grid_container.offsetHeight + "px";
            footer_container.style.position = "absolute";
            condenseCols();
          });
        }
        header_container.style.visibility = "visible";
        footer_container.style.visibility = "visible";
      },
    };

    let prevWidth = window.innerWidth;

    window.addEventListener("resize", function () {
      const currWidth = window.innerWidth;
      const mapEntries = headerCells.entries().next();

      //window is being enlarged AND condensed columns exist AND there's room for an extra column width wise
      if (
        currWidth > prevWidth &&
        !mapEntries.done &&
        ls_grid_container.offsetWidth + mapEntries.value[1] <= screen.width
      ) {
        self.filter_rows();
      } else if (currWidth < prevWidth) condenseCols();

      prevWidth = currWidth;
    });

    create_grid();

    return this;
  }
}
customElements.define("ls-grid", ls_grid);
