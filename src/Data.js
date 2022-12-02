import sample1Img from './media/sample1.jpg' 
import sample1Sng from './media/sample1.mp3' 
import sample2Img from './media/sample2.jpg' 
import sample2Sng from './media/sample2.mp3' 
import sample3Img from './media/sample3.jpg' 
import sample3Sng from './media/sample3.mp3' 


const songQueue = [
  {
    id:1,
    title:'Hello World',
    songFile: sample1Sng,
    thumbnail: sample1Img,
    artist:'Justin Bieber',
    category: 'rock'
  },
  {
    id:2,
    title:'This song',
    songFile: sample2Sng,
    thumbnail:sample2Img,
    category: 'pop',
    artist:'Akon',
  },
  {
    id:3,
    title:'Sample',
    songFile: sample3Sng,
    thumbnail:sample3Img,
    category: 'rap',
    artist:'Billie',
  }
]
export default songQueue;