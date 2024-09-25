async function generateWorks(categoryId = null) {
    const works = await getWorks();
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = '';


    for (let i = 0; i < works.length; i++) {
        const work = works[i];
        if (categoryId && work.categoryId !== parseInt(categoryId)) {
          }  else {
        
        const figure = document.createElement("figure");
        
        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;

        const caption = document.createElement("figcaption");
        caption.textContent = work.title;

        gallery.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(caption);
        
    }};
}
generateWorks()