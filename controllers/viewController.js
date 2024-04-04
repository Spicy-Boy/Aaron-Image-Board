
async function renderCatalogPage(req, res)
{
    try{
        res.render("");
    } catch (error) {
        let errorObj = {
            message: "renderCatalogPage failed",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

module.exports = {
    renderCatalogPage
};