import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { Movie } from "../typings";
import TopTenImg from "../utils/topTen";

interface Props {
    movie: Movie;
    // movie: Movie | DocumentData;
    special?: boolean;
    TopTen?: string[];
}

function Thumbnail({ movie, special, TopTen }: Props) {
    const [showModal, setShowModal] = useRecoilState(modalState)
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

    let isTop: any = null;

    const handleTopTen = () => {
        isTop = TopTenImg;
    };

    useState(() => {
        handleTopTen();
    });

    return (
        <div>
            {special ? (
                <div className="topTen" onClick={() => {
                    setCurrentMovie(movie)
                    setShowModal(true)
                  }}>
                    
                        
                    
                    <Image
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        className="topTenImg rounded-sm object-cover md:rounded max-h-[180px] w-auto "
                        layout="fill"
                        alt=""
                    />
                </div>
            ) : (
                <div
                    className="relative h-28 min-w-[180px] cursor-pointer transition duration-200
                     ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
                     onClick={() => {
                        setCurrentMovie(movie)
                        setShowModal(true)
                      }}>
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${
                            special
                                ? movie.poster_path
                                : movie.backdrop_path || movie.poster_path
                        }`}
                        className="rounded-sm object-cover md:rounded"
                        layout="fill"
                        alt=""
                    />
                </div>
            )}
        </div>
    );
}

export default Thumbnail;
