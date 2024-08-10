const Loader = () => {
    return (
        <div className="text-white flex justify-center items-center -py-10">
                This might take a while...    
                <div className ="animate-spin rounded-full h-10 w-10 border-b-2 border-grey-600"/>
            </div>
    );
}

export default Loader;