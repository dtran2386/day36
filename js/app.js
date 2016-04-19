
    function getSuperHeroes(success, failure) {
        var query = document.getElementById('search-box').value;
        var request = new XMLHttpRequest();
//        request.open('get', 'http://gateway.marvel.com:80/v1/public/characters?nameStartsWith=' + query + '&apikey=06ea344c402ac50cd0af89518b4a9284'); //doesn't show error, but also doesn't show anything for some reason.
        request.open('GET', 'http://gateway.marvel.com:80/v1/public/characters?nameStartsWith=Sh&limit=50&apikey=06ea344c402ac50cd0af89518b4a9284');
        request.onload = function () {
            if (request.status === 200) {
                var response = JSON.parse(request.responseText);
                success(response.data.results);
            } else {
                failure({
                    code: request.status,
                    message: 'didnt recieve a response.',
                });
            }
        };
        request.send();
    }

    function announce(value) {
        console.log(value);
        return value;
    }

    function getHeroes(hero) {
        var listView = document.getElementById('list');
        var generator = _.template(document.getElementById('list-view-template').textContent);
        for (var i = 0; i < hero.length; i++) {
            var html = generator({
                image: hero[i].thumbnail.path + '/portrait_small' + '.' + hero[i].thumbnail.extension,
                heroName: hero[i].name,
            });
            var list = document.createElement('li');
            list.innerHTML = html;
            listView.appendChild(list);
        }// end for loop
    };// end getHeroes

    function justNames(response) {    
    //    return response.data.results.map((hero) => hero.name);
        return response.data.results.map(function (entry) {
            return entry.name;
        });
    }

    function freakOut(error) {
        console.error(`error ${error.code}: ${error.message}`);
    //     console.error('error ' + error.code + ': ' + error.message);
    }

window.addEventListener('load', function () {

    var characters = new Promise(getSuperHeroes);
    characters
        .then(getHeroes)
//        .then(announce)
//        .then(justNames)
//        .then(announce)
        .catch(freakOut);
});