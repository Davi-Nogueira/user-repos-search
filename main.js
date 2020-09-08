async function refreshRepos(repositories) {
    const repoListElement = document.querySelector('#repoList');

    if (repoListElement)
        repoListElement.innerHTML = ''

    for (const repo of repositories) {
        const repoElement = document.createElement('li');
        const linkElement = document.createElement('a');

        linkElement.setAttribute('href', repo.html_url);
        linkElement.setAttribute('target', '_blank');

        // linkElement
        repoListElement.appendChild(repoElement);
        repoElement.appendChild(linkElement);
        linkElement.innerText = repo.name;
    }
}

function reachGithubAPI(userID) {
    axios.get(`https://api.github.com/users/${userID}/repos`)
        .then((response) => {
            refreshRepos(response.data);
        })
        .catch((error) => {
            console.warn(error);
        });
}

function startSearching() {
    const inputElement = document.querySelector('input');
    reachGithubAPI(inputElement.value);
}

function searchOnEnter(event) {
    if (event.keyCode === 13)
        startSearching();
}