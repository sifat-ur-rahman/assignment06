const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
    displayElement(data.data.news_category)
}

const displayElement = (categorys) => {
    const clickElement = document.getElementById('click-element')
    categorys.forEach(category => {
        console.log(category)
    });
}


loadData()