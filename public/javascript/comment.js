// console.log(userId);
const movieId = document.querySelector('.movie-id').textContent

async function commentFormHandler(movieId) {
    // event.preventDefault();
  
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
  
    // const movie_id = window.location.toString().split('/')[
    //     window.location.toString().split('/').length - 1
    // ];
  console.log(movie_id);
    if (comment_text) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            comment_text,
            movieId
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
  }
  
// document.querySelector('.submit-comment').addEventListener('click', commentFormHandler);