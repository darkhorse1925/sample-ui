/**
 * Working:
 * Each box has a data-open attribute which maintains the state.
 * The dynamic-content div will have the options html and fully managed by JS
 * Whenever a box is clicked the clickhandler() changes the state
 * of the current box to true and others to false.
 * It also removes the styles and dynamic-content displayed in the previously
 * selected box and calls the render().
 *
 * render() displays the dynamic-content and sets the styles based on state.
 * initialize() sets the dynamic-content and styles for the default box.
 */

const boxes = document.querySelectorAll(".box");

const dynamicContent = `
<div class="dynamic-content">
  <div class="col1">
    <p>#2</p>
    <p>#1</p>
  </div>
  <div class="col2">
    <select name="size">
      <option value="S">S</option>
      <option value="M">M</option>
      <option value="L">L</option>
      <option value="XL">XL</option>
    </select>
    <select name="size">
      <option value="S">S</option>
      <option value="M">M</option>
      <option value="L">L</option>
      <option value="XL">XL</option>
    </select>
    <p>Size</p>
  </div>
  <div class="col3">
    <select name="color">
      <option value="Red">Red</option>
      <option value="Blue">Blue</option>
      <option value="Green">Green</option>
      <option value="Yellow">Yellow</option>
    </select>
    <select name="color">
      <option value="Red">Red</option>
      <option value="Blue">Blue</option>
      <option value="Green">Green</option>
      <option value="Yellow">Yellow</option>
    </select>
    <p>Color</p>
  </div>
</div>
`;

function initialize() {
  boxes.forEach((box) => {
    box.addEventListener("click", clickHandler);
  });
  // display dynamic-content using the data attribute
  // default: data attribute "open" set true for box 2
  render();
}

initialize();

function clickHandler(event) {
  const currentBox = event.currentTarget;
  // if an currently box is clicked again take no action
  if (currentBox.dataset.open === "true") return;

  boxes.forEach((box) => {
    if (box.dataset.open === "true") {
      // set state to false if previously true
      box.dataset.open = false;

      // hide dynamic-options form previously open box
      let hasDynamicContent = box.querySelector(".dynamic-content");
      if (hasDynamicContent) {
        box.removeChild(hasDynamicContent);
      }

      //removing styles
      let toggleOutline = box.querySelector(".toggle-outline");
      let toggle = box.querySelector(".toggle");

      box.style.backgroundColor = "var(--bg)";
      toggleOutline.style.borderColor = "var(--gray)";
      toggle.style.backgroundColor = "var(--bg)";
    }
  });

  // change the open state to true for newly clicked box
  currentBox.dataset.open = true;
  render();
}

function render() {
  boxes.forEach((box) => {
    if (box.dataset.open === "true") {
      // inserting the html
      box.innerHTML += dynamicContent;
      // setting styles
      let toggleOutline = box.querySelector(".toggle-outline");
      let toggle = box.querySelector(".toggle");

      box.style.backgroundColor = "var(--secondary)";
      toggleOutline.style.borderColor = "var(--primary)";
      toggle.style.backgroundColor = "var(--primary)";
    }
  });
}
