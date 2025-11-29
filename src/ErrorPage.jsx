import error from "/assets/error.svg";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-xl m-1 font-bold text-center">
                Oops! Nothing here to see.
            </h2>
            <img className="h-96" src={error} />
        </div>
    );
};

export default ErrorPage;
