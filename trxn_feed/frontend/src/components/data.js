


async function getFeed(url=''){

    const response = await fetch(url)
    let data = response.json()
    return data
}
getFeed('/api/feed/')
.then((data) => {
    console.log(data);
})

export default data