let myInput = document.querySelector(".get-repos input");
let myButton = document.querySelector(".get-repos button");
let reposData = document.querySelector(".show-data");

function fetchRepos() {
  if (myInput.value == "") {
    reposData.innerHTML = "<span>Please Write GitHub UserName.<span/>";
  } else {
    fetch(`https://api.github.com/users/${myInput.value}/repos`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        reposData.innerHTML = "";
        let i = 1;
        data.forEach((repo) => {
          let mainDiv = document.createElement("div");
          mainDiv.className = "repoBox";
          mainDiv.innerHTML = `
            <div class="name-container">
                ${i}- ${repo.name}
            </div>
                
            <div class="data-container">
                <div >
                    <a class="link" href="https://github.com/${myInput.value}/${repo.name}" target="_blank"> Visit </a>
                </div>
                <div class="star-count">${repo.stargazers_count}Star</div>
            </div>
            `;
          reposData.appendChild(mainDiv);
          i++;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

myButton.onclick = function () {
  fetchRepos();
};
myInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    fetchRepos();
  }
});
