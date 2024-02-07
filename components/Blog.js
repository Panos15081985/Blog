
import db from '../Database/Config';
import { useEffect, useState } from "react";
import { collection ,onSnapshot } from "firebase/firestore";
import Card from "./Card";

function Blog(){
    let[blogs,setBlogs]=useState([]);
    let[suchItem,setSuchItem]=useState("");
    let[blogList,setBlogList]=useState([...blogs]);
  
    useEffect(()=>{
        const unsubscribe = onSnapshot(collection(db, 'Article'), (snapshot) => {
            const updatedBlogs = snapshot.docs.map((doc) => doc.data());
            setBlogs(updatedBlogs);
        });
        return () => {
            // Diese Aufräumarbeiten sind wichtig, um Lecks zu verhindern
            unsubscribe();
        };
    },[])

    useEffect(()=>{
        let Newliste=[...blogs];
        if(suchItem!==""){
            let filterListe=Newliste.filter((item)=>{
                return item.Title.toLowerCase().includes(suchItem.toLowerCase())
            })
            setBlogList(filterListe)
        }
        else
            setBlogList(Newliste)
    },[suchItem,blogs])

    return(
        <div className="BlogContainer" >
        <div className="Blog">
            <div className="BlogTitle">
                <img alt="logo" src="img/blog.png"></img>
                <h1>Blog</h1>
            </div>
            <p>Hier findest du eine Übersicht aller Blogbeiträge </p>
            <input
                type="text"
                value={suchItem}
                placeholder="Suche"
                onChange={(e)=>{setSuchItem(e.target.value)}}
            />
            </div>
            <div className="articleContainer">
                {blogList.map((article,aidx)=>{
                    return(
                        <div key={aidx}>
                            <Card article={article}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Blog;


