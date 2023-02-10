import { log } from "console";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Movie } from "../typings";
import TopTenImg from "../utils/topTen";

interface Props {
    movie: Movie;
    // movie: Movie | DocumentData;
    special?: boolean;
    TopTenImg?: string[];
}

function Thumbnail({ movie, special, TopTenImg }: Props) {
    const topTen: any = TopTenImg;
    

    return (
        <div
            className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] 
          md:hover:scale-105"
        >
            <Image
                src={`https://image.tmdb.org/t/p/w500${ special ? movie.poster_path : movie.backdrop_path || movie.poster_path}`}
                className="rounded-sm object-cover md:rounded"
                layout="fill"
                alt=""
            />
        </div>
    );
}

export default Thumbnail;
