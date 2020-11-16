async function getMovies() {
    const response = await fetch('/api/movie', {
        method: 'get',
        body: JSON.stringify({
            title,
            poster
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    console.log(response)
        //check response status
        if (response.ok) {
            console.log('success');
        }
        else {
            alert(response.statusText);
        }
}

document.querySelector('#movies').addEventListener('click', getMovies);