import App from "./App";
import Home from "./components/Home";
import About from "./components/About";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Posts from "./components/posts/AllPosts";
import PostDetails from "./components/posts/PostDetails";
import CreatePost from "./components/posts/CreatePost";
import PostEditor from "./components/posts/PostEditor";
import ErrorPage from "./ErrorPage";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, path: "/", element: <Home /> },
            { path: "/about", element: <About /> },
            { path: "/signin", element: <SignIn /> },
            { path: "/signup", element: <SignUp /> },
            { path: "/posts", element: <Posts /> },
            { path: "/posts/:id", element: <PostDetails /> },
            { path: "/create", element: <CreatePost /> },
            { path: "/posts/:id/edit", element: <PostEditor /> },
        ],
    },
];

export default routes;
