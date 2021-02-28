async function getPlayersData() {
    let players = [
        'OG Anunoby',
        'Aron Baynes',
        'Deandre Bembry',
        'Chris Boucher',
        'Kyle Lowry',
        'Norman Powell',
        'Pascal Siakam',
        'Fred Vanvleet',
        'Yuta Watanabe'
    ]

    // this endpoint lets us grab the season averages of all players included in the parameter
    // for more info see: https://www.balldontlie.io/#considerations-4
    let url = 'https://www.balldontlie.io/api/v1/season_averages?player_ids[]=18&player_ids[]=35&player_ids[]=42&player_ids[]=58&player_ids[]=286&player_ids[]=380&player_ids[]=416&player_ids[]=458&player_ids[]=470'

    let result = await (await fetch(url)).json();
    let data = result.data

    for (let p in players) data[p]['player_name'] = players[p]

    return data
}


// arranges players by a stat and returns the top 5
function arrangePlayersBy(category, players){
    players.sort(function(playerA, playerB){
        return playerB[category] - playerA[category]
    });

    return players.slice(0, 5)
}

async function displayPlayers(category) {
    let players = await getPlayersData();

    let topFivePlayers = arrangePlayersBy(category, players)
    

    let playerImageNode = document.querySelectorAll('.player-img')
    let playerNameNode = document.querySelectorAll('.player-name')
    let seasonAverageNode = document.querySelectorAll('.season-average')


    for (let index = 0; index < topFivePlayers.length; index++) {               
        playerImageNode[index].src = `./assets/${topFivePlayers[index]['player_name']}.png`
        playerNameNode[index].innerHTML = topFivePlayers[index]['player_name']
        seasonAverageNode[index].innerHTML = topFivePlayers[index][category]
    }
}


async function Main(){
    selectCategoryNode = document.querySelector('.stats-categories')
    selectCategoryNode.addEventListener("change", function(){
        displayPlayers(this.value)
    });
    // display the current value when first loading onto the page
    await displayPlayers(selectCategoryNode.value);
}

Main()


