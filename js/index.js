const form = document.querySelector("#github-form");
const userList = document.querySelector("#user-list");

// processing form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.target.querySelector("input");
  const username = input.value;
  input.value = "";

  // get GitHub users who match the provided username
  fetch(`https://api.github.com/search/users?q=${username}`)
    .then((response) => response.json())
    .then((data) => {
      // delete earlier search results
      userList.innerHTML = "";

      // recursively iterate through the returned users and show each one
      data.items.forEach((user) => {
        const userCard = createUserCard(user);
        userList.appendChild(userCard);
      });
    })
    .catch((error) => console.error(error));
});

// make a card with a user's information for GitHub
function createUserCard(user) {
  const card = document.createElement("div");
  card.className = "user-card";
  card.innerHTML = `
    <img src="${user.avatar_url}">
    <h2>${user.login}</h2>
    <a href="${user.html_url}" target="_blank">Go to GitHub profile</a>
  `;
  return card;
}
