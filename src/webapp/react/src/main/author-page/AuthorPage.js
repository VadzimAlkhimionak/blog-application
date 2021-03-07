import React, {useEffect, useState} from "react";
import classes from './AuthorPage.module.css';
import {PostModal} from "../../components/author/PostModal";
import {MainContent} from "../../components/controls/MainContent";
import {useDispatch, useSelector} from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {PostInfo} from "../../components/author/PostInfo";
import {getAuthor} from "../../service/authorService";
import {setStatus} from "../../redux/actions/appAction";
import {setAuthor, setDislikes, setLikes, setPost} from "../../redux/actions/authorAction";

export const AuthorPage = () => {
    const update = useSelector(state => state.author.update);
    const author = useSelector(state => state.author.author);
    const post = useSelector(state => state.author.post);
    const likes = useSelector(state => state.author.likes);
    const dislikes = useSelector(state => state.author.dislikes);

    const dispatch = useDispatch();

    const [id, setId] = useState(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        dispatch(setStatus({message: "", flag: false}));
        getAuthor()
            .then(({data}) => dispatch(setAuthor(data)))
            .catch(error => console.log(error))
    }, [update])

    const handleChange = (event, newValue) => {
        setId(newValue)
        setValue(newValue);
    };

    const handleClickPost = id => () => {
        author.posts.find(post => {
            if (post.idpost === id) {
                dispatch(setPost(post));

                const likesCounter = post.postStatuses.filter(postStatus => postStatus.status === 'like').length;
                const dislikesCounter = post.postStatuses.filter(postStatus => postStatus.status === 'dislike').length;

                dispatch(setLikes(likesCounter));
                dispatch(setDislikes(dislikesCounter));
            }
        })
    }

    return (
        <MainContent>
            {
                <div className={classes.authorPage}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        className={classes.tabs}
                    >
                        {
                            author.posts
                                ? author.posts.map(post => (
                                    <Tab key={post.idpost}
                                         label={post.title}
                                         onClick={handleClickPost(post.idpost)}
                                    />
                                ))
                                : null
                        }
                    </Tabs>

                    <PostInfo likes={likes}
                              dislikes={dislikes}
                              post={post}
                              id={id}
                              value={value}
                              content={`content ${id}`}
                              update={update}
                    />
                </div>
            }

            <PostModal />
        </MainContent>
    )
}