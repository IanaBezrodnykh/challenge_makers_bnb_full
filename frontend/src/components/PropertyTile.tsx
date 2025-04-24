import LikeButton from "./LikeButton";
import { useState } from "react";

type PropertyTileProps = {
    img: string;
    name: string;
    id?: number;
};

const PropertyTile = ({ img, name }: PropertyTileProps) => {
    const [liked, setLiked] = useState<boolean>(false);

    return (
        <div className="property-tile">
            <img className="property-img" src={img}></img>
            <p>{name}</p>
            <LikeButton liked={liked} setLiked={setLiked} />
        </div>
    );
};

export default PropertyTile;
