import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import DeleteBtn from "../../components/DeleteBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn, Header } from "../../components/Form";

class Articles extends Component {
    state = {
        articles: [],
        title: "",
        author: "",
        synopsis: ""
        };

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles = () => {
        API.getArticles()
            .then(res => this.setState({ articles: res.data, title: "", author: "", synopsis: "" })
            )
            .catch(err => console.log(err));
    };
    deleteArticle = id => {
        API.deleteArticle(id)
            .then(res => this.loadArticles())
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.title && this.state.author) {
            API.saveArticle({
                title: this.state.title,
                author: this.state.author,
                synopsis: this.state.synopsis
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
                                placeholder="Author (required)"
                            />
                            
                            <FormBtn
                                disabled={!(this.state.author && this.state.title)}
                                onClick={this.handleFormSubmit}
                            >
                                Submit Article
                                </FormBtn>

                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12 sm-12">
                        <Header><h1>Results</h1></Header>
                        {this.state.articles.length ? (
                            <List>
                                {this.state.articles.map(article => (
                                    <ListItem key={article._id}>
                                        <Link to={"/articles/" + article._id}>
                                            <strong>
                                                {article.title}
                                                <br />>
                                                {article.author}
                                            </strong>
                                        </Link>
                                        <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h3>No Results to Display</h3>
                            )}
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12 sm-12" >
                    <Header><h1>Saved Articles</h1></Header>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Articles;
