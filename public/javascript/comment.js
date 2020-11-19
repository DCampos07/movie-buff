// const movie_id = document.querySelector('.movie-id').textContent;
// const post_id = window.location.toString().split('/')[
//   window.location.toString().split('/').length -1
// ];
// commentFormHandler(movie_id);

async function commentFormHandler(movie_title) {
    // event.preventDefault();
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    
  
    //  const movie_title = window.location.toString().split('/')[
    //     window.location.toString().split('/').length - 1
    // ];
  
    if (comment_text) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            comment_text: comment_text,
            movie_title: movie_title
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
  
//   document.querySelector('.submit-comment').addEventListener('click', commentFormHandler);