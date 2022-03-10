import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useState } from "react"
import { FaRegHandPeace } from 'react-icons/fa'
import Image from 'next/image'

export default function Home({ list }) {

  const [searchText, setSearchText] = useState("");
  const [movieList, setMovieList] = useState([]);

  const handleSearch = async () => {
    if (searchText !== '') {
      const result = await fetch(
        `http://localhost:3000/api/search?movie=${searchText}`
      );

      const json = await result.json();
      setMovieList(json.list);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Cinema Next</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="theme-color" content="#8257E5" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.supertitle}>
          <FaRegHandPeace /> <h1 className={styles.title}>Bem-vindo</h1> 
        </div>
        <h2 className={styles.subtitle}>Milhões de filmes e programas de TV para descobrir. Explore agora.</h2>

        <Link href="/busca"><a className={styles.button}> PESQUISE UM FILME, OBTENHA TODOS OS DADOS </a></Link>

        <ul>
          {list.map((item, key) => (
            <li key={key}>
              <a href={`/movie/${item.id}`}> 
                <img 
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  width="150px"
                />

                {/* <Image src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    alt={`Poster ${item.title}`}
                    width="200px" 
                    height="300px"
                    className={styles.Image}
                    // borderRadius={"10px"}
                    // sx={{borderRadius:"10px"}}
                  // border-radius: 10px;
                  // border: solid 0.5px #8257E5; 
                  // transition: transform 0.8s;
                  // transform: translateX(0) scale(1);
                  // text-align: center;
                /> */}
                <br />
                {/* {item.title} */}
                
              </a>
            </li>
          ))}
        </ul>

      </main>

      {/* <Link href="./sobre">Sobre mim</Link> */}

    </div>
  );
}

// Exportanto essa função, automaticamente a página irá ser renderizada no server side

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/trending");
  const json = await response.json();

  return {
    props: {
      list: json.list,
    },
  };
}
