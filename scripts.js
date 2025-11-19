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
    liked: false,
  };

  posts.unshift(post);
console.log(posts)
  postForm.reset();

  // vamos a crear el posta para que se renderice
createPost(posts)
});


const createPost =(posts)=>{
    console.log("ingrese al post", posts)
}