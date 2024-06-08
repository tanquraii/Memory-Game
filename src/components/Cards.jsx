import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import Score from './Score';
const Cards = () => {
    const [responses, setResponses] = useState([]);
    const [hasFetched, setHasFetched] = useState(false);
    const [clicked,setClicked] = useState(0);
    const [record,setRecord] = useState(0);
    const [currentIndex,setCurrentIndex] = useState([]);
    async function fetchPokemonData() {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=12&offset=0');
            const pokemonNames = response.data.results.map(pokemon => pokemon.name);
            
            const pokemonDataPromises = pokemonNames.map(async (name) => {
                const pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                return {
                    name,
                    imageUrl: pokemonData.data.sprites.other['official-artwork'].front_default
                };
            });

            const pokemonData = await Promise.all(pokemonDataPromises);
            setResponses(pokemonData);
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    }
    function increase(){
        const uniquePokemons = new Set(currentIndex);
        console.log(uniquePokemons.size,currentIndex.length);
        if (uniquePokemons.size !== currentIndex.length) {
            setClicked(0);
            setCurrentIndex(currentIndex.splice(0,currentIndex.length));
        } else {
            setClicked(clicked => clicked + 1);
        }
        if (clicked >= record) {
            setRecord(clicked);
        }
    }
    function randomise(index){
        let array = [...responses];
        for(let i = array.length-1;i>0;i--){
            const j = Math.floor(Math.random()*(i+1));
            [array[i],array[j]] = [array[j],array[i]];
        }
        setResponses(array);
        increase();
        setCurrentIndex([...currentIndex,index]);
        console.log([...currentIndex,index]);
    }
    useEffect(() => {
        if (!hasFetched) {
            fetchPokemonData();
            setHasFetched(true);
        }
    }, [hasFetched]);

    return (
        <>
            <Score score={clicked} highest={record}/>
            <div className='container'>
                
                {responses.map((pokemon) => (
                    <div className="item" key={pokemon.name} onClick={()=>randomise(pokemon.name)}>
                        <h3>{pokemon.name}</h3>
                        <img src={pokemon.imageUrl} alt={pokemon.name} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Cards;

