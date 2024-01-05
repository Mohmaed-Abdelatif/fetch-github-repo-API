let myInput = document.querySelector(".get-repos input");
let myButton = document.querySelector(".get-repos button");
let reposData = document.querySelector(".show-data");

myButton.onclick = function(){
    fetchRepos();
};
function fetchRepos(){
    if(myInput.value==""){
        reposData.innerHTML="<span>Please Write GitHub UserName.<span/>";
    }else{
        fetch(`https://api.github.com/users/${myInput.value}/repos`)
        .then((res)=>{
            // console.log(res.json());
            return res.json();
        })
        .then((data)=>{
        console.log(data);
        reposData.innerHTML=""
        let i=1;
        data.forEach(repo => {
            let mainDiv = document.createElement('div');
            mainDiv.className = 'repoBox';
            mainDiv.innerHTML = `
                ${i}- ${repo.name}
                <div>
                    <a href="https://github.com/${myInput.value}/${repo.name}" target="_blank">Visit<a/>
                    <span>${repo.stargazers_count}Star<span/>
                <div/>
                
            `;
            reposData.appendChild(mainDiv);
            i++;
        });
        })
        .catch((err)=>{
            console.log(err);
        })
    }
};