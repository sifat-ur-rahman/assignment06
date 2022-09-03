const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayElement(data.data.news_category)

    }
    catch (error) {
        console.log(error);
    }
}

const displayElement = (categorys) => {
    const clickElement = document.getElementById('click-element')
    categorys.forEach(category => {
        // console.log(category)
        const categoryP = document.createElement('p')
        categoryP.classList.add('col')
        categoryP.innerHTML = `
        <p  onclick="loadNewsCard('${category.category_id}'), toggleSpinner(true)">${category.category_name}</p>
        `
        clickElement.appendChild(categoryP)


    });
}
const loadNewsCard = async (category_id) => {
    const urlId = ` https://openapi.programming-hero.com/api/news/category/${category_id}`
    try {
        const res = await fetch(urlId)
        const data = await res.json()
        displayNewsCard(data.data)

    }
    catch (error) {
        console.log(error);
    }

}
const displayNewsCard = (newsBox) => {
    const newsCard = document.getElementById('news-card')
    newsCard.textContent = ''

    // newsArray.sort(function (a, b) { return b - a })
    // console.log(newsBox)
    const foundItems = document.getElementById('found-items')
    foundItems.innerHTML = newsBox.length
    const noNews = document.getElementById('no-found-massege')
    if (newsBox.length === 0) {
        noNews.classList.remove('d-none')
    }
    else {
        noNews.classList.add('d-none')
    }
    console.log(newsBox.total_view);

    newsBox.sort((a, b) => { return b.total_view - a.total_view })
    newsBox.forEach(news => {
        const newsDiv = document.createElement('div')

        newsDiv.classList.add('col')
        newsDiv.innerHTML = `
        <div class="card h-100 shadow">
            <img src="${news.image_url}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">${news.details.length > 150 ? news.details.slice(0, 150) + '...' : news.details}</p>
                <div class="d-flex justify-content-between">
                    <div>
                    <img class="w-25 h-auto d-inline-block rounded-circle" src="${news.author.img}" alt="">  <p class="d-inline-block">Name: ${news.author.name ? news.author.name : 'No Outhor'}</p>
                    </div>
                    <div class="d-flex align-items-center">
                    <i class="fa-regular fa-eye"></i> 
                    <p>${news.total_view ? news.total_view : 'No view'}</p>
                    </div>
                </div>
                </div>
                <button type="button" onclick="newsDsetail('${news._id}')" class="btn btn-info m-4 " data-bs-toggle="modal" data-bs-target="#exampleModal">Show Detail</button>

        </div>
        `


        newsCard.appendChild(newsDiv)


    });
    toggleSpinner(false)
}
const newsDsetail = async (news_id) => {
    const urlModal = `https://openapi.programming-hero.com/api/news/${news_id}`
    const res = await fetch(urlModal)
    const data = await res.json()
    displayModal(data.data[0])

}
const displayModal = (modal) => {
    const newsModal = document.getElementById('news-modal')
    const newsModalTitle = document.getElementById('exampleModalLabelId')
    console.log(modal);
    newsModalTitle.innerText = `${modal.title}`
    newsModal.innerHTML = `
    <img src="${modal.image_url}" class="img-fluid" alt="">
    <p>${modal.details.length > 150 ? modal.details.slice(0, 150) + '...' : modal.details}</p>
    <div class="d-flex justify-content-evenly">
    <p>Author Name: ${modal.author.name ? modal.author.name : 'No Outhor'}</p>
    <p>View: ${modal.total_view ? modal.total_view : 'No view'}</p>
    </div>
    `

}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}


loadData()