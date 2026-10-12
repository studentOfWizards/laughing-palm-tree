// Task 1: GitHub repositories page
// Steps:
// 1. Write getRepos(username) using fetch and async/await. Check response.ok.
// 2. Write showRepos(repos): one link per repository. Use textContent, not innerHTML.
// 3. Write init(): call getRepos inside try/catch and show a message if it fails.
// 4. Add a JSDoc comment above every function.
// 5. Call init() at the bottom of the file.
const USERNAME = "pixijs"
const USE_LOCAL_FILE = true

/**
* Fetches public repositories of the user
* @param {string} username - The github user
* @returns {Promise<Object[]>} - The repository objects
*/
async function getRepos(username) {
    const address = USE_LOCAL_FILE ? 'repos.json' : `https:api.github.com/users/${username}/repos`
    const res = await fetch(address)
    if (!(res.ok)) {
        throw new Error('Github returned: ' + res.status)
    }
    return res.json()
}

/**
* Fetches public repositories of the user
* @param {Object[]} repos - The repository objects.
* @
*/
function showRepos(repos) {
    let reposDisplay = document.getElementById("repos")

    if (repos.length === 0) {
        reposDisplay.textContent = "No public repositories found."
        return
    }

    repos.forEach(repo => {
        let repoListItem = document.createElement("li")
        repoListItemChild = document.createElement("a")
        repoListItemChild.textContent = repo.html_url
        repoListItemChild.href = repo.html_url
        repoListItem.appendChild(repoListItemChild)
        reposDisplay.appendChild(repoListItem)
    });
}

/** Loads the repositories and shows them, or an error message if it fails. */
async function init() {
    try {
        const repos = await getRepos(USERNAME)
        try {
            showRepos(repos)
        }
        catch (error) {
            console.log(error)
            document.querySelector('#repos').textContent = 'ERROR - Repositories cannot be displayed.'
        }
    }
    catch (error) {
        console.error(error);
        document.querySelector('#repos').textContent = 'ERROR - Repositories cannot be retrieved.'
    }
}

init()