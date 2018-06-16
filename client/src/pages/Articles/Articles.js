import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn, Header } from "../../components/Form";

class Articles extends Component {
    state = {
        articles: [],
        title: "",
        author: "",
        isSearch: false
        };

    componentDidMount() {
        this.loadArticles();
    }
    
    loadArticles = () => {
        API.getArticles()
            .then(res => this.setState({ articles: res.data, title: this.state.title, author: this.state.author})
            )
            .catch(err => console.log(err));
    };
    deleteArticle = id => {
        API.deleteArticle(id)
            .then(res => this.loadArticles())
            .catch(err => console.log(err));
    };
    updateArticle = (id, item) => {
        API.updateArticle(id, item)
            .then(res => this.loadArticles())
            .catch(err => console.log(err));
    };
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    handleFormSearch = event => {
        event.preventDefault();
        if (this.state.title || this.state.author) {
            this.setState({
                isSearch: true
            })
            this.loadArticles()
        }
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.title && this.state.author) {
            API.saveArticle({
                title: this.state.title,
                author: this.state.author
            })
                .then(res => this.loadArticles())
                .catch(err => console.log(err));
        }
    };
   


    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>What Articles Should I Read?</h1>
                        </Jumbotron>
                        <form>
                            <Header><h1>Search</h1></Header>
                            <Input
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                name="title"
                                placeholder="Title (required)"
                            />
                            <Input
                                value={this.state.author}
                                onChange={this.handleInputChange}
                                name="author"
                                placeholder="Author"
                            />
                            
                            <FormBtn
                                disabled={!(this.state.title)}
                                onClick={this.handleFormSearch}
                            >
                                Search Article
                            </FormBtn>

                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12 sm-12">
                        <Header><h1>Results</h1></Header>
                        {this.state.isSearch ? (
                            <List>
                                {this.state.articles.map(article => {
                                    if (article.title.includes(this.state.title) && article.author.includes(this.state.author)){
                                        return(
                                            <ListItem key={article._id}>
                                                <Link to={"/articles/" + article._id}>
                                                    <strong>
                                                        {article.title}
                                                        <br />
                                                        {article.author}
                                                    </strong>
                                                </Link>
                                                <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                                                <br/>
                                                <SaveBtn onClick={()=> this.updateArticle(article._id, {saved: true})} />
                                            </ListItem>
                                        )
                                    }
                                    
                                })}
                            </List>
                        ) : (
                                <h3>No Results to Display</h3>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12 sm-12" >
                    <Header><h1>Saved Articles</h1></Header>
                        {this.state.articles.length ? (
                            <List>
                                {this.state.articles.map(article => {
                                    if (article.saved) {
                                        return (
                                            <ListItem key={article._id}>
                                                <Link to={"/articles/" + article._id}>
                                                    <strong>
                                                        {article.title}
                                                        <br />
                                                        {article.author}
                                                    </strong>
                                                </Link>
                                                <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                                            </ListItem>
                                        )
                                    }
                                }
                                )}
                            </List>
                        ) : (
                                <h3>No Results to Display</h3>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Articles;
