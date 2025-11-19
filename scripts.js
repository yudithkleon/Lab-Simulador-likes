const postForm = document.getElementById("post-form");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const imageInput = document.getElementById("image");
const feed = document.getElementById("feed");
const emptyText = document.getElementById("empty-text");

const posts = [];

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
    dislikes: 0,

    liked: false,
  };

  posts.unshift(post);
  console.log(posts);
  postForm.reset();

  // vamos a crear el posta para que se renderice
  const card = createPost(post);
  // la card que ya se creo la debo pintar en algun lado, en este caso en feed
  feed.prepend(card);
});

const createPost = (post) => {
  const divPost = document.createElement("div");
  divPost.className = "card post-card";
  divPost.dataset.postId = post.id;

  divPost.innerHTML = `
    <img src="${post.imageUrl}" class="card-img-top" alt="Imagen post">

    <div class="card-body">
      <h5 class="card-title mb-1">${post.title}</h5>
      <p class="card-text">${post.description}</p>

      <div class="d-flex justify-content-between align-items-center">

        <div class="d-flex gap-2">
       
          <button class="btn btn-outline-secondary round-btn btn-like" type="button">
             <i class="bi bi-heart"></i>
          </button>
          <button class="btn btn-outline-secondary round-btn btn-dislike" type="button">
            <i class="bi bi-hand-thumbs-down"></i>
          </button>
          <span class="ms-2 like-count">${post.likes}</span>

        </div>

     
      </div>
    </div>
  `;
  return divPost;
};


feed.addEventListener("click", (e) => {
  const likeBtn = e.target.closest(".btn-like");
  const dislikeBtn = e.target.closest(".btn-dislike");

  if (!likeBtn && !dislikeBtn) return;

  const card = e.target.closest(".card");
  const postId = card.dataset.postId;

  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex === -1) return;

  const post = posts[postIndex];

  const heartIcon = card.querySelector(".btn-like i");
  const countSpan = card.querySelector(".like-count");

    if (likeBtn) {
    post.likes += 1;
    heartIcon.classList.add("liked");
  }


  if (dislikeBtn) {
    post.likes = Math.max(0, post.likes - 1);
    heartIcon.classList.remove("liked");
  }

  // Actualiza el numerito
  countSpan.textContent = post.likes;
});