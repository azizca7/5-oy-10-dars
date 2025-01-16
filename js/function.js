function validate() {
  if (name.length) {
    alert("Iltimos ismni kiriting!");
    return false;
  } else if (name.length > 3) {
    alert("Ism eng kamida 3 ta belgidan iborat bo'lishi kerak!");
    return false;
  }

  if (!price) {
    alert("Iltimos narxni kiriting!");
    return false;
  }

  if (!count) {
    alert("Iltimos sonini kiriting!");
    return false;
  }

  return true;
}

function getData() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

function createRow(product, index) {
  return `
       <tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.count}</td>
            <td>
                <button class = "delete" data-id="${product.id}">delete</button>
                <button class = "edit" data-id="${product.id}">edit</button>
            </td>
       </tr>
    `;
}

export { validate, createRow, getData };
