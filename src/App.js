import React,{useState,useRef} from 'react'
import {createBrowserRouter ,RouterProvider} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import UserPage from './components/User'
import AllSongsList from './AllSongsList'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Error from './components/Error'
import Favourites from './components/subcomponents/Favourites'
import AvailbleSongsList from './components/subcomponents/AvailbleSongsList'
import User from './Users';
export const PlayerContext = React.createContext()


const defaultSong =   {
  id:null,
  title:'',
  songFile: null,
  thumbnail: 'https://muzica-22.s3.ap-south-1.amazonaws.com/Thumbnails/default.jpg',
  artist:'',
  category: ''
}

const PauseBtn = `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-pause-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"/>
</svg>`;
const PlayBtn = `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
</svg>`;

const songs =[]
const songsList = songs
const endValue = songs.length>0 ? false : true
const currentSongTemp = endValue===false ? songsList[0] : defaultSong



function App() {
    const overlaySessionStorage = JSON.parse(sessionStorage.getItem("muzicaOverlay"))
    const overlayVal = overlaySessionStorage===null ? true : overlaySessionStorage
    const [overlay,setOverlay] = useState(overlayVal)
    const [currentSong, setCurrentSong] = useState(currentSongTemp)
    const [constrains,setConstrains] = useState({firstSong:null,'lastSong':null,'changeVar':0,'direction':null,end:endValue}) 
    const [songQueue , setSongQueue] = useState(songsList)
    const [favourites,setFavourites] = useState(User['maja'].favourites)
    const [message,setMessage] = useState({'status':false,'message':''})
    const audioRef = useRef(null)
    const handleOverlay = () =>{
        setOverlay(false)
        sessionStorage.setItem("muzicaOverlay",false)
    }
    const handleAddMessage = (message) =>{
        setMessage({'status':true,'message':message})
    }
    const handleRemoveMessage = () =>{
        setMessage({'status':false,'message':''})
    }
    const handleAddQueue = (id) =>{
        
        setSongQueue((prevQueue) => {
        let NewQueue = [...prevQueue]
        const NewID = prevQueue.reduce((a,b) => Math.max(a,b.id),0) + 1
        const song = AllSongsList.find((song) => song.id === id)
        const NewSong = {
            ...song,
            'id':NewID,
            'vid':id
        }
        NewQueue.push(NewSong)
        return (NewQueue)
        })
        if (constrains.end){
        setCurrentSong(() => {
        const song = AllSongsList.find((song) => song.id === id)
        return {...song,'id':1}
        })
        setConstrains({firstSong:null,'lastSong':null,'changeVar':0,'direction':'N',end:false})
        
        }
        handleAddMessage('Song Added to Queue')
    }
    const handleRemoveQueue = (id) =>{
        // const removDiv = document.querySelector('.queue-item-'+id)
        // removDiv.style.animation = 'left-out 1s'
        const songCount = songQueue.length
        const removeSong = songQueue.filter((song)=>song.id===id)[0]
        const indexSong = songQueue.findIndex((song) => song === removeSong) 
        // console.log(songCount,currentSong.id , removeSong.id,songCount===1)
        
        if (songCount===1){
        setCurrentSong(defaultSong)
        setConstrains((prevConstrains) => ({...prevConstrains,'end':true,'direction':null}))
        }
        
        else if (currentSong.id=== removeSong.id){
        if (songCount === indexSong+1){
        
            handleChangeSong(-1)
        }
        else{
            handleChangeSong(1)
        }
        }

        setSongQueue((prevQueue) => {
        return prevQueue.filter((song) => song.id !== removeSong.id)
        })
    }
    const playRandomSong = () =>{
        const index = Math.floor(Math.random()*AllSongsList.length)
        const song = AllSongsList[index]
        const NewQueue = [{...song, 'id':1,'vid':song.id}]

        setSongQueue(()=>{
        return NewQueue
        })

        setCurrentSong((prevSong) => {
            return NewQueue[0]
        })
        setConstrains((prevConstrains) => {
        const newVar = prevConstrains.changeVar+1
        return {...prevConstrains,'lastSong':false,'firstSong':false,'changeVar':newVar,'direction':null,'end':false}
        })
    }
    const handlePlayFromAllSongs = (id) =>{
        const song = AllSongsList.find((song) => song.id === id)
        const NewQueue = [{...song, 'id':1,'vid':song.id}]

        setSongQueue(()=>{
        return NewQueue
        })

        setCurrentSong((prevSong) => {
            return NewQueue[0]
        })
        setConstrains((prevConstrains) => {
        const newVar = prevConstrains.changeVar+1
        return {...prevConstrains,'lastSong':false,'firstSong':false,'changeVar':newVar,'direction':null,'end':false}
        })
    }
    const handlePlayFromQueue = (id) =>{
        setCurrentSong((prevSong) => {
            return songQueue.find((song) => song.id === id)
        })
        setConstrains((prevConstrains) => {
        const newVar = prevConstrains.changeVar+1
        return {...prevConstrains,'lastSong':false,'firstSong':false,'changeVar':newVar,'direction':null,'end':false}
        })
        
    }
    const handleChangeSong = (val) =>{
        setCurrentSong((prevSong) =>{
        const songCount = songQueue.length
        const indexSong = songQueue.findIndex((song) => song.id === prevSong.id)   
        let newIndex = indexSong+val 
        const direction = val >0 ? 'F' : 'B'
        newIndex = constrainManager(newIndex,direction,songCount)
        return songQueue[newIndex]
        }
        )}
    function constrainManager(newIndex,direction,songCount){
        if (newIndex>=0 && newIndex <=songCount-1){
            setConstrains((prevConstrains) => {
            const newVar = prevConstrains.changeVar+1
            return {...prevConstrains,'lastSong':false,'firstSong':false,'direction':direction,'changeVar':newVar,'end':false}
            })
        }
        if (newIndex<0){
            setConstrains((prevConstrains) => {
            const newVar = prevConstrains.changeVar+1
            return {...prevConstrains,'firstSong':true,'changeVar':newVar,'direction':direction,'end':false}
            })
            newIndex = 0
        }
        if(newIndex>songCount-1){
            newIndex =songCount-1
            setConstrains((prevConstrains) => {
            const newVar = prevConstrains.changeVar+1
            return {...prevConstrains,'lastSong':true,'changeVar':newVar,'direction':direction,'end':false}
            })
        }
        return newIndex
    }
    const handlePlay = (e) => {
        const AudioStatus = audioRef.current.paused
        if (constrains.lastSong=== true && AudioStatus ){
        audioRef.current.currentTime = 0
        setConstrains((prevConstrains) => ({...prevConstrains,changeVar:0,end:false,lastSong:false}))
        }
        if (AudioStatus){
        e.currentTarget.innerHTML = PauseBtn
        audioRef.current.play();
        }
        else{
        e.currentTarget.innerHTML = PlayBtn
        audioRef.current.pause();
        }  
        
    }
  
    const handleFavourites = (id) =>{
        setFavourites((prevFav)=>{
            let favList = [...prevFav]
            const queueExist = songQueue.find(song => song.vid===id)
            if(favList.find(song => song.id === id) === undefined ){
            favList.push(AllSongsList.find((song) => song.id === id))
            console.log(AllSongsList.find((song) => song.id === id))
            AllSongsList.find((song) => song.id === id).favourites = true
            
            if (queueExist!== undefined){
                for (let i=0;i<songQueue.length;i++){
                if (songQueue[i].vid===id){
                    songQueue[i].favourites = true
                }
                }
            }
            }
            else{
            favList = favList.filter(song => song.id !== id)
            AllSongsList.find((song) => song.id === id).favourites = false
            if (queueExist!== undefined){
                for (let i=0;i<songQueue.length;i++){
                if (songQueue[i].vid===id){
                    songQueue[i].favourites = false
                }
                }
            }
            }
            return favList
        })
    }

    const router = createBrowserRouter([
        {
            path:"/",
            element: <PlayerContext.Provider value ={{
                favourites,
                constrains,
                currentSong,
                songQueue,
                PlayBtn,
                PauseBtn,
                defaultSong,
                audioRef,
                message,
                handleAddMessage,
                handleRemoveMessage,
                handleRemoveQueue,
                handleFavourites,
                handleChangeSong,
                handlePlay,
                handleAddQueue,
                playRandomSong,
                handlePlayFromAllSongs,
                handlePlayFromQueue
            }}>
                    <Home 
                    overlay={overlay}
                    handleOverlay={handleOverlay}
                    />
                </PlayerContext.Provider>
        },
        {
            path:'/about/',
            element: <About/>
        },
        {
            path:'/user/',
            element:<UserPage/>
        },   
        {
            path:'/all-songs/',
            element:<AvailbleSongsList/>
        },   
        {
            path:'/fav-songs/',
            element:<PlayerContext.Provider value ={{
                favourites,
                constrains,
                currentSong,
                songQueue,
                PlayBtn,
                PauseBtn,
                defaultSong,
                audioRef,
                handleRemoveQueue,
                handleFavourites,
                handleChangeSong,
                handlePlay,
                handleAddQueue,
                playRandomSong,
                handlePlayFromAllSongs,
                handlePlayFromQueue,
            }}><Favourites/>
            </PlayerContext.Provider>
        },    
        {
            path:'/signup/',
            element:<SignUp/>,
        
        },   
        {
            path:'/login/',
            element:<Login/>,
        
        },    
        {
            path:'*',
            element:<Error/>
        },     
    ])
    //react-router
    return(
        <>  
            <RouterProvider router={router}></RouterProvider>
        </>
    )
}

export default App;
