const postForm = document.getElementById("post-form");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const imageInput = document.getElementById("image");
const feed = document.getElementById("feed");
const emptyText = document.getElementById("empty-text");

const posts = [];
let like=0
postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target);
  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  console.log(title, description, imageInput);

  const id = Date.now().toString();
  let imageUrl = null;
  if (imageInput.files && imageInput.files[0]) {
    const file = imageInput.files[0];
    imageUrl = URL.createObjectURL(file);
  }

  console.log(imageUrl);

  //creemos el post
  const post = {
    id,
    title,
    description,
    imageUrl,
    likes: 0,
    liked: false,
  };

  posts.unshift(post);
console.log(posts)
  postForm.reset();

  // vamos a crear el posta para que se renderice
 const card = createPost(post)
 // la card que ya se creo la debo pintar en algun lado, en este caso en feed
 feed.prepend(card);
});


const createPost =(post)=>{
    console.log("ingrese al post", post)
    const divPost = document.createElement('div');
      divPost.className = 'card';
      divPost.dataset.postId = post.id;
     
 
      divPost.innerHTML = `
        <img src="${post.imageUrl}" class="card-img-top" alt="Imagen post">
        <div class="card-body">
          <h5 class="card-title mb-1">${post.title}</h5>
          <p class="card-text">${post.description}</p>

          <div class="d-flex justify-content-between align-items-center">
            <div>
              <button class="btn btn-sm like-btn" type="button" aria-pressed="${post.liked ? 'true' : 'false'}">
                <i class="bi bi-heart${post.liked ? '-fill' : ''}" aria-hidden="true"></i>
                <span class="ms-1 like-count">${post.likes}</span>
              </button>
            </div>
            <small class="text-muted">Publicado ahora</small>
          </div>
        </div>
      `;
      // Ajustar clase si ya está like
      const likeBtn = divPost.querySelector('.like-btn');
      if (post.liked) likeBtn.classList.add('liked');

      return divPost;
}

feed.addEventListener('click', (e) => {
    console.log("ingrese", e.target.closest('.like-btn'))
      
    });

