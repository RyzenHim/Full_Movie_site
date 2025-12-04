export default function getBotUltimateResponse(
    question,
    movies,
    lastMovie,
    lastGenre
) {
    const blocks = [];
    let newLastMovie = lastMovie || null;
    let newLastGenre = lastGenre || null;

    const q = question.toLowerCase();

    const findMovie = (name) =>
        movies.find((m) =>
            m.title.toLowerCase().includes(name.toLowerCase())
        );

    const extractName = (txt) =>
        txt
            .replace("tell me about", "")
            .replace("details of", "")
            .replace("plot of", "")
            .replace("rating of", "")
            .replace("trailer of", "")
            .replace("show trailer for", "")
            .trim();

    const suggestMovie = (q) => {
        let best = null,
            score = 0;
        for (const m of movies) {
            let s = 0;
            const lowerTitle = m.title.toLowerCase();
            if (q.includes(lowerTitle.slice(0, 4))) s += 2;
            if (m.genres?.some((g) => q.includes(g.toLowerCase()))) s += 1;
            if (s > score) {
                score = s;
                best = m;
            }
        }
        return best;
    };

    if (lastMovie) {
        if (q.includes("its rating") || (q.includes("rating") && !extractName(q))) {
            blocks.push({
                from: "bot",
                type: "text",
                text: `⭐ The IMDb rating of ${lastMovie.title} is ${lastMovie.imdbRating}.`,
            });
            return { blocks, lastMovie, lastGenre };
        }

        if (q.includes("its genre") || (q.includes("genre") && !extractName(q))) {
            blocks.push({
                from: "bot",
                type: "text",
                text: `🎭 The genres of ${lastMovie.title} are: ${lastMovie.genres.join(
                    ", "
                )}.`,
            });
            return { blocks, lastMovie, lastGenre };
        }

        if (q.includes("its plot") || q.includes("its story")) {
            blocks.push({
                from: "bot",
                type: "text",
                text: `📖 Plot of ${lastMovie.title}:\n${lastMovie.plot}`,
            });
            return { blocks, lastMovie, lastGenre };
        }
    }

    if (q.includes("bored") || q.includes("something to watch")) {
        const fun = movies
            .filter((m) => m.imdbRating >= 8)
            .slice(0, 8);

        blocks.push({
            from: "bot",
            type: "text",
            text: "😄 Here are some highly rated movies to kill boredom:",
        });
        blocks.push({ from: "bot", type: "carousel", movies: fun });
        return { blocks, lastMovie, lastGenre };
    }

    if (q.includes("scary") || q.includes("horror")) {
        const horror = movies.filter((m) =>
            m.genres?.some((g) => g.toLowerCase().includes("horror"))
        );
        blocks.push({
            from: "bot",
            type: "text",
            text: "😱 You like horror? Here you go:",
        });
        blocks.push({ from: "bot", type: "carousel", movies: horror.slice(0, 8) });
        return { blocks, lastMovie, lastGenre: "horror" };
    }

    const commonGenres = ["action", "drama", "thriller", "sci-fi", "romance", "crime", "comedy", "animation"];
    for (const g of commonGenres) {
        if (q.includes(g)) {
            const list = movies.filter((m) =>
                m.genres?.map((x) => x.toLowerCase()).includes(g)
            );
            blocks.push({
                from: "bot",
                type: "text",
                text: `🎭 ${g.toUpperCase()} movies:`,
            });
            blocks.push({
                from: "bot",
                type: "carousel",
                movies: list.slice(0, 10),
            });
            return { blocks, lastMovie, lastGenre: g };
        }
    }

    const name = extractName(q);
    const movie = name ? findMovie(name) || suggestMovie(q) : null;

    if (movie && q.includes("tell me")) {
        newLastMovie = movie;
        blocks.push({ from: "bot", type: "movieCard", movie });
        blocks.push({
            from: "bot",
            type: "text",
            text: movie.plot,
        });
        return { blocks, lastMovie: newLastMovie, lastGenre };
    }

    if (movie && q.includes("rating")) {
        newLastMovie = movie;
        blocks.push({
            from: "bot",
            type: "text",
            text: `⭐ IMDb rating of ${movie.title} is ${movie.imdbRating}.`,
        });
        return { blocks, lastMovie: newLastMovie, lastGenre };
    }

    if (movie && (q.includes("plot") || q.includes("story"))) {
        newLastMovie = movie;
        blocks.push({
            from: "bot",
            type: "text",
            text: `📖 Plot of ${movie.title}:\n${movie.plot}`,
        });
        return { blocks, lastMovie: newLastMovie, lastGenre };
    }

    if (movie && q.includes("trailer")) {
        newLastMovie = movie;
        const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
            movie.title + " official trailer"
        )}`;
        blocks.push({
            from: "bot",
            type: "text",
            text: `🎞 Here’s a YouTube search for the trailer of ${movie.title}:\n${url}`,
        });
        return { blocks, lastMovie: newLastMovie, lastGenre };
    }

    if (movie && q.includes("similar")) {
        const similar = movies.filter(
            (m) =>
                m._id !== movie._id &&
                m.genres?.some((g) => movie.genres.includes(g))
        );
        newLastMovie = movie;
        blocks.push({
            from: "bot",
            type: "text",
            text: `🎭 Movies similar to ${movie.title}:`,
        });
        blocks.push({
            from: "bot",
            type: "carousel",
            movies: similar.slice(0, 10),
        });
        return { blocks, lastMovie: newLastMovie, lastGenre };
    }

    if (q.includes("best") || q.includes("top")) {
        const top = [...movies]
            .sort((a, b) => b.imdbRating - a.imdbRating)
            .slice(0, 10);

        blocks.push({
            from: "bot",
            type: "text",
            text: "🔥 Here are some of the top rated movies:",
        });
        blocks.push({ from: "bot", type: "carousel", movies: top });
        return { blocks, lastMovie, lastGenre };
    }

    if (q.includes("trending")) {
        const trending = movies.filter((m) => m.isTrending || m.imdbRating >= 8.5);
        blocks.push({
            from: "bot",
            type: "text",
            text: "🔥 Currently trending movies:",
        });
        blocks.push({
            from: "bot",
            type: "carousel",
            movies: trending.slice(0, 10),
        });
        return { blocks, lastMovie, lastGenre };
    }

    blocks.push({
        from: "bot",
        type: "text",
        text:
            "I didn’t fully get that. You can try:\n" +
            "- Tell me about Inception\n" +
            "- Top rated action movies\n" +
            "- Similar to Interstellar\n" +
            "- Horror movies\n" +
            "- Trailer of The Dark Knight",
    });

    return { blocks, lastMovie, lastGenre };
}
