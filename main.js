const repoListElement = document.querySelector('#repoList');
const repoElement = document.createElement('li');

function refreshRepos(repositories) {

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
        .then((respositories) => {
            refreshRepos(respositories.data);
        })
        .catch((error) => {
            changeFirstItem('Usuário não encontrado');
            console.log(error);
        });
    changeFirstItem('Carregando...');
}

function changeFirstItem(message) {
    if (repoListElement)
        repoListElement.innerHTML = '';

    repoElement.innerText = message;

    repoListElement.appendChild(repoElement);
}

function search() {
    const inputElement = document.querySelector('input');
    reachGithubAPI(inputElement.value);
}

function enterListener(event) {
    if (event.keyCode === 13)
        search();
}