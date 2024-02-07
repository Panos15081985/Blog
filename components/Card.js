import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';


function Card(props){
    const article = props.article;
    const navigate = useNavigate();

     const ArticleWindow = ()=>{
        navigate('../Article',{state: {article}});
     }
    return(
        <div className="card" onClick={ArticleWindow}>
            <h2>{article.Title}</h2>
            <img src={article.fotoURL} alt="insel"/>
            <div className="cardText">
                <div className="text1">{parse(article.ArticleText)}</div>
                <p className="text2">mehr lesen...</p>
            </div>
        </div>
    )
}
export default Card;