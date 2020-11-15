async function getMovies() {
    const response = await fetch('/api/movie', {
        method: 'get',
        body: JSON.stringify({
            poster: response.data.Poster,
            title: response.data.Title
        }),
        headers: { 'Content-Type': 'application/json' }
    })
        //check response status
        if (response.ok) {
            console.log('success');
        }
        else {
            alert(response.statusText);
        }
}