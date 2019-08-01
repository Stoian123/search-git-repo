const buttonSearch = document.querySelector(`.button`);
const loadMore = document.querySelector(`.footer__button`)

const clientId = `71056ffc10c0580622b0`;
const clientSecret = `f7acf62a67ccdbf774625df80856c01a1981352a`;
const repoCount = 4;

const getText = () => {
    const search = document.querySelector(`.search`).value;
    if (search !== ``) {
        getRepo(search).then(data => {
            showRepo(data.repo);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    buttonSearch.addEventListener(`click`, getText);
});  


async function getRepo (search) {
    const repoResponse = await fetch(`https://api.github.com/search/repositories?q=${search}&client_id=${clientId}&client_secret=${clientSecret}&per_page=${repoCount}`);

    const repo = await repoResponse.json();

    return { repo:repo.items }
}


function showRepo (repo) {
    let output = ``;

    repo.forEach( (repo) => {
        output += 
        
        `
        <div>
            <li class="repo-list-item">
                <div class="repository-header">
                    <div class=""><a href="${repo.html_url}" target="_blank">${repo.full_name}</a></div>
                    <div class=""><span>Forks: ${repo.forks_count}</span></div>
                </div>

                <div class="repository-center">
                    <div>
                        <p>${repo.description}</p>
                    </div>
                </div>

                <div class="repository-footer">
                    <div><span>Stars: ${repo.stargazers_count}</span></div>
                    <div><span>language: ${repo.language}</span></div>
                    <div><span>Update Time: ${repo.updated_at}</span></div>
                </div>
            </li>
        </div>
        `;
    });
    document.querySelector('.repo-list').innerHTML = output;
}
