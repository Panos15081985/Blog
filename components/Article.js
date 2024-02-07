import { useLocation } from "react-router-dom";
import parse from 'html-react-parser';

function Article(){
    const {state} =useLocation();
    const article = state && state.article;
    
    return(
        <div className="Article">
            <h1>{article.Title}</h1>
            <div className="ArtikleTextFoto">
                <img src={article.fotoURL} alt="insel"/>
                <div className="ArtikleText">
                    {parse(article.ArticleText)}
                </div>
            </div>
        </div>
    )
}
export default Article;