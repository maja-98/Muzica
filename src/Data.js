import sample1Img from './media/sample1.jpg' 
import sample1Sng from './media/sample1.mp3' 
import sample2Img from './media/sample2.jpg' 
import sample2Sng from './media/sample2.mp3' 
import sample3Img from './media/sample3.jpg' 
import sample3Sng from './media/sample3.mp3' 


const songQueue = [
  {
    title:'sample1',
    songFile: sample1Sng,
    thumbnail: sample1Img,
    category: 'rock'
  },
  {
    title:'sample2',
    songFile: sample2Sng,
    thumbnail:sample2Img,
    category: 'pop'
  },
  {
    title:'sample3',
    songFile: sample3Sng,
    thumbnail:sample3Img,
    category: 'rap'
  }
]
export default songQueue;