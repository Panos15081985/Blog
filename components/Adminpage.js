import { useLocation } from "react-router-dom";
import db from "../Database/Config";
import { useEffect, useState } from "react";
import { collection ,onSnapshot,addDoc,doc,deleteDoc,updateDoc} from "firebase/firestore";
import Card from "./Card";
import {
    ref as sRef,
    getDownloadURL,
    uploadBytes,
    getStorage,
    deleteObject,
    getMetadata
} from "firebase/storage";

function Adminpage(){
    const {state} =useLocation();
    const User = state && state.User;
    let[foto,setFoto]=useState([]);
    let[text,setText]=useState("");
    let[title,setTitle]=useState("");
    let[blogs,setBlogs]=useState([]);
    let[functionality,setfunctionality]=useState("Neue Article");
    let[articleIDs,setArticleIDs]=useState({});

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'Article'), (snapshot) => {
          const updatedBlogs = snapshot.docs.map((doc) => ({
            id:doc.id,
            data:doc.data()
          }));
          setBlogs(updatedBlogs)
          console.log(updatedBlogs)
        });
    
        return () => {
          // Diese Aufräumarbeiten sind wichtig, um Lecks zu verhindern
          unsubscribe();
        };
    }, [setBlogs]);

    let submit= async ()=>{
        const storage = getStorage();
        const storageRefPhoto = sRef(storage, `Article/${foto.name}`);
        let downloadURLPHOTO ,fotoLocation
        try {
            await uploadBytes(storageRefPhoto, foto);
            downloadURLPHOTO = await getDownloadURL(storageRefPhoto);
            const metadata = await getMetadata(storageRefPhoto);
            fotoLocation = metadata.fullPath;
        } catch (error) {
            console.error("Error uploading file: ", error);
        }
        addDoc(collection(db,"Article"),{
            ArticleText:text,
            Title:title,
            fotoURL:downloadURLPHOTO,
            fotoname:fotoLocation
        });
        setText("");
        setTitle("");
        setFoto([]);
    }

    const deleteArticle = async (articleId,fotoname) => {
        try {
          const articleRef = doc(db, 'Article', articleId);
          await deleteDoc(articleRef);
        } catch (error) {
          console.error('Fehler beim Löschen des Dokuments:', error);
        }
        deleteFoto(fotoname)
    };
    
    let deleteFoto= async (fotoname)=>{
        const storage = getStorage();
        try {
            const storageRefPhoto = sRef(storage, fotoname);
            await deleteObject(storageRefPhoto);
            console.log('Foto erfolgreich in Storage gelöscht.');
        } 
        catch (error) {
            console.error('Fehler beim Löschen des Fotos in Storage:', error);
        }
    }

    let edit=(article)=>{
        setText(article.data.ArticleText);
        setTitle(article.data.Title);
        setfunctionality("Your Article");
        setArticleIDs({
            articleID:article.id,
            fotoID:article.data.fotoname
        })
    }
    let update= async()=>{
        const storage = getStorage();
        const articleRef = doc(db, 'Article', articleIDs.articleID);
        let newData={};

        if(foto.length!==0){
            deleteFoto(articleIDs.fotoID);
            const storageRefPhoto = sRef(storage, `Article/${foto.name}`);
            let downloadURLPHOTO ,fotoLocation
            try {
                await uploadBytes(storageRefPhoto, foto);
                downloadURLPHOTO = await getDownloadURL(storageRefPhoto);
                const metadata = await getMetadata(storageRefPhoto);
                fotoLocation = metadata.fullPath;
            } catch (error) {
                console.error("Error uploading file: ", error);
            }
            newData = {
                ArticleText:text,
                Title:title,
                fotoURL:downloadURLPHOTO,
                fotoname:fotoLocation
            };
        }
        else{
            newData = {
                ArticleText:text,
                Title:title
            }; 
        }
        await updateDoc(articleRef, newData); 
        cancel()
    }

    let cancel=()=>{
        setText("");
        setTitle("");
        setfunctionality("Neue Article");
        setArticleIDs({});
        setFoto([]);
    }

    return(
        <div className="AdminPageContainer">
            <div className="Adminpage1">
                <h3>{User.Username}</h3>
                <h2>{functionality}</h2>
                <div  className="Adminpage2">
                    <div>
                        <label>Foto</label>
                        <input
                            type="file"
                            onChange={(e)=>{ setFoto(e.target.files[0])}}
                        />
                    </div>
                    <input
                        placeholder="Title"
                        onChange={(e)=>{setTitle(e.target.value)}}
                        value={title}
                    />
                    <textarea
                        onChange={(e)=>{setText(e.target.value)}}
                        value={text}
                    />
                    {functionality ==="Neue Article" ?<button onClick={submit}>Submit Data</button> :
                    <div>
                        <button onClick={update}>Update</button>
                        <button onClick={cancel}>Cancel</button>
                    </div>}
                </div>
            </div>
                <div className="articleContainer">
                {blogs.map((article,aidx)=>{
                    return(
                        <div key={aidx}>
                            <Card article={article.data}/>
                            <div className="articleContainer1" >
                                <button onClick={()=>{edit(article)}}>Edit</button>
                                <button onClick={()=>{deleteArticle(article.id,article.data.fotoname)}}>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Adminpage;