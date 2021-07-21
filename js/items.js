const getItems = () => {
  const array = [];

  const ul = document.createElement("ul");
  array.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = "idk";
    ul.appendChild(li);
  });

  document.getElementById("ul_parent").appendChild(ul);
};
