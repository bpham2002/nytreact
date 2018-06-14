import axios from "axios";

export default {
    // Gets all books
    getArticles: function () {
        //name = "?title=/^In/"
        return axios.get("/api/articles");
    },
    // Gets the book with the given id
    getArticle: function (id) {
        return axios.get("/api/articles/" + id);
    },
    // Update the article with given id
    updateArticle: function (id, item) {
        return axios.put("/api/articles/" + id, item)
    },
    // Deletes the book with the given id
    deleteArticle: function (id) {
        return axios.delete("/api/articles/" + id);
    },
    // Saves a book to the database
    saveArticle: function (articleData) {
        return axios.post("/api/articles", articleData);
    }
};
