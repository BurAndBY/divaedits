fetch('https://pink-faithful-sea-lion.cyclic.app/api/db')
    .then(response => response.json())
    .then(data => {
        let songs = data.songs;
        let mainElement = document.querySelector('main');
        for (let song in songs) {
            let songDiv = document.createElement('div');
            songDiv.className = 'song';

            let horboxDiv = document.createElement('div');
            horboxDiv.className = 'horbox';

            let vertboxDiv = document.createElement('div');
            vertboxDiv.className = 'vertbox';

            let subtext1Div = document.createElement('div');
            subtext1Div.className = 'subtext';
            let h51 = document.createElement('h5');
            h51.textContent = 'Song';
            let h61 = document.createElement('h6');
            h61.textContent = songs[song].song;
            subtext1Div.append(h51, h61);

            let subtext2Div = document.createElement('div');
            subtext2Div.className = 'subtext';
            let h52 = document.createElement('h5');
            h52.textContent = 'by';
            let h62 = document.createElement('h6');
            h62.textContent = songs[song].vocaloid;
            subtext2Div.append(h52, h62);

            let subtext3Div = document.createElement('div');
            subtext3Div.className = 'subtext';
            let h53 = document.createElement('h5');
            h53.textContent = 'Charter';
            let h63 = document.createElement('h6');
            h63.textContent = songs[song].charter;
            subtext3Div.append(h53, h63);

            vertboxDiv.append(subtext1Div, subtext2Div, subtext3Div);
            horboxDiv.append(vertboxDiv);
            songDiv.append(horboxDiv);

            let infoDiv = document.createElement('div');
            infoDiv.className = 'info';

            let h2 = document.createElement('h2');
            h2.className = 'game';
            h2.textContent = songs[song].game;

            let h3 = document.createElement('h3');
            h3.className = 'charter';
            h3.textContent = 'Chart by ' + songs[song].charter;

            let h4 = document.createElement('h4');
            h4.className = 'psn-uploadid';
            h4.innerHTML = 'PSN: ' + songs[song].psn + '<br>Upload ID: ' + songs[song].uploadid;

            infoDiv.append(h2, h3, h4);
            songDiv.append(infoDiv);

            mainElement.append(songDiv);
        }
    })
    .catch(error => console.error('Error:', error));
