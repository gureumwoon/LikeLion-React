import React, { useEffect, useState } from 'react'
import axios from "../api/axios";
import MovieModal from './MovieModal';
import "./Row.css";

import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Navigation, Pagination]);

function Row({ isLargeRow, title, id, fetchUrl }) {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});

    useEffect(() => {
        fetchMovieData();
    }, []);

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
    };

    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    };

    return (
        <section className="row">
            <h2>{title}</h2>
            <div className="slider">
                <div className="slider__arrow-left">
                    <span className="arrow"
                        onClick={() => {
                            document.getElementById(id).scrollLeft -= window.innerWidth - 80;
                        }}>
                        {"<"}
                    </span>
                </div>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={6}
                    navigation
                    scrollbar={{ draggable: true }}
                >
                    <div id={id} className="row__posters">
                        {movies.map(movie => (
                            <SwiperSlide>
                                <img
                                    key={movie.id}
                                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                    src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                    alt={movie.name}
                                    onClick={() => handleClick(movie)}
                                />
                            </SwiperSlide>
                        ))}
                    </div>
                </Swiper>
                <div className="slider__arrow-right">
                    <span className="arrow"
                        onClick={() => {
                            document.getElementById(id).scrollLeft += window.innerWidth - 80;
                        }}>
                        {">"}
                    </span>
                </div>
            </div>
            {
                modalOpen && (
                    <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
                )
            }
        </section>
    )
}

export default Row