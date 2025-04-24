type LikeProps = {
    liked: boolean;
    setLiked: React.Dispatch<React.SetStateAction<boolean>>;
};

const LikeButton = ({ liked, setLiked }: LikeProps) => {
    const handleClickLikeButton = () => {
        liked ? setLiked(false) : setLiked(true);
    };

    return liked ? (
        <button className="liked-property" onClick={handleClickLikeButton}>
            ❤️
        </button>
    ) : (
        <button className="" onClick={handleClickLikeButton}>
            🤍
        </button>
    );
};

export default LikeButton;
