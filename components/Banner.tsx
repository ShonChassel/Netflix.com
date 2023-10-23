import { Movie } from "../typings";
import Image from "next/image";
import { useEffect, useState } from "react";
import { baseUrl } from "../constants/movie";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";

interface Props {
    netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
    const [showModal, setShowModal] = useRecoilState(modalState)
    

    useEffect(() => {
        setMovie(
            netflixOriginals[ Math.floor(Math.random() * netflixOriginals.length)]
        )
    }, [netflixOriginals]);

    const truncate = (string: any, num: number) => {
        return string?.length > num
            ? string.substring(0, num - 1) + "..."
            : string;
    };

    return (
        <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
            <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
                <Image
                    src={`${baseUrl}${
                        movie?.backdrop_path || movie?.poster_path
                    }`}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                />
            </div>
            <h1 className="text-2xl lg:text-5xl md:text-4xl font-extrabold">
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w2">
                {truncate(movie?.overview,150)}
            </p>
            <div className="flex space-x-3">
                <button className="bannerButton bg-white text-black">
                    <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
                    Play
                </button>
                <button className="bannerButton bg-[gray]/70"
                onClick={() => {
                    setCurrentMovie(movie)
                    setShowModal(true)
                  }}
                >
                    <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
                    More Info
                </button>
            </div>
        </div>
    );
}

export default Banner;
