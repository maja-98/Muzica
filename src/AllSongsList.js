import sample1Img from './media/sample1.jpg' 
import sample1Sng from './media/sample1.mp3' 
import sample2Img from './media/sample2.jpg' 
import sample2Sng from './media/sample2.mp3' 
import sample3Img from './media/sample3.jpg' 
import sample3Sng from './media/sample3.mp3' 
import sample4Img from './media/sample4.png' 
import sample4Sng from './media/sample4.mp3' 



const AllSongs = [
  {
    id:1,
    title:'sample1 asdasd',
    songFile: sample1Sng,
    thumbnail: sample1Img,
    artist:'Justin Bieber',
    category: 'rock'
  },
  {
    id:2,
    title:'sample2',
    songFile: sample2Sng,
    thumbnail:sample2Img,
    category: 'pop',
    artist:'Akon',
  },
  {
    id:3,
    title:'sample3',
    songFile: sample3Sng,
    thumbnail:sample3Img,
    category: 'rap',
    artist:'Billie',
  },
  {
    id:4,
    title:'additional',
    songFile: sample4Sng,
    thumbnail:sample4Img,
    category: 'rap',
    artist:'MAJA',
  },

]
export default AllSongs;