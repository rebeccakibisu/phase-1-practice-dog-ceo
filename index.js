document.addEventListener("DOMContentLoaded", () => {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  const breedList = document.getElementById("dog-breeds");
  const dropdown = document.getElementById("breed-dropdown");

  let allBreeds = []; // used for filtering later

  // Challenge 1 – Fetch and display 4 dog images
  fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
      data.message.forEach(imageUrl => {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = "A random dog";
        img.style.width = "200px";
        img.style.margin = "10px";
        document.body.appendChild(img);
      });
    })
    .catch(err => console.error("Image fetch error:", err));

  // Challenge 2 & 3 – Fetch all breeds and render to <ul> + color change on click
  function renderBreeds(breeds) {
    breedList.innerHTML = ""; // clear existing items
    breeds.forEach(breed => {
      const li = document.createElement("li");
      li.textContent = breed;
      li.style.cursor = "pointer";
      li.addEventListener("click", () => {
        li.style.color = "blue"; // Challenge 3: Change color on click
      });
      breedList.appendChild(li);
    });
  }

  fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
      allBreeds = Object.keys(data.message); // Store all breeds globally
      renderBreeds(allBreeds); // Challenge 2
    })
    .catch(err => console.error("Breed fetch error:", err));

  // Challenge 4 – Filter breeds by dropdown letter
  dropdown.addEventListener("change", (event) => {
    const selectedLetter = event.target.value;
    const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
    renderBreeds(filteredBreeds);
  });
});
