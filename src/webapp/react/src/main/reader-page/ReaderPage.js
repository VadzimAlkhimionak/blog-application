import React, {useEffect} from "react";
import classes from './ReaderPage.module.css';
import {Sidebar} from "../../components/reader/sidebar/Sidebar";
import {Appbar} from "../../components/app-bar/AppBar";
import Typography from "@material-ui/core/Typography";
import {PostInfo} from "../../components/reader/post-info/PostInfo";
import {CustomSwitch} from "../../components/UI/switch/Switch";
import {Subcontent} from "../../components/reader/subcontent/Subcontent";
import {Post} from "../../components/reader/post/Post";
import {Alert} from "../../components/UI/alert/Alert";
import {CustomizedPagination} from "../../components/pagination/Pagination";
import {getAuthors, getFavoriteAuthors, getUser} from "../../service/userService";
import {setStatusPost} from "../../service/postService";
import {checkSubscribe, setSubscribeUser, setUnsubscribeUser} from "../../service/subscribeService";
import {setPagination} from "../../service/paginationService";
import {useDispatch, useSelector} from "react-redux";
import {
    setActive,
    setAuthor,
    setAuthors,
    setAuthorsFavorite, setDefaultPage,
    setOpen, setPage,
    setPost, setPosts,
    setSubscribe, setTotalPages, setUpdate
} from "../../redux/actions/readerAction";
import {MainContent} from "../../components/controls/MainContent";
import {setGlobalError, setStatus} from "../../redux/actions/appAction";

export const ReaderPage = () => {
    const authors = useSelector(state => state.reader.authors);
    const authorsFavoriteState = useSelector(state => state.reader.authorsFavorite);
    const author = useSelector(state => state.reader.author);
    const post = useSelector(state => state.reader.post);
    const active = useSelector(state => state.reader.active);
    const open = useSelector(state => state.reader.open);
    const subscribe = useSelector(state => state.reader.subscribe);
    const update = useSelector(state => state.reader.update);

    // pagination
    const posts = useSelector(state => state.reader.posts);
    const page = useSelector(state => state.reader.page);
    const size = useSelector(state => state.reader.size);
    const totalPages = useSelector(state => state.reader.totalPages);
    const defaultPage = useSelector(state => state.reader.defaultPage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setStatus({message: "", flag: false}));
        getAuthors()
            .then(({data}) => dispatch(setAuthors(data)))
            .catch(error => dispatch(setGlobalError({message: "Something wrong!", flag: true})))
    }, [])

    useEffect(() => {
        getFavoriteAuthors()
            .then(({data}) => dispatch(setAuthorsFavorite(data)))
            .catch(error => dispatch(setGlobalError({message: "Something wrong!", flag: true})))
    }, [update, subscribe])

    useEffect(() => {
        // dispatch(setPage(page));

        setPagination('posts', author.id, page, size)
            .then(({data}) => {
                dispatch(setPosts(data.posts));
                dispatch(setTotalPages(data.totalPages));
            })
            .catch(error => console.log(error))
    }, [page, author])

    const handleClickAuthor = id => async () => {
        try {
            dispatch(setActive(id));
            dispatch(setPage(0));
            dispatch(setDefaultPage(1));

            const {data} = await getUser(id);
            dispatch(setAuthor(data));

            const response = await checkSubscribe(id);
            response.data ? dispatch(setSubscribe(true)) : dispatch(setSubscribe(false))
        } catch (error) {
            dispatch(setGlobalError({message: "Something wrong!", flag: true}))
        }
    }

    const handlePagination = ({target: {outerText}}) => {
        dispatch(setPage(outerText-1))
    }

    const handleOpen = id => () => {
        author.posts.filter(post => {
            if (post.idpost === id) {
                dispatch(setPost(post));
            }
        })
        dispatch(setOpen(true));
    }

    const handleClose = () => {
        dispatch(setOpen(false));
    }

    const handleLike = (postId, statusId, status) => async () => {
        try {
            await setStatusPost(postId, {status: status, id: statusId});
            dispatch(setUpdate(update+1));
        } catch (error) {
            dispatch(setGlobalError({message: "Something wrong!", flag: true}));
        }
    }

    const handleSubscribe = async () => {
        try {
            if (!subscribe) {
                await setSubscribeUser({id: author.id});
                dispatch(setSubscribe(true));
            } else {
                await setUnsubscribeUser(author.id);
                dispatch(setSubscribe(false));
            }
        } catch (error) {
            dispatch(setGlobalError({message: "Something wrong!", flag: true}));
        }
    }

    return (
        <MainContent>
                <div>
                    <Sidebar handleClickAuthor={handleClickAuthor}
                             authors={authors}
                             active={active}
                             authorsFavorite={authorsFavoriteState}
                    />
                </div>

                <div className={classes.content}>
                    {
                        author.firstName
                            ? <>
                                <Appbar>
                                    <Typography className={classes.author} variant="h6">{author.firstName}</Typography>
                                    <CustomSwitch label='Subscribe' handleSubscribe={handleSubscribe} subscribe={subscribe} />
                                </Appbar>
                                <Subcontent biography={author.biography} countSubscribers={author.subscribes.length} />
                            </>
                            : null
                    }

                    {
                        author.posts
                            ? <div className={classes.articles}>
                                {
                                    posts.map(post => (
                                        <Post
                                            key={post.idpost}
                                            post={post}
                                            handleOpen={handleOpen}
                                            handleLike={handleLike}
                                            update={update}
                                        />
                                    ))
                                }

                                <CustomizedPagination count={totalPages}
                                                      onChange={handlePagination}
                                                      defaultPage={defaultPage}
                                />
                            </div>
                            : <Alert message="Choose author!" severity='info' />
                    }
                </div>

                {
                    open
                        ? <PostInfo open={open}
                                    post={post}
                                    update={update}
                                    handleClose={handleClose}
                                    handleLike={handleLike}
                        />
                        : null
                }
        </MainContent>
    )
}