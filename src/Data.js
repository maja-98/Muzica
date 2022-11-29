import sample1Img from './media/sample1.jpg' 
import sample1Sng from './media/sample1.mp3' 
import sample2Img from './media/sample2.jpg' 
import sample2Sng from './media/sample2.mp3' 
import sample3Img from './media/sample3.jpg' 
import sample3Sng from './media/sample3.mp3' 


const songQueue = [
  {
    title:'sample1 asdasd',
    songFile: sample1Sng,
    thumbnail: sample1Img,
    artist:'Justin Bieber',
    category: 'rock'
  },
  {
    title:'sample2',
    songFile: sample2Sng,
    thumbnail:sample2Img,
    category: 'pop',
    artist:'Akon',
  },
  {
    title:'sample3',
    songFile: sample3Sng,
    thumbnail:sample3Img,
    category: 'rap',
    artist:'Billie',
  }
]
export default songQueue;